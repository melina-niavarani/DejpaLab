'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { Search, FileText, Download, Calendar, CheckCircle, Clock, XCircle, MessageSquare, Lock, Key, Building2, Mail, Phone, LogOut, LogIn } from 'lucide-react';

type LoginMethod = 'tracking' | 'sms' | 'password';

interface CustomerSession {
  username: string;
  companyName: string;
  email: string;
  phone: string;
}

export default function ResultsPage() {
  const t = useTranslations('results');
  const { testRequests, verifyCustomer } = useAuth();
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('tracking');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [customerSession, setCustomerSession] = useState<CustomerSession | null>(null);
  
  // Tracking code method
  const [trackingCode, setTrackingCode] = useState('');
  
  // SMS method
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [smsCountdown, setSmsCountdown] = useState(0);
  
  // Password method
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [isSearching, setIsSearching] = useState(false);
  const [loginError, setLoginError] = useState('');

  // Find customer requests based on login method
  const findCustomerRequests = (identifier: string, method: LoginMethod, password?: string): CustomerSession | null => {
    // Find request by tracking code
    if (method === 'tracking') {
      const request = testRequests.find(req => 
        req.trackingCode === identifier || 
        req.id === identifier || 
        req.id.slice(-6) === identifier
      );
      if (request) {
        return {
          username: request.username,
          companyName: request.companyName,
          email: request.email,
          phone: request.phone,
        };
      }
    }
    
    // Find by phone number (SMS method)
    if (method === 'sms') {
      const request = testRequests.find(req => req.phone === identifier);
      if (request) {
        return {
          username: request.username,
          companyName: request.companyName,
          email: request.email,
          phone: request.phone,
        };
      }
    }
    
    // Find by username and password (Password method)
    if (method === 'password' && password) {
      const verifiedUser = verifyCustomer(identifier, password);
      if (verifiedUser) {
        return {
          username: verifiedUser.username,
          companyName: verifiedUser.companyName,
          email: verifiedUser.email,
          phone: verifiedUser.phone,
        };
      }
    }
    
    return null;
  };

  const handleSendSmsCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    // Check if phone number exists in system
    const phoneExists = testRequests.some(req => req.phone === phoneNumber);
    
    if (!phoneExists) {
      setLoginError(t('sms.phoneNotFound'));
      return;
    }
    
    // Generate 6-digit verification code
    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();
    
    // Simulate sending SMS code (in production, this would call SMS API)
    console.log(`SMS sent to ${phoneNumber}: Your verification code is ${verificationCode}`);
    
    // Store code in sessionStorage temporarily (in production, verify on backend)
    sessionStorage.setItem(`sms_code_${phoneNumber}`, verificationCode);
    sessionStorage.setItem(`sms_code_time_${phoneNumber}`, Date.now().toString());
    
    setSmsCodeSent(true);
    setSmsCountdown(120); // 2 minutes countdown
    setLoginError('');
    
    const interval = setInterval(() => {
      setSmsCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      let customer: CustomerSession | null = null;
      
      if (loginMethod === 'tracking') {
        customer = findCustomerRequests(trackingCode, 'tracking');
      } else if (loginMethod === 'sms') {
        // Verify SMS code
        const storedCode = sessionStorage.getItem(`sms_code_${phoneNumber}`);
        const codeTime = sessionStorage.getItem(`sms_code_time_${phoneNumber}`);
        
        // Check if code exists and is not expired (5 minutes)
        if (codeTime && Date.now() - parseInt(codeTime) > 5 * 60 * 1000) {
          setLoginError(t('sms.codeExpired'));
          setIsSearching(false);
          return;
        }
        
        if (storedCode && smsCode === storedCode) {
          customer = findCustomerRequests(phoneNumber, 'sms');
          // Clear SMS code after successful login
          sessionStorage.removeItem(`sms_code_${phoneNumber}`);
          sessionStorage.removeItem(`sms_code_time_${phoneNumber}`);
        } else {
          setLoginError(t('sms.invalidCode'));
        }
      } else if (loginMethod === 'password') {
        // Verify password using AuthContext
        customer = findCustomerRequests(username, 'password', password);
      }
      
      if (customer) {
        setCustomerSession(customer);
        setIsLoggedIn(true);
        setLoginError('');
        // Save to sessionStorage
        sessionStorage.setItem('customer_session', JSON.stringify(customer));
      } else {
        setLoginError(t('loginError'));
      }
      
      setIsSearching(false);
    }, 1000);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCustomerSession(null);
    sessionStorage.removeItem('customer_session');
    setTrackingCode('');
    setPhoneNumber('');
    setSmsCode('');
    setUsername('');
    setPassword('');
    setSmsCodeSent(false);
  };

  // Load session on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedSession = sessionStorage.getItem('customer_session');
      if (savedSession) {
        try {
          const session = JSON.parse(savedSession);
          setCustomerSession(session);
          setIsLoggedIn(true);
        } catch (e) {
          // Invalid session
        }
      }
    }
  }, []);

  // Get customer requests
  const customerRequests = customerSession 
    ? testRequests.filter(req => req.username === customerSession.username)
    : [];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'processing':
        return <Clock className="w-5 h-5 text-yellow-600" />;
      case 'pending':
        return <XCircle className="w-5 h-5 text-gray-400" />;
      default:
        return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return t('status.completed');
      case 'processing':
        return t('status.processing');
      case 'pending':
        return t('status.pending');
      default:
        return '';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 border-green-200';
      case 'processing':
        return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'pending':
        return 'bg-gray-100 text-gray-700 border-gray-200';
      default:
        return '';
    }
  };

  const handleDownload = (resultFile: string, fileName: string) => {
    if (resultFile.startsWith('data:')) {
      const link = document.createElement('a');
      link.href = resultFile;
      link.download = fileName;
      link.click();
    } else {
      const link = document.createElement('a');
      link.href = resultFile;
      link.download = fileName;
      link.target = '_blank';
      link.click();
    }
  };

  // If logged in, show dashboard
  if (isLoggedIn && customerSession) {
    return (
      <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                  {t('customerDashboard')}
                </h1>
                <p className="text-gray-600">{t('welcomeCustomer', { name: customerSession.companyName })}</p>
              </div>
              <button
                onClick={handleLogout}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all flex items-center gap-2"
              >
                <LogOut className="w-5 h-5" />
                {t('logout')}
              </button>
            </div>

            {/* Customer Info Card */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="flex items-center gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Building2 className="w-6 h-6 text-primary-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('companyName')}</p>
                    <p className="font-semibold text-gray-900">{customerSession.companyName}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-secondary-100 p-3 rounded-xl">
                    <Mail className="w-6 h-6 text-secondary-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('email')}</p>
                    <p className="font-semibold text-gray-900">{customerSession.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <Phone className="w-6 h-6 text-primary-700" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t('phone')}</p>
                    <p className="font-semibold text-gray-900">{customerSession.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Requests Section */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('myRequests')}</h2>
            
            {customerRequests.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">{t('noRequests')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {customerRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-primary-100 p-2 rounded-lg">
                            <FileText className="w-5 h-5 text-primary-700" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-lg font-bold text-gray-900">
                                {t('request')} #{request.id.slice(-6)}
                              </h3>
                              {request.trackingCode && (
                                <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono">
                                  {t('trackingCode')}: {request.trackingCode}
                                </span>
                              )}
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{request.description}</p>
                            <div className="flex flex-wrap gap-4 text-xs text-gray-500">
                              <span>{t('requestDate')}: {new Date(request.createdAt).toLocaleDateString('fa-IR')}</span>
                              {request.updatedAt && (
                                <span>{t('lastUpdate')}: {new Date(request.updatedAt).toLocaleDateString('fa-IR')}</span>
                              )}
                              {request.processingStartedAt && (
                                <span>{t('processingStarted')}: {new Date(request.processingStartedAt).toLocaleDateString('fa-IR')}</span>
                              )}
                              {request.completedAt && (
                                <span className="text-green-600">{t('completedAt')}: {new Date(request.completedAt).toLocaleDateString('fa-IR')}</span>
                              )}
                            </div>
                          </div>
                        </div>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(request.createdAt).toLocaleDateString('fa-IR')}</span>
                          </div>
                          <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusColor(request.status)}`}>
                            {getStatusIcon(request.status)}
                            <span className="font-medium">{getStatusText(request.status)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex flex-col gap-2">
                        {request.status === 'completed' && request.resultFile ? (
                          <>
                            <div className="bg-green-50 border border-green-200 rounded-xl p-3 mb-2">
                              <p className="text-sm text-green-700 font-semibold flex items-center gap-2">
                                <CheckCircle className="w-4 h-4" />
                                {t('resultReady')}
                              </p>
                            </div>
                            <button
                              onClick={() => handleDownload(request.resultFile!, request.resultFileName || 'result.pdf')}
                              className="group bg-gradient-to-r from-green-600 to-green-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-green-700 hover:to-green-800 transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-xl hover:shadow-green-500/40 hover:scale-105 active:scale-95 flex items-center justify-center space-x-2 rtl:space-x-reverse"
                            >
                              <Download className="w-5 h-5" />
                              <span>{t('downloadResultPDF')}</span>
                            </button>
                            {!request.resultFile.startsWith('data:') && (
                              <a
                                href={request.resultFile}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-center text-sm text-primary-600 hover:text-primary-700 font-medium"
                              >
                                {t('viewInNewTab')}
                              </a>
                            )}
                          </>
                        ) : request.status === 'processing' ? (
                          <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                            <p className="text-sm text-yellow-700 font-semibold flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {t('status.processing')}
                            </p>
                          </div>
                        ) : (
                          <div className="bg-gray-50 border border-gray-200 rounded-xl p-3">
                            <p className="text-sm text-gray-600 font-semibold flex items-center gap-2">
                              <Clock className="w-4 h-4" />
                              {t('status.pending')}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Login form
  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        <div className="text-center mb-20">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            {t('title')}
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Login Method Tabs */}
          <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 mb-8">
            <div className="flex gap-2">
              <button
                onClick={() => {
                  setLoginMethod('tracking');
                  setSmsCodeSent(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  loginMethod === 'tracking'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Key className="w-5 h-5" />
                <span>{t('methods.tracking')}</span>
              </button>
              <button
                onClick={() => {
                  setLoginMethod('sms');
                  setSmsCodeSent(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  loginMethod === 'sms'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <MessageSquare className="w-5 h-5" />
                <span>{t('methods.sms')}</span>
              </button>
              <button
                onClick={() => {
                  setLoginMethod('password');
                  setSmsCodeSent(false);
                }}
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                  loginMethod === 'password'
                    ? 'bg-primary-600 text-white shadow-lg'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Lock className="w-5 h-5" />
                <span>{t('methods.password')}</span>
              </button>
            </div>
          </div>

          {/* Login Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mb-8">
            <form onSubmit={handleLogin} className="space-y-6">
              {/* Tracking Code Method */}
              {loginMethod === 'tracking' && (
                <div>
                  <label htmlFor="trackingCode" className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('trackingCode')}
                  </label>
                  <div className="flex gap-4">
                    <input
                      type="text"
                      id="trackingCode"
                      value={trackingCode}
                      onChange={(e) => setTrackingCode(e.target.value)}
                      required
                      placeholder={t('trackingCodePlaceholder')}
                      className="flex-1 px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                    <button
                      type="submit"
                      disabled={isSearching}
                      className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSearching ? t('loggingIn') : t('login')}
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{t('trackingCodeNote')}</p>
                  {loginError && loginMethod === 'tracking' && (
                    <p className="text-sm text-red-500 mt-2">{loginError}</p>
                  )}
                </div>
              )}

              {/* SMS Method */}
              {loginMethod === 'sms' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="phoneNumber" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('sms.phoneNumber')}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="tel"
                        id="phoneNumber"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        required
                        placeholder={t('sms.phonePlaceholder')}
                        className="flex-1 px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      />
                      <button
                        type="button"
                        onClick={handleSendSmsCode}
                        disabled={!phoneNumber || smsCountdown > 0}
                        className="group bg-gradient-to-r from-secondary-500 to-secondary-600 text-white px-6 py-3.5 rounded-xl font-bold hover:from-secondary-600 hover:to-secondary-700 transition-all duration-300 shadow-lg shadow-secondary-500/30 hover:shadow-xl hover:shadow-secondary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap"
                      >
                        {smsCountdown > 0 ? `${Math.floor(smsCountdown / 60)}:${(smsCountdown % 60).toString().padStart(2, '0')}` : t('sms.sendCode')}
                      </button>
                    </div>
                    {smsCodeSent && (
                      <p className="text-sm text-green-600 mt-2">{t('sms.codeSent')}</p>
                    )}
                  </div>
                  {smsCodeSent && (
                    <div>
                      <label htmlFor="smsCode" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('sms.verificationCode')}
                      </label>
                      <div className="flex gap-4">
                        <input
                          type="text"
                          id="smsCode"
                          value={smsCode}
                          onChange={(e) => setSmsCode(e.target.value)}
                          required
                          placeholder={t('sms.codePlaceholder')}
                          maxLength={6}
                          className="flex-1 px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white text-center text-2xl tracking-widest"
                        />
                        <button
                          type="submit"
                          disabled={isSearching || !smsCode}
                          className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSearching ? t('loggingIn') : t('login')}
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{t('sms.codeNote')}</p>
                      {loginError && loginMethod === 'sms' && (
                        <div className="mt-2 p-3 bg-red-50 border border-red-200 rounded-xl">
                          <p className="text-sm text-red-600">{loginError}</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              )}

              {/* Password Method */}
              {loginMethod === 'password' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('password.username')}
                    </label>
                    <input
                      type="text"
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      required
                      placeholder={t('password.usernamePlaceholder')}
                      className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('password.password')}
                    </label>
                    <div className="flex gap-4">
                      <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        placeholder={t('password.passwordPlaceholder')}
                        className="flex-1 px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                      />
                      <button
                        type="submit"
                        disabled={isSearching}
                        className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSearching ? t('loggingIn') : t('login')}
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{t('password.note')}</p>
                    {loginError && loginMethod === 'password' && (
                      <p className="text-sm text-red-500 mt-2">{loginError}</p>
                    )}
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-gradient-to-br from-primary-50 to-primary-100 p-8 rounded-3xl border border-primary-200">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">{t('info.title')}</h3>
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span>{t('info.item1')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span>{t('info.item2')}</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-primary-600 mt-0.5 flex-shrink-0" />
                <span>{t('info.item3')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

