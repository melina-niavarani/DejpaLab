'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { FileText, Building2, User, Mail, Phone, CheckCircle, Upload, UserCircle, Calendar, Lock } from 'lucide-react';

export default function RequestTestPage() {
  const t = useTranslations('requestTest');
  const router = useRouter();
  const { addTestRequest, user, testRequests, addUser, users } = useAuth();
  const [formData, setFormData] = useState({
    username: user?.username || '',
    companyName: user?.companyName || '',
    phone: user?.phone || '',
    email: user?.email || '',
    password: '',
    confirmPassword: '',
    description: '',
    files: null as FileList | null,
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  
  // Check if user already exists
  const existingUser = users.find(u => u.username === formData.username.trim());
  const isNewUser = !existingUser && formData.username.trim().length >= 3;

  // Auto-fill form when username changes
  const handleUsernameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newUsername = e.target.value;
    
    // Find the first (oldest) request with this username
    if (newUsername && newUsername.length >= 3) {
      const firstRequest = testRequests
        .filter(req => req.username === newUsername)
        .sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime())[0];

      if (firstRequest) {
        // Auto-fill fields from the first request
        setFormData(prev => ({
          ...prev,
          username: newUsername,
          companyName: firstRequest.companyName,
          phone: firstRequest.phone,
          email: firstRequest.email,
        }));
        return;
      }
    }
    
    // If no matching request found, just update username
    setFormData(prev => ({ ...prev, username: newUsername }));
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.username.trim()) {
      newErrors.username = t('validation.usernameRequired');
    }
    if (!formData.companyName.trim()) {
      newErrors.companyName = t('validation.companyNameRequired');
    }
    if (!formData.phone.trim()) {
      newErrors.phone = t('validation.phoneRequired');
    } else if (!/^09\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = t('validation.phoneInvalid');
    }
    if (!formData.email.trim()) {
      newErrors.email = t('validation.emailRequired');
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = t('validation.emailInvalid');
    }
    if (!formData.description.trim()) {
      newErrors.description = t('validation.descriptionRequired');
    }
    
    // Only require password if user is new
    if (isNewUser) {
      if (!formData.password.trim()) {
        newErrors.password = t('validation.passwordRequired');
      } else if (formData.password.length < 4) {
        newErrors.password = t('validation.passwordMinLength');
      }
      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = t('validation.passwordMismatch');
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const [trackingCode, setTrackingCode] = useState<string>('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrors({});
    
    try {
      // Check if user exists, if not create one
      const existingUser = users.find(u => u.username === formData.username.trim());
      if (!existingUser && formData.password.trim()) {
        // Create new user with password
        addUser({
          username: formData.username.trim(),
          companyName: formData.companyName.trim(),
          phone: formData.phone.trim(),
          email: formData.email.trim(),
          password: formData.password.trim(),
          role: 'user',
          permissions: {
            canViewRequests: true,
            canViewResults: true,
            canUploadResults: false,
          },
        });
      }
      
      const code = addTestRequest({
        username: formData.username.trim(),
        companyName: formData.companyName.trim(),
        phone: formData.phone.trim(),
        email: formData.email.trim(),
        description: formData.description.trim(),
      });
      setTrackingCode(code);
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          username: user?.username || '',
          companyName: user?.companyName || '',
          phone: user?.phone || '',
          email: user?.email || '',
          password: '',
          confirmPassword: '',
          description: '',
          files: null,
        });
        setTrackingCode('');
        router.push('/results');
      }, 5000); // Increased to 5 seconds to show tracking code
    } catch (error) {
      console.error('Error submitting request:', error);
      setErrors({ submit: t('validation.submitError') });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    // Special handling for username field
    if (e.target.name === 'username') {
      handleUsernameChange(e as React.ChangeEvent<HTMLInputElement>);
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      files: e.target.files,
    });
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
          {isSubmitted ? (
            <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
              <div className="bg-gradient-to-br from-green-100 to-green-200 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-200/50">
                <CheckCircle className="w-12 h-12 text-green-600" />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">{t('success.title')}</h2>
              <p className="text-lg text-gray-600 mb-6">{t('success.message')}</p>
              {trackingCode && (
                <div className="bg-primary-50 border-2 border-primary-200 rounded-xl p-6 mb-6">
                  <p className="text-sm font-semibold text-gray-700 mb-2">{t('success.trackingCodeLabel')}</p>
                  <p className="text-3xl font-bold text-primary-600 mb-2 font-mono tracking-wider">{trackingCode}</p>
                  <p className="text-xs text-gray-600">{t('success.trackingCodeNote')}</p>
                </div>
              )}
              <p className="text-sm text-gray-500">{t('success.note')}</p>
            </div>
          ) : (
            <div className="bg-white p-10 rounded-3xl shadow-xl border border-gray-100">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Company Information */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <Building2 className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3 text-primary-600" />
                    {t('companyInfo')}
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                        <UserCircle className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                        {t('username')} <span className="text-red-500">*</span>
                      </label>
                      <input
                        type="text"
                        id="username"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        required
                        placeholder={t('usernamePlaceholder')}
                        className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                          errors.username ? 'border-red-500' : 'border-gray-200'
                        }`}
                      />
                      {errors.username && (
                        <p className="text-xs text-red-500 mt-1">{errors.username}</p>
                      )}
                      {!errors.username && (
                        <p className="text-xs text-gray-500 mt-1">{t('usernameNote')}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="companyName" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Building2 className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                        {t('companyName')} <span className="text-red-500">*</span>
                      </label>
                        <input
                          type="text"
                          id="companyName"
                          name="companyName"
                          value={formData.companyName}
                          onChange={handleChange}
                          required
                          className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.companyName ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.companyName && (
                          <p className="text-xs text-red-500 mt-1">{errors.companyName}</p>
                        )}
                    </div>
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Phone className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                        {t('mobile')} <span className="text-red-500">*</span>
                      </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          required
                          className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.phone ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.phone && (
                          <p className="text-xs text-red-500 mt-1">{errors.phone}</p>
                        )}
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Mail className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                        {t('email')} <span className="text-red-500">*</span>
                      </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.email ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.email && (
                          <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                        )}
                    </div>
                  </div>
                </div>

                {/* Password Section - Only show for new users */}
                {isNewUser && (
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                      <Lock className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3 text-primary-600" />
                      {t('passwordInfo')}
                    </h2>
                    <div className="bg-blue-50 border border-blue-200 rounded-xl p-4 mb-4">
                      <p className="text-sm text-blue-700">{t('passwordInfoNote')}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                          <Lock className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                          {t('password')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                          required={isNewUser}
                          placeholder={t('passwordPlaceholder')}
                          className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.password ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.password && (
                          <p className="text-xs text-red-500 mt-1">{errors.password}</p>
                        )}
                        {!errors.password && (
                          <p className="text-xs text-gray-500 mt-1">{t('passwordNote')}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="confirmPassword" className="block text-sm font-semibold text-gray-700 mb-2">
                          <Lock className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                          {t('confirmPassword')} <span className="text-red-500">*</span>
                        </label>
                        <input
                          type="password"
                          id="confirmPassword"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                          required={isNewUser}
                          placeholder={t('confirmPasswordPlaceholder')}
                          className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white ${
                            errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                          }`}
                        />
                        {errors.confirmPassword && (
                          <p className="text-xs text-red-500 mt-1">{errors.confirmPassword}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
                
                {/* Show message for existing users */}
                {existingUser && (
                  <div className="border-b border-gray-200 pb-6 mb-6">
                    <div className="bg-green-50 border border-green-200 rounded-xl p-4">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {t('existingUserNote')}
                      </p>
                    </div>
                  </div>
                )}

                {/* Test Description */}
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                    <FileText className="w-6 h-6 mr-3 rtl:mr-0 rtl:ml-3 text-primary-600" />
                    {t('testInfo')}
                  </h2>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="description" className="block text-sm font-semibold text-gray-700 mb-2">
                        {t('description')} <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows={6}
                        className={`w-full px-5 py-3.5 border-2 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white resize-none ${
                          errors.description ? 'border-red-500' : 'border-gray-200'
                        }`}
                        placeholder={t('descriptionPlaceholder')}
                      />
                      {errors.description && (
                        <p className="text-xs text-red-500 mt-1">{errors.description}</p>
                      )}
                    </div>
                    <div>
                      <label htmlFor="files" className="block text-sm font-semibold text-gray-700 mb-2">
                        <Upload className="w-4 h-4 inline mr-2 rtl:mr-0 rtl:ml-2" />
                        {t('attachFiles')}
                      </label>
                      <input
                        type="file"
                        id="files"
                        name="files"
                        onChange={handleFileChange}
                        multiple
                        className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all duration-200 bg-gray-50 focus:bg-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-primary-100 file:text-primary-700 hover:file:bg-primary-200"
                      />
                      <p className="text-sm text-gray-500 mt-2">{t('fileNote')}</p>
                    </div>
                  </div>
                </div>

                {errors.submit && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-4">
                    <p className="text-sm text-red-600">{errors.submit}</p>
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full group bg-gradient-to-r from-primary-600 to-primary-700 text-white px-8 py-4 rounded-xl font-bold text-lg hover:from-primary-700 hover:to-primary-800 transition-all duration-300 shadow-lg shadow-primary-500/30 hover:shadow-xl hover:shadow-primary-500/40 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 relative overflow-hidden flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span className="relative z-10">{t('submitting')}</span>
                    </>
                  ) : (
                    <>
                      <span className="relative z-10">{t('submit')}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    </>
                  )}
                </button>
              </form>
            </div>
          )}

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200">
              <div className="bg-primary-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <FileText className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('infoCard1.title')}</h3>
              <p className="text-sm text-gray-600">{t('infoCard1.description')}</p>
            </div>
            <div className="bg-gradient-to-br from-secondary-50 to-secondary-100 p-6 rounded-2xl border border-secondary-200">
              <div className="bg-secondary-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <Calendar className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('infoCard2.title')}</h3>
              <p className="text-sm text-gray-600">{t('infoCard2.description')}</p>
            </div>
            <div className="bg-gradient-to-br from-primary-50 to-primary-100 p-6 rounded-2xl border border-primary-200">
              <div className="bg-primary-600 w-12 h-12 rounded-xl flex items-center justify-center mb-4">
                <CheckCircle className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-bold text-gray-900 mb-2">{t('infoCard3.title')}</h3>
              <p className="text-sm text-gray-600">{t('infoCard3.description')}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

