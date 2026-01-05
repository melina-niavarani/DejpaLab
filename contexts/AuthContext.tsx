'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type UserRole = 'admin' | 'user';

export interface User {
  id: string;
  username: string;
  companyName: string;
  email: string;
  phone: string;
  role: UserRole;
  permissions?: {
    canViewRequests?: boolean;
    canViewResults?: boolean;
    canUploadResults?: boolean;
  };
}

export interface TestRequest {
  id: string;
  trackingCode: string; // کد رهگیری منحصر به فرد
  username: string;
  companyName: string;
  phone: string;
  email: string;
  description: string;
  status: 'pending' | 'processing' | 'completed';
  createdAt: string;
  updatedAt?: string; // تاریخ آخرین به‌روزرسانی
  processingStartedAt?: string; // تاریخ شروع پردازش
  completedAt?: string; // تاریخ تکمیل
  resultFile?: string;
  resultFileName?: string;
  notes?: string; // یادداشت‌های ادمین
}

interface AuthContextType {
  user: User | null;
  users: User[];
  login: (username: string, password: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  testRequests: TestRequest[];
  addTestRequest: (request: Omit<TestRequest, 'id' | 'status' | 'createdAt' | 'trackingCode'>) => string;
  updateTestRequest: (id: string, updates: Partial<TestRequest>) => void;
  uploadResult: (requestId: string, file: File) => void;
  addUser: (user: Omit<User, 'id'> & { password: string }) => void;
  updateUser: (id: string, updates: Partial<User> & { password?: string }) => void;
  deleteUser: (id: string) => void;
  verifyCustomer: (username: string, password: string) => User | null;
  getUsersWithPasswords: () => (User & { password: string })[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users database
const mockUsers: (User & { password: string })[] = [
  {
    id: '1',
    username: 'admin',
    companyName: 'ادمین',
    email: 'laboratory@dejpa.com',
    phone: '09123456789',
    role: 'admin',
    password: 'admin123',
    permissions: {
      canViewRequests: true,
      canViewResults: true,
      canUploadResults: true,
    },
  },
  {
    id: '2',
    username: '1234567890',
    companyName: 'شرکت نمونه',
    email: 'laboratory@dejpa.com',
    phone: '09111111111',
    role: 'user',
    password: '1234',
    permissions: {
      canViewRequests: true,
      canViewResults: true,
      canUploadResults: false,
    },
  },
  {
    id: '3',
    username: 'customer',
    companyName: 'شرکت آزمایشی',
    email: 'laboratory@dejpa.com',
    phone: '09123456780',
    role: 'user',
    password: 'customer123',
    permissions: {
      canViewRequests: true,
      canViewResults: true,
      canUploadResults: false,
    },
  },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<(User & { password: string })[]>(mockUsers);
  const [testRequests, setTestRequests] = useState<TestRequest[]>([]);

  // Load from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('dejpalab_user');
    const savedRequests = localStorage.getItem('dejpalab_requests');
    const savedUsers = localStorage.getItem('dejpalab_users');
    
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    let existingRequests: TestRequest[] = [];
    if (savedRequests) {
      existingRequests = JSON.parse(savedRequests);
      setTestRequests(existingRequests);
    }
    
    // Always ensure demo customer has at least one request
    const hasCustomerRequest = existingRequests.some((req: TestRequest) => req.username === 'customer');
    
    if (!hasCustomerRequest) {
      const now = new Date().toISOString();
      const sampleRequest: TestRequest = {
        id: 'demo-001',
        trackingCode: '123456',
        username: 'customer',
        companyName: 'شرکت آزمایشی',
        phone: '09123456780',
        email: 'laboratory@dejpa.com',
        description: 'درخواست آزمایش نمونه برای تست سیستم',
        status: 'completed',
        createdAt: now,
        updatedAt: now,
        processingStartedAt: now,
        completedAt: now,
        resultFile: '/results/demo-result.pdf',
        resultFileName: 'نتیجه_آزمایش_نمونه.pdf',
      };
      const updatedRequests = [sampleRequest, ...existingRequests];
      setTestRequests(updatedRequests);
      localStorage.setItem('dejpalab_requests', JSON.stringify(updatedRequests));
    }
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers));
    }
  }, []);

  const login = async (username: string, password: string): Promise<boolean> => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password
    );

    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      setUser(userWithoutPassword);
      localStorage.setItem('dejpalab_user', JSON.stringify(userWithoutPassword));
      return true;
    }
    return false;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('dejpalab_user');
  };

  // Generate unique tracking code
  const generateTrackingCode = (): string => {
    // Generate a 6-digit code
    return Math.floor(100000 + Math.random() * 900000).toString();
  };

  // Simulate SMS sending (in production, this would call an SMS API)
  const sendTrackingCodeSMS = (phone: string, trackingCode: string) => {
    // In production, this would be an API call to SMS service
    console.log(`SMS sent to ${phone}: Your tracking code is ${trackingCode}`);
    // You can integrate with services like Kavenegar, SMS.ir, etc.
    // Example: await fetch('/api/send-sms', { method: 'POST', body: JSON.stringify({ phone, message: `کد رهگیری شما: ${trackingCode}` }) });
  };

  const addTestRequest = (request: Omit<TestRequest, 'id' | 'status' | 'createdAt' | 'trackingCode' | 'updatedAt'>) => {
    const trackingCode = generateTrackingCode();
    const now = new Date().toISOString();
    const newRequest: TestRequest = {
      ...request,
      id: Date.now().toString(),
      trackingCode,
      status: 'pending',
      createdAt: now,
      updatedAt: now,
    };
    
    // Send tracking code via SMS
    sendTrackingCodeSMS(request.phone, trackingCode);
    
    setTestRequests((prev) => {
      const updated = [newRequest, ...prev];
      try {
        localStorage.setItem('dejpalab_requests', JSON.stringify(updated));
      } catch (e) {
        console.error('Error saving to localStorage:', e);
      }
      return updated;
    });
    
    return trackingCode; // Return tracking code for display
  };

  const updateTestRequest = (id: string, updates: Partial<TestRequest>) => {
    setTestRequests((prev) => {
      const now = new Date().toISOString();
      const updated = prev.map((req) => {
        if (req.id === id) {
          const newStatus = updates.status || req.status;
          const statusChanged = newStatus !== req.status;
          
          return {
            ...req,
            ...updates,
            updatedAt: now,
            // Set processing start time when status changes to processing
            processingStartedAt: statusChanged && newStatus === 'processing' 
              ? now 
              : req.processingStartedAt || (newStatus === 'processing' ? now : undefined),
            // Set completed time when status changes to completed
            completedAt: statusChanged && newStatus === 'completed'
              ? now
              : req.completedAt || (newStatus === 'completed' ? now : undefined),
          };
        }
        return req;
      });
      localStorage.setItem('dejpalab_requests', JSON.stringify(updated));
      return updated;
    });
  };

  const uploadResult = async (requestId: string, file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('requestId', requestId);

      const response = await fetch('/api/upload-result', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      
      updateTestRequest(requestId, {
        status: 'completed',
        resultFile: data.fileUrl,
        resultFileName: data.fileName,
      });
    } catch (error) {
      console.error('Error uploading file:', error);
      // Fallback to base64 if API fails
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        updateTestRequest(requestId, {
          status: 'completed',
          resultFile: result,
          resultFileName: file.name,
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const addUser = (newUser: Omit<User, 'id'> & { password: string }) => {
    const userWithId: User & { password: string } = {
      ...newUser,
      id: Date.now().toString(),
    };
    setUsers((prev) => {
      const updated = [...prev, userWithId];
      localStorage.setItem('dejpalab_users', JSON.stringify(updated));
      return updated;
    });
  };

  const updateUser = (id: string, updates: Partial<User> & { password?: string }) => {
    setUsers((prev) => {
      const updated = prev.map((u) =>
        u.id === id ? { ...u, ...updates } : u
      );
      localStorage.setItem('dejpalab_users', JSON.stringify(updated));
      
      // Update current user if it's the same user
      if (user?.id === id) {
        const updatedUser = updated.find((u) => u.id === id);
        if (updatedUser) {
          const { password: _, ...userWithoutPassword } = updatedUser;
          setUser(userWithoutPassword);
          localStorage.setItem('dejpalab_user', JSON.stringify(userWithoutPassword));
        }
      }
      
      return updated;
    });
  };

  const deleteUser = (id: string) => {
    setUsers((prev) => {
      const updated = prev.filter((u) => u.id !== id);
      localStorage.setItem('dejpalab_users', JSON.stringify(updated));
      return updated;
    });
  };

  const verifyCustomer = (username: string, password: string): User | null => {
    const foundUser = users.find(
      (u) => u.username === username && u.password === password && u.role === 'user'
    );
    if (foundUser) {
      const { password: _, ...userWithoutPassword } = foundUser;
      return userWithoutPassword;
    }
    return null;
  };

  const getUsersWithPasswords = () => {
    return users;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        users: users.map(({ password: _, ...u }) => u),
        login,
        logout,
        isAuthenticated: !!user,
        testRequests,
        addTestRequest,
        updateTestRequest,
        uploadResult,
        addUser,
        updateUser,
        deleteUser,
        verifyCustomer,
        getUsersWithPasswords,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

