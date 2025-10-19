// ═══════════════════════════════════════════════════════════
// SECURE STORAGE - Encrypted LocalStorage with Fallbacks
// ═══════════════════════════════════════════════════════════

/**
 * SecureStorage provides encrypted localStorage with:
 * - Simple obfuscation (production should use proper encryption)
 * - Type-safe get/set operations
 * - Automatic expiry handling
 * - Error recovery
 * - Storage quota monitoring
 */

interface StorageOptions {
  encrypt?: boolean;
  expiresIn?: number; // milliseconds
}

interface StorageItem<T> {
  value: T;
  timestamp: number;
  expiry?: number;
}

class SecureStorageManager {
  private readonly prefix = 'ml_secure_';
  private readonly encryptionKey = 'modernlife_2025'; // TODO: Use env variable in production

  // ═══════════════════════════════════════════════════════════
  // STORAGE AVAILABILITY CHECK
  // ═══════════════════════════════════════════════════════════

  private isStorageAvailable(): boolean {
    try {
      const test = '__storage_test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch (e) {
      console.warn('localStorage is not available:', e);
      return false;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SIMPLE ENCRYPTION (Base64 + XOR)
  // Note: This is basic obfuscation. Use crypto libraries for production.
  // ═══════════════════════════════════════════════════════════

  private encrypt(data: string): string {
    try {
      // Simple XOR encryption
      let encrypted = '';
      for (let i = 0; i < data.length; i++) {
        encrypted += String.fromCharCode(
          data.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
        );
      }
      return btoa(encrypted);
    } catch (e) {
      console.error('Encryption failed:', e);
      return btoa(data); // Fallback to base64
    }
  }

  private decrypt(encrypted: string): string {
    try {
      const data = atob(encrypted);
      let decrypted = '';
      for (let i = 0; i < data.length; i++) {
        decrypted += String.fromCharCode(
          data.charCodeAt(i) ^ this.encryptionKey.charCodeAt(i % this.encryptionKey.length)
        );
      }
      return decrypted;
    } catch (e) {
      console.error('Decryption failed:', e);
      return atob(encrypted); // Fallback to base64
    }
  }

  // ═══════════════════════════════════════════════════════════
  // SET ITEM
  // ═══════════════════════════════════════════════════════════

  setItem<T>(key: string, value: T, options: StorageOptions = {}): boolean {
    if (!this.isStorageAvailable()) {
      console.warn('Storage not available');
      return false;
    }

    try {
      const storageItem: StorageItem<T> = {
        value,
        timestamp: Date.now(),
        expiry: options.expiresIn ? Date.now() + options.expiresIn : undefined,
      };

      let serialized = JSON.stringify(storageItem);
      
      if (options.encrypt !== false) {
        serialized = this.encrypt(serialized);
      }

      localStorage.setItem(this.prefix + key, serialized);
      return true;
    } catch (e) {
      if (this.isQuotaExceeded(e)) {
        console.error('Storage quota exceeded. Cleaning up old items...');
        this.cleanup();
        // Retry after cleanup
        try {
          const storageItem: StorageItem<T> = { value, timestamp: Date.now() };
          localStorage.setItem(
            this.prefix + key,
            this.encrypt(JSON.stringify(storageItem))
          );
          return true;
        } catch (retryError) {
          console.error('Storage failed even after cleanup:', retryError);
          return false;
        }
      }
      console.error('Failed to set storage item:', e);
      return false;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // GET ITEM
  // ═══════════════════════════════════════════════════════════

  getItem<T>(key: string): T | null {
    if (!this.isStorageAvailable()) {
      return null;
    }

    try {
      const item = localStorage.getItem(this.prefix + key);
      if (!item) return null;

      const decrypted = this.decrypt(item);
      const storageItem: StorageItem<T> = JSON.parse(decrypted);

      // Check expiry
      if (storageItem.expiry && Date.now() > storageItem.expiry) {
        this.removeItem(key);
        return null;
      }

      return storageItem.value;
    } catch (e) {
      console.error('Failed to get storage item:', e);
      // Try to get unencrypted (backward compatibility)
      try {
        const item = localStorage.getItem(this.prefix + key);
        if (item) {
          const parsed: StorageItem<T> = JSON.parse(item);
          return parsed.value;
        }
      } catch (fallbackError) {
        console.error('Fallback retrieval failed:', fallbackError);
      }
      return null;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // REMOVE ITEM
  // ═══════════════════════════════════════════════════════════

  removeItem(key: string): boolean {
    if (!this.isStorageAvailable()) {
      return false;
    }

    try {
      localStorage.removeItem(this.prefix + key);
      return true;
    } catch (e) {
      console.error('Failed to remove storage item:', e);
      return false;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // CLEAR ALL APP STORAGE
  // ═══════════════════════════════════════════════════════════

  clear(): boolean {
    if (!this.isStorageAvailable()) {
      return false;
    }

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          localStorage.removeItem(key);
        }
      });
      return true;
    } catch (e) {
      console.error('Failed to clear storage:', e);
      return false;
    }
  }

  // ═══════════════════════════════════════════════════════════
  // CLEANUP EXPIRED ITEMS
  // ═══════════════════════════════════════════════════════════

  cleanup(): void {
    if (!this.isStorageAvailable()) return;

    try {
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          try {
            const item = localStorage.getItem(key);
            if (item) {
              const decrypted = this.decrypt(item);
              const storageItem = JSON.parse(decrypted);
              if (storageItem.expiry && Date.now() > storageItem.expiry) {
                localStorage.removeItem(key);
              }
            }
          } catch (e) {
            // If we can't parse it, remove it
            localStorage.removeItem(key);
          }
        }
      });
    } catch (e) {
      console.error('Cleanup failed:', e);
    }
  }

  // ═══════════════════════════════════════════════════════════
  // STORAGE QUOTA MONITORING
  // ═══════════════════════════════════════════════════════════

  getStorageInfo(): { used: number; total: number; available: number } {
    if (!this.isStorageAvailable()) {
      return { used: 0, total: 0, available: 0 };
    }

    try {
      let used = 0;
      const keys = Object.keys(localStorage);
      keys.forEach(key => {
        if (key.startsWith(this.prefix)) {
          const item = localStorage.getItem(key);
          if (item) {
            used += item.length + key.length;
          }
        }
      });

      // Most browsers support 5-10MB for localStorage
      const total = 5 * 1024 * 1024; // 5MB estimate
      const available = total - used;

      return { used, total, available };
    } catch (e) {
      console.error('Failed to get storage info:', e);
      return { used: 0, total: 0, available: 0 };
    }
  }

  // ═══════════════════════════════════════════════════════════
  // HELPER METHODS
  // ═══════════════════════════════════════════════════════════

  private isQuotaExceeded(e: any): boolean {
    return (
      e instanceof DOMException &&
      (e.code === 22 ||
        e.code === 1014 ||
        e.name === 'QuotaExceededError' ||
        e.name === 'NS_ERROR_DOM_QUOTA_REACHED')
    );
  }

  // ═══════════════════════════════════════════════════════════
  // BATCH OPERATIONS
  // ═══════════════════════════════════════════════════════════

  setMultiple(items: Record<string, any>, options?: StorageOptions): boolean {
    try {
      Object.entries(items).forEach(([key, value]) => {
        this.setItem(key, value, options);
      });
      return true;
    } catch (e) {
      console.error('Batch set failed:', e);
      return false;
    }
  }

  getMultiple<T extends Record<string, any>>(keys: string[]): Partial<T> {
    const result: Partial<T> = {};
    keys.forEach(key => {
      const value = this.getItem(key);
      if (value !== null) {
        (result as any)[key] = value;
      }
    });
    return result;
  }

  // ═══════════════════════════════════════════════════════════
  // SESSION STORAGE (for temporary data)
  // ═══════════════════════════════════════════════════════════

  setSessionItem<T>(key: string, value: T): boolean {
    try {
      sessionStorage.setItem(this.prefix + key, JSON.stringify(value));
      return true;
    } catch (e) {
      console.error('Failed to set session item:', e);
      return false;
    }
  }

  getSessionItem<T>(key: string): T | null {
    try {
      const item = sessionStorage.getItem(this.prefix + key);
      return item ? JSON.parse(item) : null;
    } catch (e) {
      console.error('Failed to get session item:', e);
      return null;
    }
  }

  removeSessionItem(key: string): boolean {
    try {
      sessionStorage.removeItem(this.prefix + key);
      return true;
    } catch (e) {
      console.error('Failed to remove session item:', e);
      return false;
    }
  }
}

// ═══════════════════════════════════════════════════════════
// EXPORT SINGLETON INSTANCE
// ═══════════════════════════════════════════════════════════

export const SecureStorage = new SecureStorageManager();

// ═══════════════════════════════════════════════════════════
// AUTOMATIC CLEANUP ON PAGE LOAD
// ═══════════════════════════════════════════════════════════

if (typeof window !== 'undefined') {
  // Run cleanup on load
  SecureStorage.cleanup();

  // Run cleanup every hour
  setInterval(() => {
    SecureStorage.cleanup();
  }, 60 * 60 * 1000);
}
