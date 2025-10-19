// ═══════════════════════════════════════════════════════════
// PERFORMANCE MONITOR - Track & Optimize App Performance
// ═══════════════════════════════════════════════════════════

/**
 * PerformanceMonitor provides:
 * - Component render time tracking
 * - API call performance monitoring
 * - User interaction metrics
 * - Memory usage tracking
 * - Performance bottleneck detection
 */

interface PerformanceMetric {
  name: string;
  startTime: number;
  endTime?: number;
  duration?: number;
  metadata?: Record<string, any>;
}

interface PerformanceReport {
  totalMetrics: number;
  averageDuration: number;
  slowestOperations: PerformanceMetric[];
  fastestOperations: PerformanceMetric[];
  recentMetrics: PerformanceMetric[];
}

class PerformanceMonitorManager {
  private metrics: Map<string, PerformanceMetric> = new Map();
  private completedMetrics: PerformanceMetric[] = [];
  private maxStoredMetrics = 100;
  private performanceObserver: PerformanceObserver | null = null;

  constructor() {
    this.initializeObservers();
  }

  // ═══════════════════════════════════════════════════════════
  // INITIALIZE PERFORMANCE OBSERVERS
  // ═══════════════════════════════════════════════════════════

  private initializeObservers(): void {
    if (typeof window === 'undefined') return;

    try {
      // Monitor long tasks (> 50ms)
      if ('PerformanceObserver' in window) {
        this.performanceObserver = new PerformanceObserver((list) => {
          for (const entry of list.getEntries()) {
            if (entry.duration > 50) {
              console.warn(`Long task detected: ${entry.name} - ${entry.duration.toFixed(2)}ms`);
              this.trackEvent('long_task', {
                name: entry.name,
                duration: entry.duration,
              });
            }
          }
        });

        try {
          this.performanceObserver.observe({ entryTypes: ['measure', 'navigation'] });
        } catch (e) {
          // Some entry types might not be supported
          console.warn('Could not observe all performance entry types:', e);
        }
      }
    } catch (e) {
      console.warn('Performance monitoring not available:', e);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // START PERFORMANCE MEASUREMENT
  // ═══════════════════════════════════════════════════════════

  start(name: string, metadata?: Record<string, any>): PerformanceMonitorInstance {
    const metric: PerformanceMetric = {
      name,
      startTime: performance.now(),
      metadata,
    };

    this.metrics.set(name, metric);

    // Use Performance API mark
    if (typeof window !== 'undefined' && 'performance' in window) {
      performance.mark(`${name}-start`);
    }

    return new PerformanceMonitorInstance(name, this);
  }

  // ═══════════════════════════════════════════════════════════
  // END PERFORMANCE MEASUREMENT
  // ═══════════════════════════════════════════════════════════

  end(name: string): number | null {
    const metric = this.metrics.get(name);
    if (!metric) {
      console.warn(`Performance metric "${name}" not found`);
      return null;
    }

    const endTime = performance.now();
    const duration = endTime - metric.startTime;

    metric.endTime = endTime;
    metric.duration = duration;

    // Use Performance API measure
    if (typeof window !== 'undefined' && 'performance' in window) {
      try {
        performance.mark(`${name}-end`);
        performance.measure(name, `${name}-start`, `${name}-end`);
      } catch (e) {
        // Marks might not exist
      }
    }

    // Move to completed metrics
    this.completedMetrics.push(metric);
    this.metrics.delete(name);

    // Limit stored metrics
    if (this.completedMetrics.length > this.maxStoredMetrics) {
      this.completedMetrics.shift();
    }

    // Log slow operations (> 1000ms)
    if (duration > 1000) {
      console.warn(`Slow operation detected: ${name} took ${duration.toFixed(2)}ms`);
    }

    return duration;
  }

  // ═══════════════════════════════════════════════════════════
  // TRACK CUSTOM EVENTS
  // ═══════════════════════════════════════════════════════════

  trackEvent(eventName: string, data?: Record<string, any>): void {
    const event = {
      name: eventName,
      timestamp: Date.now(),
      ...data,
    };

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('[Analytics]', event);
    }

    // TODO: Send to analytics service in production
    // Example: Send to Google Analytics, Mixpanel, etc.
    // if (window.gtag) {
    //   window.gtag('event', eventName, data);
    // }
  }

  // ═══════════════════════════════════════════════════════════
  // MEMORY MONITORING
  // ═══════════════════════════════════════════════════════════

  getMemoryUsage(): {
    used: number;
    total: number;
    limit: number;
  } | null {
    if (
      typeof window !== 'undefined' &&
      'performance' in window &&
      (performance as any).memory
    ) {
      const memory = (performance as any).memory;
      return {
        used: memory.usedJSHeapSize,
        total: memory.totalJSHeapSize,
        limit: memory.jsHeapSizeLimit,
      };
    }
    return null;
  }

  logMemoryUsage(): void {
    const memory = this.getMemoryUsage();
    if (memory) {
      const usedMB = (memory.used / 1024 / 1024).toFixed(2);
      const totalMB = (memory.total / 1024 / 1024).toFixed(2);
      const limitMB = (memory.limit / 1024 / 1024).toFixed(2);
      console.log(
        `Memory Usage: ${usedMB}MB / ${totalMB}MB (Limit: ${limitMB}MB)`
      );
    }
  }

  // ═══════════════════════════════════════════════════════════
  // PERFORMANCE REPORT
  // ═══════════════════════════════════════════════════════════

  getReport(): PerformanceReport {
    const metricsWithDuration = this.completedMetrics.filter(m => m.duration);
    
    const durations = metricsWithDuration.map(m => m.duration!);
    const averageDuration = durations.length > 0
      ? durations.reduce((a, b) => a + b, 0) / durations.length
      : 0;

    const sorted = [...metricsWithDuration].sort(
      (a, b) => (b.duration || 0) - (a.duration || 0)
    );

    return {
      totalMetrics: this.completedMetrics.length,
      averageDuration,
      slowestOperations: sorted.slice(0, 5),
      fastestOperations: sorted.slice(-5).reverse(),
      recentMetrics: this.completedMetrics.slice(-10),
    };
  }

  // ═══════════════════════════════════════════════════════════
  // PRINT REPORT
  // ═══════════════════════════════════════════════════════════

  printReport(): void {
    const report = this.getReport();
    
    console.group('📊 Performance Report');
    console.log(`Total Measurements: ${report.totalMetrics}`);
    console.log(`Average Duration: ${report.averageDuration.toFixed(2)}ms`);
    
    console.group('🐌 Slowest Operations');
    report.slowestOperations.forEach(m => {
      console.log(`${m.name}: ${m.duration?.toFixed(2)}ms`);
    });
    console.groupEnd();
    
    console.group('⚡ Fastest Operations');
    report.fastestOperations.forEach(m => {
      console.log(`${m.name}: ${m.duration?.toFixed(2)}ms`);
    });
    console.groupEnd();
    
    console.groupEnd();

    this.logMemoryUsage();
  }

  // ═══════════════════════════════════════════════════════════
  // WEB VITALS
  // ═══════════════════════════════════════════════════════════

  measureWebVitals(): void {
    if (typeof window === 'undefined') return;

    try {
      // Largest Contentful Paint (LCP)
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          console.log(`LCP: ${entry.startTime.toFixed(2)}ms`);
          this.trackEvent('web_vital_lcp', { value: entry.startTime });
        }
      });
      observer.observe({ entryTypes: ['largest-contentful-paint'] });

      // First Input Delay (FID)
      const fidObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          const fid = (entry as any).processingStart - entry.startTime;
          console.log(`FID: ${fid.toFixed(2)}ms`);
          this.trackEvent('web_vital_fid', { value: fid });
        }
      });
      fidObserver.observe({ entryTypes: ['first-input'] });

      // Cumulative Layout Shift (CLS)
      let cls = 0;
      const clsObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!(entry as any).hadRecentInput) {
            cls += (entry as any).value;
          }
        }
        console.log(`CLS: ${cls.toFixed(4)}`);
        this.trackEvent('web_vital_cls', { value: cls });
      });
      clsObserver.observe({ entryTypes: ['layout-shift'] });

    } catch (e) {
      console.warn('Web Vitals monitoring not available:', e);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // CLEANUP
  // ═══════════════════════════════════════════════════════════

  clearMetrics(): void {
    this.metrics.clear();
    this.completedMetrics = [];
  }

  destroy(): void {
    this.clearMetrics();
    if (this.performanceObserver) {
      this.performanceObserver.disconnect();
    }
  }
}

// ═══════════════════════════════════════════════════════════
// PERFORMANCE MONITOR INSTANCE (for fluent API)
// ═══════════════════════════════════════════════════════════

class PerformanceMonitorInstance {
  constructor(
    private name: string,
    private manager: PerformanceMonitorManager
  ) {}

  end(): number | null {
    return this.manager.end(this.name);
  }
}

// ═══════════════════════════════════════════════════════════
// EXPORT SINGLETON
// ═══════════════════════════════════════════════════════════

export const PerformanceMonitor = new PerformanceMonitorManager();

// ═══════════════════════════════════════════════════════════
// REACT HOOK
// ═══════════════════════════════════════════════════════════

export function usePerformanceMonitor(componentName: string) {
  const [renderTime, setRenderTime] = React.useState<number | null>(null);

  React.useEffect(() => {
    const monitor = PerformanceMonitor.start(`${componentName}-render`);
    
    return () => {
      const duration = monitor.end();
      setRenderTime(duration);
      
      if (duration && duration > 16) { // Slower than 60fps
        console.warn(
          `Slow render: ${componentName} took ${duration.toFixed(2)}ms`
        );
      }
    };
  }, [componentName]);

  return { renderTime };
}

// ═══════════════════════════════════════════════════════════
// INITIALIZE WEB VITALS
// ═══════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
  window.addEventListener('load', () => {
    PerformanceMonitor.measureWebVitals();
  });
}

// Development helper: Print report on command
if (typeof window !== 'undefined' && process.env.NODE_ENV === 'development') {
  (window as any).perfReport = () => PerformanceMonitor.printReport();
  console.log('💡 Type perfReport() in console to see performance metrics');
}
