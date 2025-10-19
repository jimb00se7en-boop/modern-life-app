// Vercel Serverless Function for Waitlist Signup
// Deploy to: /api/waitlist.ts

import type { VercelRequest, VercelResponse } from '@vercel/node';
import { createClient } from '@supabase/supabase-js';

// Initialize Supabase
const supabase = createClient(
  process.env.VITE_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role for admin operations
);

// ConvertKit configuration
const CONVERTKIT_API_KEY = process.env.CONVERTKIT_API_KEY;
const CONVERTKIT_FORM_ID = process.env.CONVERTKIT_FORM_ID;

// Email validation regex
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Rate limiting (simple in-memory cache)
const rateLimitCache = new Map<string, number[]>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 5; // 5 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const timestamps = rateLimitCache.get(ip) || [];
  
  // Filter out old timestamps
  const recentTimestamps = timestamps.filter(t => now - t < RATE_LIMIT_WINDOW);
  
  if (recentTimestamps.length >= RATE_LIMIT_MAX) {
    return false;
  }
  
  recentTimestamps.push(now);
  rateLimitCache.set(ip, recentTimestamps);
  
  return true;
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    // Rate limiting
    const clientIp = req.headers['x-forwarded-for'] as string || req.headers['x-real-ip'] as string || 'unknown';
    if (!checkRateLimit(clientIp)) {
      return res.status(429).json({ error: 'Too many requests. Please try again later.' });
    }

    // Parse request body
    const { email, referralCode, source } = req.body;

    // Validate email
    if (!email || !EMAIL_REGEX.test(email)) {
      return res.status(400).json({ error: 'Invalid email address' });
    }

    // Check if email already exists
    const { data: existingEntry, error: checkError } = await supabase
      .from('waitlist')
      .select('id, referral_code, position')
      .eq('email', email)
      .single();

    if (existingEntry) {
      return res.status(200).json({
        success: true,
        message: 'Already on the waitlist!',
        data: {
          position: existingEntry.position,
          referralCode: existingEntry.referral_code,
        },
      });
    }

    // Find referrer if referral code provided
    let referrerId = null;
    if (referralCode) {
      const { data: referrer } = await supabase
        .from('waitlist')
        .select('id')
        .eq('referral_code', referralCode.toUpperCase())
        .single();

      if (referrer) {
        referrerId = referrer.id;
      }
    }

    // Insert into waitlist
    const { data: newEntry, error: insertError } = await supabase
      .from('waitlist')
      .insert({
        email,
        referred_by: referrerId,
        source: source || 'landing_page',
        ip_address: clientIp,
        user_agent: req.headers['user-agent'],
      })
      .select('id, referral_code, position')
      .single();

    if (insertError) {
      console.error('Supabase insert error:', insertError);
      throw new Error('Failed to add to waitlist');
    }

    // Subscribe to ConvertKit (async, don't wait)
    if (CONVERTKIT_API_KEY && CONVERTKIT_FORM_ID) {
      fetch(`https://api.convertkit.com/v3/forms/${CONVERTKIT_FORM_ID}/subscribe`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          api_key: CONVERTKIT_API_KEY,
          email: email,
          tags: ['waitlist', referrerId ? 'referred' : 'organic'],
          fields: {
            waitlist_position: newEntry.position,
            referral_code: newEntry.referral_code,
          },
        }),
      }).catch(err => console.error('ConvertKit error:', err));
    }

    // Send welcome email (using Resend if configured)
    const RESEND_API_KEY = process.env.RESEND_API_KEY;
    if (RESEND_API_KEY) {
      fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Modern Life <hello@modernlife-ai.app>',
          to: email,
          subject: '🎉 Welcome to Modern Life!',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
              <h1 style="color: #14b8a6;">You're On The List!</h1>
              <p>Welcome to Modern Life. You're #${newEntry.position} on the waitlist.</p>
              
              <div style="background: #f0fdfa; padding: 20px; border-radius: 8px; margin: 20px 0;">
                <h3 style="color: #14b8a6; margin-top: 0;">Your Referral Code:</h3>
                <p style="font-size: 24px; font-weight: bold; color: #0f766e; letter-spacing: 2px;">
                  ${newEntry.referral_code}
                </p>
                <p style="font-size: 14px; color: #64748b;">
                  Share this code with friends to move up the list!
                </p>
              </div>
              
              <p>Share your referral link:</p>
              <a href="https://modernlife-ai.app?ref=${newEntry.referral_code}" 
                 style="display: inline-block; background: #14b8a6; color: white; padding: 12px 24px; 
                        text-decoration: none; border-radius: 6px; margin: 10px 0;">
                Share Now
              </a>
              
              <hr style="border: 0; border-top: 1px solid #e2e8f0; margin: 30px 0;">
              
              <p style="color: #64748b; font-size: 14px;">
                We'll keep you updated on our launch. Get ready for something amazing!
              </p>
              
              <p style="color: #94a3b8; font-size: 12px;">
                Modern Life · Wellness Reimagined
              </p>
            </div>
          `,
        }),
      }).catch(err => console.error('Resend error:', err));
    }

    // Return success
    return res.status(200).json({
      success: true,
      message: 'Successfully added to waitlist!',
      data: {
        position: newEntry.position,
        referralCode: newEntry.referral_code,
        referralUrl: `https://modernlife-ai.app?ref=${newEntry.referral_code}`,
      },
    });

  } catch (error: any) {
    console.error('Waitlist signup error:', error);
    return res.status(500).json({
      error: 'Something went wrong. Please try again.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
}
