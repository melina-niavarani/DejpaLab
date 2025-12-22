'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Search, FileText, Download, Calendar, CheckCircle, Clock, XCircle, MessageSquare, Lock, Key } from 'lucide-react';

type LoginMethod = 'tracking' | 'sms' | 'password';

export default function ResultsPage() {
  const t = useTranslations('results');
  const [loginMethod, setLoginMethod] = useState<LoginMethod>('tracking');
  
  // Tracking code method
  const [trackingCode, setTrackingCode] = useState('');
  
  // SMS method
  const [phoneNumber, setPhoneNumber] = useState('');
  const [smsCode, setSmsCode] = useState('');
  const [smsCodeSent, setSmsCodeSent] = useState(false);
  const [smsCountdown, setSmsCountdown] = useState(0);
  
  // Password method
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [password, setPassword] = useState('');
  
  const [results, setResults] = useState<Array<{
    id: string;
    testName: string;
    date: string;
    status: 'completed' | 'pending' | 'processing';
    downloadUrl?: string;
  }> | null>(null);
  const [isSearching, setIsSearching] = useState(false);

  // Mock data - in real app, this would come from API
  const mockResults: Record<string, Array<{
    id: string;
    testName: string;
    date: string;
    status: 'completed' | 'pending' | 'processing';
    downloadUrl?: string;
  }>> = {
    '12345': [
      {
        id: '1',
        testName: t('exampleTest1'),
        date: '2024-01-15',
        status: 'completed',
        downloadUrl: '#',
      },
      {
        id: '2',
        testName: t('exampleTest2'),
        date: '2024-01-20',
        status: 'completed',
        downloadUrl: '#',
      },
    ],
  };

  const handleSendSmsCode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phoneNumber) return;
    
    // Simulate sending SMS code
    setSmsCodeSent(true);
    setSmsCountdown(120); // 2 minutes countdown
    
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

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSearching(true);
    
    // Simulate API call
    setTimeout(() => {
      let foundResults = null;
      
      if (loginMethod === 'tracking') {
        foundResults = mockResults[trackingCode] || null;
      } else if (loginMethod === 'sms') {
        // Mock: if phone is 09123456789 and code is 1234, show results
        if (phoneNumber === '09123456789' && smsCode === '1234') {
          foundResults = mockResults['12345'] || null;
        }
      } else if (loginMethod === 'password') {
        // Mock: if email is test@test.com and password is 1234, show results
        if (emailOrPhone === 'test@test.com' && password === '1234') {
          foundResults = mockResults['12345'] || null;
        }
      }
      
      setResults(foundResults);
      setIsSearching(false);
    }, 1000);
  };

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
                  setResults(null);
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
                  setResults(null);
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
                  setResults(null);
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

          {/* Search Form */}
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100 mb-8">
            <form onSubmit={handleSearch} className="space-y-6">
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
                      className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 rtl:space-x-reverse"
                    >
                      <Search className="w-5 h-5" />
                      <span>{isSearching ? t('searching') : t('search')}</span>
                    </button>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">{t('trackingCodeNote')}</p>
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
                          className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 rtl:space-x-reverse"
                        >
                          <Search className="w-5 h-5" />
                          <span>{isSearching ? t('searching') : t('search')}</span>
                        </button>
                      </div>
                      <p className="text-sm text-gray-500 mt-2">{t('sms.codeNote')}</p>
                    </div>
                  )}
                </div>
              )}

              {/* Password Method */}
              {loginMethod === 'password' && (
                <div className="space-y-4">
                  <div>
                    <label htmlFor="emailOrPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('password.emailOrPhone')}
                    </label>
                    <input
                      type="text"
                      id="emailOrPhone"
                      value={emailOrPhone}
                      onChange={(e) => setEmailOrPhone(e.target.value)}
                      required
                      placeholder={t('password.emailOrPhonePlaceholder')}
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
                        className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-3.5 rounded-xl font-bold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Search className="w-5 h-5" />
                        <span>{isSearching ? t('searching') : t('search')}</span>
                      </button>
                    </div>
                    <p className="text-sm text-gray-500 mt-2">{t('password.note')}</p>
                  </div>
                </div>
              )}
            </form>
          </div>

          {/* Results */}
          {results === null ? (
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg">{t('noResults')}</p>
            </div>
          ) : results.length === 0 ? (
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
              <XCircle className="w-16 h-16 text-red-300 mx-auto mb-4" />
              <p className="text-gray-600 text-lg mb-2">{t('notFound')}</p>
              <p className="text-sm text-gray-500">{t('notFoundNote')}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {results.map((result) => (
                <div
                  key={result.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <div className="bg-primary-100 p-2 rounded-lg">
                          <FileText className="w-5 h-5 text-primary-700" />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900">{result.testName}</h3>
                      </div>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-2">
                          <Calendar className="w-4 h-4" />
                          <span>{result.date}</span>
                        </div>
                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusColor(result.status)}`}>
                          {getStatusIcon(result.status)}
                          <span className="font-medium">{getStatusText(result.status)}</span>
                        </div>
                      </div>
                    </div>
                    {result.status === 'completed' && result.downloadUrl && (
                      <button
                        onClick={() => window.open(result.downloadUrl, '_blank')}
                        className="group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-6 py-3 rounded-xl font-semibold hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 flex items-center space-x-2 rtl:space-x-reverse"
                      >
                        <Download className="w-5 h-5" />
                        <span>{t('download')}</span>
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

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

