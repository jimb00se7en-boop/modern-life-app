# 🚀 Load Your Database Schema - RIGHT NOW!

You're in the Supabase SQL Editor - perfect! Follow these exact steps:

---

## ✅ Quick Steps (2 minutes)

### **1. In Supabase SQL Editor**

You should see:
- A text area for SQL queries
- A "Run" button (or it might say "RUN" in uppercase)
- Maybe some example queries

### **2. Copy the Schema**

**Option A: From Your Local File**
1. Open the file: `backend/schema.sql` in your code editor
2. Select all (Ctrl+A / Cmd+A)
3. Copy (Ctrl+C / Cmd+C)

**Option B: From the Full Schema Below**
Scroll down to the "FULL SCHEMA" section and copy everything

### **3. Paste into Supabase**

1. Click in the SQL Editor text area
2. Clear any existing text
3. Paste (Ctrl+V / Cmd+V)
4. You should see lots of SQL code starting with:
   ```sql
   -- Modern Life Database Schema
   CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
   ```

### **4. Run It!**

1. Click the **"Run"** button (usually green, top-right area)
2. Wait 3-5 seconds
3. You should see: **"Success. No rows returned"** ✅

### **5. Verify It Worked**

1. Click **"Table Editor"** in the left sidebar
2. You should see these tables:
   - ✅ waitlist
   - ✅ users
   - ✅ achievements
   - ✅ habits
   - ✅ habit_completions
   - ✅ templates
   - ✅ template_downloads
   - ✅ template_ratings
   - ✅ audio_content
   - ✅ audio_favorites

**See all 10 tables?** You're done! ✅

---

## 🎯 What Each Table Does

| Table | Purpose |
|-------|---------|
| **waitlist** | Email signups from landing page |
| **users** | User accounts and profiles |
| **achievements** | Achievement definitions |
| **habits** | User-created habits/goals |
| **habit_completions** | Tracking habit check-ins |
| **templates** | Community templates |
| **template_downloads** | Track template usage |
| **template_ratings** | User ratings of templates |
| **audio_content** | Meditation/sleep audio |
| **audio_favorites** | User's favorite audio |

---

## 📋 After Running Schema

### **Next: Get Your API Credentials**

1. In Supabase, click **Project Settings** (gear icon)
2. Click **API** in the sidebar
3. You'll see:
   - **Project URL**: `https://xxxxxx.supabase.co`
   - **anon public** key: `eyJhbGc...` (click "Copy")

### **Add to Your .env.local File**

Open `.env.local` in your code editor and add:

```env
VITE_SUPABASE_URL=https://your-project-id.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

### **Restart Your Dev Server**

```bash
# Stop current server (Ctrl+C)
npm run dev
```

**You should see:**
- ✅ Green banner at top (all connected!)
- ✅ No warnings in console
- ✅ Ready to collect real signups!

---

## 🆘 Troubleshooting

### **Error: "relation already exists"**

This means tables are already created (that's fine!). Either:
- Ignore it (tables exist = success!)
- Or drop tables first with this command in SQL Editor:
  ```sql
  DROP SCHEMA public CASCADE;
  CREATE SCHEMA public;
  ```
  Then run the full schema again.

### **Error: "syntax error"**

- Make sure you copied the ENTIRE schema
- Check you didn't accidentally copy line numbers
- The file should start with: `-- Modern Life Database Schema`

### **Success but no tables visible**

- Refresh the page
- Click different table then back
- Check you're in the right project

### **Can't find "Run" button**

- Look for green button in top-right
- Or press: `Ctrl+Enter` (Windows) or `Cmd+Enter` (Mac)
- Button might say "RUN", "Execute", or have a play icon ▶️

---

## ✅ Success Checklist

After running, verify:

- [ ] Saw "Success" message (or similar)
- [ ] No red error messages
- [ ] Table Editor shows 10+ tables
- [ ] Can click on "waitlist" table and see columns
- [ ] Can click on "users" table and see columns

**All checked?** Perfect! Now get your API credentials and add them to `.env.local`

---

**Next Step:** Continue with `QUICK_SETUP.md` Step 3 (ConvertKit) or test your app!

