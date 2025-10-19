# 🔐 Navigation & Security - Quick Reference

## 🎯 Overview

Modern Life now has a **complete security and navigation system** with:
- Secure authentication
- Route protection
- Encrypted storage
- Performance monitoring
- Error handling

---

## 🚀 Quick Start

### **1. Setup Auth Provider (Already Done)**

```typescript
// In your main App.tsx or index.tsx:
import { AuthProvider } from './contexts/AuthContext';
import { ErrorBoundary } from './components/ErrorBoundary';

<ErrorBoundary>
  <AuthProvider>
    <YourApp />
  </AuthProvider>
</ErrorBoundary>
```

### **2. Use Auth in Components**

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { 
    user,           // Current user object
    isAuthenticated, // Boolean auth status
    isLoading,      // Loading state
    login,          // Login function
    logout,         // Logout function
    updateUser      // Update user function
  } = useAuth();

  // Example usage:
  if (!isAuthenticated) {
    return <LoginPrompt />;
  }

  return <div>Welcome, {user.name}!</div>;
}
```

### **3. Protect Routes**

```typescript
import { ProtectedRoute } from './contexts/AuthContext';

// Require authentication:
<Route path="/dashboard" element={
  <ProtectedRoute>
    <Dashboard />
  </ProtectedRoute>
} />

// Require completed onboarding:
<Route path="/app" element={
  <ProtectedRoute requireOnboarding>
    <MainApp />
  </ProtectedRoute>
} />

// Require minimum tier:
<Route path="/premium" element={
  <ProtectedRoute minTier="Platinum">
    <PremiumContent />
  </ProtectedRoute>
} />
```

---

## 🔒 Authentication API

### **Login:**
```typescript
const { login } = useAuth();

try {
  await login(email, password);
  // Success - user is now authenticated
  navigate('/dashboard');
} catch (error) {
  // Handle error
  showError(error.message);
}
```

### **Logout:**
```typescript
const { logout } = useAuth();

await logout();
// User is logged out, storage cleared
navigate('/login');
```

### **Signup:**
```typescript
const { signup } = useAuth();

try {
  await signup(email, password, name);
  // Success - user created and logged in
  navigate('/onboarding');
} catch (error) {
  showError(error.message);
}
```

### **Update User:**
```typescript
const { updateUser } = useAuth();

await updateUser({
  name: 'New Name',
  tier: 'Gold',
  preferences: { theme: 'dark' }
});
```

### **Refresh Session:**
```typescript
const { refreshSession } = useAuth();

// Manually refresh (auto-refreshes every hour)
await refreshSession();
```

---

## 💾 Secure Storage

### **Basic Usage:**
```typescript
import { SecureStorage } from './utils/SecureStorage';

// Set item (auto-encrypted):
SecureStorage.setItem('user_preferences', {
  theme: 'dark',
  notifications: true
});

// Get item:
const prefs = SecureStorage.getItem('user_preferences');

// Remove item:
SecureStorage.removeItem('user_preferences');

// Clear all app storage:
SecureStorage.clear();
```

### **With Expiry:**
```typescript
// Expire after 1 hour:
SecureStorage.setItem('temp_data', data, {
  expiresIn: 60 * 60 * 1000
});

// Data auto-deletes after expiry
```

### **Batch Operations:**
```typescript
// Set multiple:
SecureStorage.setMultiple({
  theme: 'dark',
  language: 'en',
  notifications: true
});

// Get multiple:
const { theme, language } = SecureStorage.getMultiple([
  'theme',
  'language'
]);
```

### **Session Storage (Temporary):**
```typescript
// Only lasts until browser close:
SecureStorage.setSessionItem('temp_filter', 'active');
const filter = SecureStorage.getSessionItem('temp_filter');
```

### **Storage Management:**
```typescript
// Check quota:
const info = SecureStorage.getStorageInfo();
console.log(`Used: ${info.used / 1024}KB`);
console.log(`Available: ${info.available / 1024}KB`);

// Manual cleanup of expired items:
SecureStorage.cleanup();
```

---

## 📊 Performance Monitoring

### **Track Operations:**
```typescript
import { PerformanceMonitor } from './utils/PerformanceMonitor';

// Start tracking:
const monitor = PerformanceMonitor.start('api-call');

// Do something:
await fetchData();

// End tracking (returns duration in ms):
const duration = monitor.end();
console.log(`Operation took ${duration}ms`);
```

### **Track Events:**
```typescript
// Track any event:
PerformanceMonitor.trackEvent('template_created', {
  templateId: 'abc123',
  userId: user.id,
  category: 'meditation'
});

// Track user actions:
PerformanceMonitor.trackEvent('button_click', {
  button: 'save_template',
  page: 'template_creator'
});
```

### **Component Performance Hook:**
```typescript
import { usePerformanceMonitor } from './utils/PerformanceMonitor';

function MyComponent() {
  // Auto-tracks render time:
  const { renderTime } = usePerformanceMonitor('MyComponent');
  
  // Warns if render > 16ms (slower than 60fps)
  
  return <div>...</div>;
}
```

### **Get Performance Report:**
```typescript
// In browser console:
perfReport();

// Or programmatically:
const report = PerformanceMonitor.getReport();
console.log('Avg duration:', report.averageDuration);
console.log('Slowest:', report.slowestOperations);
console.log('Recent:', report.recentMetrics);
```

### **Memory Monitoring:**
```typescript
// Check memory usage:
const memory = PerformanceMonitor.getMemoryUsage();
console.log(`Used: ${memory.used / 1024 / 1024}MB`);

// Or log it:
PerformanceMonitor.logMemoryUsage();
```

---

## 🛡️ Error Handling

### **Wrap Components:**
```typescript
import { ErrorBoundary } from './components/ErrorBoundary';

<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>

// With custom error handler:
<ErrorBoundary onError={(error, info) => {
  console.error('Component error:', error);
  sendToSentry(error);
}}>
  <MyComponent />
</ErrorBoundary>
```

### **Custom Fallback:**
```typescript
<ErrorBoundary
  fallback={
    <div className="error-state">
      <h2>Something went wrong</h2>
      <button onClick={() => window.location.reload()}>
        Reload
      </button>
    </div>
  }
>
  <MyComponent />
</ErrorBoundary>
```

### **Error Hook:**
```typescript
import { useErrorHandler } from './components/ErrorBoundary';

function MyComponent() {
  const throwError = useErrorHandler();
  
  const handleAction = async () => {
    try {
      await riskyOperation();
    } catch (error) {
      // Will trigger ErrorBoundary:
      throwError(error);
    }
  };
}
```

---

## 💫 Loading States

### **Skeleton Screens:**
```typescript
import { 
  DashboardSkeleton, 
  HubSkeleton,
  CardListSkeleton,
  TableSkeleton
} from './components/LoadingStates';

// While loading:
{isLoading ? <DashboardSkeleton /> : <Dashboard data={data} />}
{isLoading ? <HubSkeleton /> : <MeditationHub />}
{isLoading ? <CardListSkeleton count={5} /> : <CardList />}
{isLoading ? <TableSkeleton rows={10} cols={4} /> : <Table />}
```

### **Spinners:**
```typescript
import { 
  Spinner, 
  InlineLoading, 
  FullPageLoading,
  ButtonLoading
} from './components/LoadingStates';

// Small spinner:
<Spinner size="sm" />
<Spinner size="md" />
<Spinner size="lg" />

// With message:
<InlineLoading message="Loading templates..." />

// Full page overlay:
<FullPageLoading message="Initializing..." />

// In buttons:
<button disabled={loading}>
  {loading ? <ButtonLoading /> : 'Submit'}
</button>
```

### **Progressive Images:**
```typescript
import { ProgressiveImage } from './components/LoadingStates';

<ProgressiveImage
  src="/large-image.jpg"
  alt="Hero"
  className="w-full h-96 object-cover"
/>
```

### **Lazy Loading:**
```typescript
import { LazyLoadWrapper } from './components/LoadingStates';

<LazyLoadWrapper
  fallback={<Skeleton className="h-48" />}
>
  <HeavyComponent />
</LazyLoadWrapper>
```

---

## 🎯 Common Patterns

### **Pattern 1: Protected Dashboard**

```typescript
function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <ErrorBoundary>
            <Dashboard />
          </ErrorBoundary>
        </ProtectedRoute>
      } />
    </Routes>
  );
}
```

### **Pattern 2: Data Fetching with Loading**

```typescript
function DataComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      const monitor = PerformanceMonitor.start('fetch-data');
      
      try {
        // Try cache first:
        const cached = SecureStorage.getItem('data');
        if (cached) {
          setData(cached);
          setLoading(false);
        }
        
        // Fetch fresh:
        const response = await fetch('/api/data');
        const fresh = await response.json();
        
        setData(fresh);
        SecureStorage.setItem('data', fresh, {
          expiresIn: 5 * 60 * 1000 // 5 min
        });
        
      } catch (error) {
        console.error('Fetch failed:', error);
      } finally {
        setLoading(false);
        monitor.end();
      }
    };
    
    fetchData();
  }, []);
  
  if (loading) return <DashboardSkeleton />;
  if (!data) return <p>No data</p>;
  
  return <Dashboard data={data} />;
}
```

### **Pattern 3: Tier-Based Features**

```typescript
function FeatureComponent() {
  const { user } = useAuth();
  
  // Check tier:
  const hasPremiumAccess = ['Platinum', 'Diamond'].includes(user.tier);
  
  return (
    <div>
      {hasPremiumAccess ? (
        <PremiumFeature />
      ) : (
        <UpgradePrompt />
      )}
    </div>
  );
}
```

### **Pattern 4: Form with Validation**

```typescript
function SignupForm() {
  const { signup } = useAuth();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const monitor = PerformanceMonitor.start('signup');
    
    try {
      await signup(email, password, name);
      
      PerformanceMonitor.trackEvent('user_signup', {
        method: 'email'
      });
      
      navigate('/onboarding');
      
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
      monitor.end();
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      {error && <Alert variant="error">{error}</Alert>}
      
      <input type="email" required />
      <input type="password" required />
      
      <button type="submit" disabled={loading}>
        {loading ? <ButtonLoading /> : 'Sign Up'}
      </button>
    </form>
  );
}
```

---

## 📱 Navigation Structure

### **Recommended Route Structure:**

```typescript
<BrowserRouter>
  <ErrorBoundary>
    <AuthProvider>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        
        {/* Protected Routes */}
        <Route path="/onboarding" element={
          <ProtectedRoute>
            <Onboarding />
          </ProtectedRoute>
        } />
        
        <Route path="/dashboard" element={
          <ProtectedRoute requireOnboarding>
            <Dashboard />
          </ProtectedRoute>
        } />
        
        {/* Hub Routes */}
        <Route path="/meditation" element={
          <ProtectedRoute requireOnboarding>
            <MeditationHub />
          </ProtectedRoute>
        } />
        
        <Route path="/sleep" element={
          <ProtectedRoute requireOnboarding>
            <SleepHub />
          </ProtectedRoute>
        } />
        
        {/* Premium Routes */}
        <Route path="/templates/create" element={
          <ProtectedRoute minTier="Bronze">
            <TemplateCreator />
          </ProtectedRoute>
        } />
        
        <Route path="/ai-features" element={
          <ProtectedRoute minTier="Platinum">
            <AIFeatures />
          </ProtectedRoute>
        } />
        
        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </AuthProvider>
  </ErrorBoundary>
</BrowserRouter>
```

---

## 🔍 Debugging Tools

### **Check Auth State:**
```typescript
// In component:
const { user, isAuthenticated } = useAuth();
console.log({ user, isAuthenticated });

// In console:
SecureStorage.getItem('ml_user');
SecureStorage.getItem('ml_session_token');
```

### **Performance Report:**
```typescript
// In browser console:
perfReport();

// Shows:
// - Total measurements
// - Average duration
// - Slowest operations
// - Fastest operations
// - Memory usage
```

### **Clear Everything:**
```typescript
// Clear auth & storage:
SecureStorage.clear();
window.location.reload();
```

---

## ✅ Security Checklist

- ✅ Authentication implemented
- ✅ Sessions auto-refresh
- ✅ Storage encrypted
- ✅ Routes protected
- ✅ Tier-based access control
- ✅ Automatic session expiry
- ✅ Secure token management
- ✅ Error tracking ready
- ✅ Performance monitored
- ✅ Input validation (ready)

---

## 🚀 Ready to Use!

Your Modern Life app now has **production-grade security and navigation**:

```typescript
// Just use it:
import { useAuth } from './contexts/AuthContext';
import { SecureStorage } from './utils/SecureStorage';
import { PerformanceMonitor } from './utils/PerformanceMonitor';

function MyFeature() {
  const { user } = useAuth();
  usePerformanceMonitor('MyFeature');
  
  useEffect(() => {
    const data = SecureStorage.getItem('my_data');
    if (data) {
      // Use cached data
    }
  }, []);
  
  return <div>Secure & Fast!</div>;
}
```

**Everything is ready to go!** 🎉
