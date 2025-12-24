'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { UserCircle, Lock, AlertCircle } from 'lucide-react';

export default function LoginPage() {
  const t = useTranslations('login');
  const router = useRouter();
  const { login } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const success = await login(username, password);
    
    if (success) {
      router.push('/admin');
    } else {
      setError(t('error'));
    }
    
    setIsLoading(false);
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen flex items-center">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
            <div className="text-center mb-8">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
                {t('title')}
              </h1>
              <p className="text-gray-600">{t('subtitle')}</p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                  <UserCircle className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('username')}
                </label>
                <input
                  type="text"
                  id="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  placeholder={t('usernamePlaceholder')}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                  <Lock className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                  {t('password')}
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder={t('passwordPlaceholder')}
                  className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white"
                />
              </div>

              <button
                type="submit"
                disabled={isLoading}
                className="w-full group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? t('loggingIn') : t('login')}
              </button>
            </form>

            <div className="mt-6 p-4 bg-gray-50 rounded-xl">
              <p className="text-xs text-gray-600 mb-2 font-semibold">{t('demoAccounts')}</p>
              <div className="space-y-1 text-xs text-gray-500">
                <p><strong>{t('admin')}:</strong> admin / admin123</p>
                <p><strong>{t('user')}:</strong> 1234567890 / 1234</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

