'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useAuth } from '@/contexts/AuthContext';
import { 
  FileText, Download, Clock, CheckCircle, XCircle, Calendar, 
  Building2, Mail, Phone, UserCircle, Upload, Users, Settings,
  Trash2, Edit, Save, X, Plus, Search, Filter, BarChart3,
  TrendingUp, FileDown, Eye, EyeOff, Shield, RefreshCw, Key
} from 'lucide-react';
import type { TestRequest, User } from '@/contexts/AuthContext';

type TabType = 'overview' | 'requests' | 'users' | 'upload';

export default function AdminPage() {
  const t = useTranslations('admin');
  const router = useRouter();
  const { user, isAuthenticated, testRequests, updateTestRequest, uploadResult, users, addUser, updateUser, deleteUser } = useAuth();
  const [activeTab, setActiveTab] = useState<TabType>('overview');
  const [selectedRequest, setSelectedRequest] = useState<TestRequest | null>(null);
  const [uploadFile, setUploadFile] = useState<File | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'pending' | 'processing' | 'completed'>('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadForm, setUploadForm] = useState({
    selectedUsername: '',
    selectedCompany: '',
    selectedRequestId: '',
    resultFile: null as File | null,
    resultFileName: '',
  });
  const [userForm, setUserForm] = useState({
    username: '',
    companyName: '',
    email: '',
    phone: '',
    password: '',
    role: 'user' as 'admin' | 'user',
    permissions: {
      canViewRequests: true,
      canViewResults: true,
      canUploadResults: false,
    },
  });

  useEffect(() => {
    if (!isAuthenticated || user?.role !== 'admin') {
      router.push('/login');
    }
  }, [isAuthenticated, user, router]);


  if (!isAuthenticated || user?.role !== 'admin') {
    return null;
  }

  // Statistics
  const stats = {
    totalRequests: testRequests.length,
    pendingRequests: testRequests.filter(r => r.status === 'pending').length,
    processingRequests: testRequests.filter(r => r.status === 'processing').length,
    completedRequests: testRequests.filter(r => r.status === 'completed').length,
    totalUsers: users.length,
    activeUsers: users.filter(u => u.role === 'user').length,
  };

  // Filter requests
  const filteredRequests = testRequests.filter((req) => {
    const matchesSearch = 
      req.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      req.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || req.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

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

  const handleStatusChange = (requestId: string, newStatus: 'pending' | 'processing' | 'completed') => {
    updateTestRequest(requestId, { status: newStatus });
  };

  const handleFileUpload = async (requestId: string, file?: File) => {
    const fileToUpload = file || uploadFile;
    if (fileToUpload) {
      try {
        await uploadResult(requestId, fileToUpload);
        setUploadFile(null);
        setSelectedRequest(null);
        return true;
      } catch (error) {
        console.error('Upload error:', error);
        throw error;
      }
    }
    return false;
  };

  const handleAddUser = () => {
    setEditingUser(null);
    setUserForm({
      username: '',
      companyName: '',
      email: '',
      phone: '',
      password: '',
      role: 'user',
      permissions: {
        canViewRequests: true,
        canViewResults: true,
        canUploadResults: false,
      },
    });
    setShowUserModal(true);
  };

  const handleEditUser = (userToEdit: User) => {
    setEditingUser(userToEdit);
    setUserForm({
      username: userToEdit.username,
      companyName: userToEdit.companyName,
      email: userToEdit.email,
      phone: userToEdit.phone,
      password: '',
      role: userToEdit.role,
      permissions: {
        canViewRequests: userToEdit.permissions?.canViewRequests ?? true,
        canViewResults: userToEdit.permissions?.canViewResults ?? true,
        canUploadResults: userToEdit.permissions?.canUploadResults ?? false,
      },
    });
    setShowUserModal(true);
  };

  const handleSaveUser = () => {
    if (editingUser) {
      updateUser(editingUser.id, userForm);
    } else {
      addUser(userForm);
    }
    setShowUserModal(false);
  };

  const exportToCSV = () => {
    const headers = ['ID', 'Company', 'Username', 'Email', 'Phone', 'Description', 'Status', 'Created At'];
    const rows = testRequests.map(req => [
      req.id,
      req.companyName,
      req.username,
      req.email,
      req.phone,
      req.description,
      req.status,
      new Date(req.createdAt).toLocaleDateString('fa-IR'),
    ]);
    
    const csv = [headers, ...rows].map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `test-requests-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  return (
    <div className="py-24 bg-gradient-to-b from-gray-50 to-white min-h-screen">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
                {t('title')}
              </h1>
              <p className="text-gray-600">{t('subtitle')}</p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="bg-white p-2 rounded-2xl shadow-lg border border-gray-100 mb-8">
          <div className="flex gap-2">
            <button
              onClick={() => setActiveTab('overview')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'overview'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <BarChart3 className="w-5 h-5" />
              <span>{t('overview')}</span>
            </button>
            <button
              onClick={() => setActiveTab('requests')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'requests'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <FileText className="w-5 h-5" />
              <span>{t('requests')}</span>
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'users'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Users className="w-5 h-5" />
              <span>{t('users')}</span>
            </button>
            <button
              onClick={() => setActiveTab('upload')}
              className={`flex-1 flex items-center justify-center gap-2 px-4 py-3 rounded-xl font-semibold transition-all duration-200 ${
                activeTab === 'upload'
                  ? 'bg-primary-600 text-white shadow-lg'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Upload className="w-5 h-5" />
              <span>{t('uploadResult')}</span>
            </button>
          </div>
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-6">
            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-primary-100 p-3 rounded-xl">
                    <FileText className="w-6 h-6 text-primary-700" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalRequests}</h3>
                <p className="text-sm text-gray-600">{t('totalRequests')}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-gray-100 p-3 rounded-xl">
                    <XCircle className="w-6 h-6 text-gray-700" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-gray-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.pendingRequests}</h3>
                <p className="text-sm text-gray-600">{t('pendingRequests')}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-yellow-100 p-3 rounded-xl">
                    <Clock className="w-6 h-6 text-yellow-700" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-yellow-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.processingRequests}</h3>
                <p className="text-sm text-gray-600">{t('processingRequests')}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-green-100 p-3 rounded-xl">
                    <CheckCircle className="w-6 h-6 text-green-700" />
                  </div>
                  <TrendingUp className="w-5 h-5 text-green-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.completedRequests}</h3>
                <p className="text-sm text-gray-600">{t('completedRequests')}</p>
              </div>
            </div>

            {/* Users Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-purple-100 p-3 rounded-xl">
                    <Users className="w-6 h-6 text-purple-700" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.totalUsers}</h3>
                <p className="text-sm text-gray-600">{t('totalUsers')}</p>
              </div>

              <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
                <div className="flex items-center justify-between mb-4">
                  <div className="bg-indigo-100 p-3 rounded-xl">
                    <UserCircle className="w-6 h-6 text-indigo-700" />
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-1">{stats.activeUsers}</h3>
                <p className="text-sm text-gray-600">{t('activeUsers')}</p>
              </div>
            </div>

            {/* Recent Requests */}
            <div className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-gray-900">{t('recentRequests')}</h2>
                <button
                  onClick={() => setActiveTab('requests')}
                  className="text-primary-600 hover:text-primary-700 font-semibold"
                >
                  {t('viewAll')}
                </button>
              </div>
              <div className="space-y-3">
                {testRequests.slice(0, 5).map((request) => (
                  <div key={request.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl">
                    <div className="flex items-center gap-4">
                      <div className={`p-2 rounded-lg ${getStatusColor(request.status)}`}>
                        {getStatusIcon(request.status)}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900">{request.companyName}</p>
                        <p className="text-sm text-gray-600">{request.description.substring(0, 50)}...</p>
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(request.createdAt).toLocaleDateString('fa-IR')}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('allRequests')} ({testRequests.length})</h2>
              <div className="flex gap-3">
                <button
                  onClick={() => {
                    // Force refresh by reloading from localStorage
                    const savedRequests = localStorage.getItem('dejpalab_requests');
                    if (savedRequests) {
                      window.location.reload();
                    }
                  }}
                  className="px-6 py-3 bg-gray-600 text-white rounded-xl font-semibold hover:bg-gray-700 transition-all flex items-center gap-2"
                  title={t('refresh')}
                >
                  <RefreshCw className="w-5 h-5" />
                  {t('refresh')}
                </button>
                <button
                  onClick={exportToCSV}
                  className="px-6 py-3 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
                >
                  <FileDown className="w-5 h-5" />
                  {t('exportCSV')}
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="bg-white p-4 rounded-2xl shadow-lg border border-gray-100 mb-6">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1 relative">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={t('searchPlaceholder')}
                    className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                  />
                </div>
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value as any)}
                  className="px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                >
                  <option value="all">{t('allStatuses')}</option>
                  <option value="pending">{t('status.pending')}</option>
                  <option value="processing">{t('status.processing')}</option>
                  <option value="completed">{t('status.completed')}</option>
                </select>
              </div>
            </div>
            
            {filteredRequests.length === 0 ? (
              <div className="bg-white p-12 rounded-3xl shadow-xl border border-gray-100 text-center">
                <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">{t('noRequests')}</p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRequests.map((request) => (
                  <div
                    key={request.id}
                    className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="bg-primary-100 p-2 rounded-lg">
                              <FileText className="w-5 h-5 text-primary-700" />
                            </div>
                            <div>
                              <h3 className="text-lg font-bold text-gray-900">
                                {t('request')} #{request.id.slice(-6)}
                              </h3>
                              <p className="text-sm text-gray-600 mt-1">{request.description}</p>
                            </div>
                          </div>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Building2 className="w-4 h-4" />
                              <span>{request.companyName}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <UserCircle className="w-4 h-4" />
                              <span>{request.username}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-gray-600">
                              <Calendar className="w-4 h-4" />
                              <span>{new Date(request.createdAt).toLocaleDateString('fa-IR')}</span>
                            </div>
                            {request.trackingCode && (
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Key className="w-4 h-4" />
                                <span className="font-mono">{request.trackingCode}</span>
                              </div>
                            )}
                          </div>
                          <div className="flex flex-col gap-2">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-lg border ${getStatusColor(request.status)}`}>
                              {getStatusIcon(request.status)}
                              <span className="font-medium">{getStatusText(request.status)}</span>
                            </div>
                            {request.processingStartedAt && request.status !== 'pending' && (
                              <p className="text-xs text-gray-500">
                                {t('processingStarted')}: {new Date(request.processingStartedAt).toLocaleDateString('fa-IR')}
                              </p>
                            )}
                            {request.completedAt && request.status === 'completed' && (
                              <p className="text-xs text-green-600">
                                {t('completedAt')}: {new Date(request.completedAt).toLocaleDateString('fa-IR')}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
                        <select
                          value={request.status}
                          onChange={(e) => handleStatusChange(request.id, e.target.value as any)}
                          className="px-4 py-2 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                        >
                          <option value="pending">{t('status.pending')}</option>
                          <option value="processing">{t('status.processing')}</option>
                          <option value="completed">{t('status.completed')}</option>
                        </select>

                        {request.status === 'completed' && request.resultFile ? (
                          <a
                            href={request.resultFile.startsWith('data:') ? request.resultFile : request.resultFile}
                            download={request.resultFileName || 'result.pdf'}
                            target={request.resultFile.startsWith('data:') ? undefined : '_blank'}
                            className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
                          >
                            <Download className="w-4 h-4" />
                            {t('downloadResult')}
                          </a>
                        ) : (
                          <button
                            onClick={() => setSelectedRequest(request)}
                            className="px-4 py-2 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center gap-2"
                          >
                            <Upload className="w-4 h-4" />
                            {t('uploadResult')}
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Upload Result Tab */}
        {activeTab === 'upload' && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('uploadResultForUser')}</h2>
              <p className="text-gray-600">{t('uploadResultDescription')}</p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-xl border border-gray-100">
              <form onSubmit={async (e) => {
                e.preventDefault();
                if (uploadForm.selectedRequestId && uploadForm.resultFile) {
                  try {
                    await handleFileUpload(uploadForm.selectedRequestId, uploadForm.resultFile);
                    // Show success message
                    const successMsg = document.createElement('div');
                    successMsg.className = 'fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
                    successMsg.textContent = t('uploadSuccess');
                    document.body.appendChild(successMsg);
                    setTimeout(() => successMsg.remove(), 3000);
                    
                    setUploadForm({
                      selectedUsername: '',
                      selectedCompany: '',
                      selectedRequestId: '',
                      resultFile: null,
                      resultFileName: '',
                    });
                  } catch (error) {
                    // Show error message
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'fixed top-4 right-4 bg-red-500 text-white px-6 py-3 rounded-xl shadow-lg z-50';
                    errorMsg.textContent = t('uploadError');
                    document.body.appendChild(errorMsg);
                    setTimeout(() => errorMsg.remove(), 3000);
                  }
                }
              }} className="space-y-6">
                {/* Select User/Company */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('selectUserOrCompany')} *
                  </label>
                  <select
                    value={uploadForm.selectedUsername}
                    onChange={(e) => {
                      const selectedUser = users.find(u => u.username === e.target.value);
                      setUploadForm({
                        ...uploadForm,
                        selectedUsername: e.target.value,
                        selectedCompany: selectedUser?.companyName || '',
                        selectedRequestId: '',
                      });
                    }}
                    required
                    className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                  >
                    <option value="">{t('selectUserOrCompanyPlaceholder')}</option>
                    {users.filter(u => u.role === 'user').map((userItem) => (
                      <option key={userItem.id} value={userItem.username}>
                        {userItem.companyName} ({userItem.username})
                      </option>
                    ))}
                  </select>
                </div>

                {/* Select Request */}
                {uploadForm.selectedUsername && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('selectRequest')} *
                    </label>
                    <select
                      value={uploadForm.selectedRequestId}
                      onChange={(e) => setUploadForm({ ...uploadForm, selectedRequestId: e.target.value })}
                      required
                      className="w-full px-5 py-3.5 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all bg-gray-50 focus:bg-white"
                    >
                      <option value="">{t('selectRequestPlaceholder')}</option>
                      {testRequests
                        .filter(req => req.username === uploadForm.selectedUsername)
                        .map((request) => (
                          <option key={request.id} value={request.id}>
                            {t('request')} #{request.id.slice(-6)} - {request.description.substring(0, 50)}... ({getStatusText(request.status)})
                          </option>
                        ))}
                    </select>
                    {testRequests.filter(req => req.username === uploadForm.selectedUsername).length === 0 && (
                      <p className="text-sm text-gray-500 mt-2">{t('noRequestsForUser')}</p>
                    )}
                  </div>
                )}

                {/* File Upload */}
                {uploadForm.selectedRequestId && (
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('selectFile')} (PDF, DOC, DOCX) *
                    </label>
                    <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setUploadForm({
                            ...uploadForm,
                            resultFile: file,
                            resultFileName: file?.name || '',
                          });
                        }}
                        required
                        className="hidden"
                        id="result-file-upload"
                      />
                      <label
                        htmlFor="result-file-upload"
                        className="cursor-pointer flex flex-col items-center gap-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">
                          {uploadForm.resultFileName || t('clickToSelectFile')}
                        </span>
                      </label>
                    </div>
                    {uploadForm.resultFile && (
                      <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                        <p className="text-sm text-green-700 flex items-center gap-2">
                          <CheckCircle className="w-4 h-4" />
                          {t('fileSelected')}: {uploadForm.resultFileName} ({(uploadForm.resultFile.size / 1024 / 1024).toFixed(2)} MB)
                        </p>
                      </div>
                    )}
                  </div>
                )}

                {/* Submit Button */}
                {uploadForm.selectedRequestId && uploadForm.resultFile && (
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {t('upload')}
                  </button>
                )}
              </form>
            </div>

            {/* Recent Uploads */}
            <div className="mt-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">{t('recentUploads')}</h3>
              <div className="space-y-3">
                {testRequests
                  .filter(req => req.status === 'completed' && req.resultFile)
                  .slice(0, 5)
                  .map((request) => (
                    <div key={request.id} className="bg-white p-4 rounded-xl shadow-lg border border-gray-100 flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{request.companyName}</p>
                        <p className="text-sm text-gray-600">{request.resultFileName}</p>
                      </div>
                      <a
                        href={request.resultFile}
                        download={request.resultFileName}
                        target={request.resultFile?.startsWith('data:') ? undefined : '_blank'}
                        className="px-4 py-2 bg-green-600 text-white rounded-xl font-semibold hover:bg-green-700 transition-all flex items-center gap-2"
                      >
                        <Download className="w-4 h-4" />
                        {t('download')}
                      </a>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{t('userManagement')}</h2>
              <button
                onClick={handleAddUser}
                className="px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                {t('addUser')}
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {users.map((userItem) => (
                <div
                  key={userItem.id}
                  className="bg-white p-6 rounded-2xl shadow-lg border border-gray-100 hover:shadow-xl transition-all"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className={`p-3 rounded-xl ${userItem.role === 'admin' ? 'bg-red-100' : 'bg-primary-100'}`}>
                        {userItem.role === 'admin' ? (
                          <Shield className="w-6 h-6 text-red-700" />
                        ) : (
                          <UserCircle className="w-6 h-6 text-primary-700" />
                        )}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{userItem.companyName}</h3>
                        <p className="text-sm text-gray-600">{userItem.username}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleEditUser(userItem)}
                        className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                      >
                        <Edit className="w-4 h-4 text-gray-600" />
                      </button>
                      {userItem.id !== user?.id && (
                        <button
                          onClick={() => {
                            if (confirm(t('confirmDeleteUser'))) {
                              deleteUser(userItem.id);
                            }
                          }}
                          className="p-2 hover:bg-red-100 rounded-lg transition-colors"
                        >
                          <Trash2 className="w-4 h-4 text-red-600" />
                        </button>
                      )}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Mail className="w-4 h-4" />
                      <span>{userItem.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone className="w-4 h-4" />
                      <span>{userItem.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 mt-3">
                      <span className={`px-3 py-1 rounded-lg text-xs font-semibold ${
                        userItem.role === 'admin' 
                          ? 'bg-red-100 text-red-700' 
                          : 'bg-primary-100 text-primary-700'
                      }`}>
                        {userItem.role === 'admin' ? t('admin') : t('user')}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Upload Modal */}
        {selectedRequest && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-md w-full">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-gray-900">{t('uploadResult')}</h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {t('uploadForRequest')} #{selectedRequest.id.slice(-6)}
                  </p>
                </div>
                <button
                  onClick={() => {
                    setSelectedRequest(null);
                    setUploadFile(null);
                  }}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                  <p className="text-sm text-blue-700">
                    <strong>{t('company')}:</strong> {selectedRequest.companyName}
                  </p>
                  <p className="text-sm text-blue-700 mt-1">
                    <strong>{t('description')}:</strong> {selectedRequest.description.substring(0, 100)}...
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    {t('selectFile')} (PDF, DOC, DOCX)
                  </label>
                  <div className="border-2 border-dashed border-gray-300 rounded-xl p-6 text-center hover:border-primary-500 transition-colors">
                    <input
                      type="file"
                      accept=".pdf,.doc,.docx"
                      onChange={(e) => setUploadFile(e.target.files?.[0] || null)}
                      className="hidden"
                      id="file-upload"
                    />
                    <label
                      htmlFor="file-upload"
                      className="cursor-pointer flex flex-col items-center gap-2"
                    >
                      <Upload className="w-8 h-8 text-gray-400" />
                      <span className="text-sm text-gray-600">
                        {uploadFile ? uploadFile.name : t('clickToSelectFile')}
                      </span>
                    </label>
                  </div>
                  {uploadFile && (
                    <div className="mt-2 p-3 bg-green-50 border border-green-200 rounded-lg">
                      <p className="text-sm text-green-700 flex items-center gap-2">
                        <CheckCircle className="w-4 h-4" />
                        {t('fileSelected')}: {uploadFile.name} ({(uploadFile.size / 1024 / 1024).toFixed(2)} MB)
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-3">
                  <p className="text-xs text-yellow-700">
                    {t('uploadNote')}
                  </p>
                </div>
                
                <div className="flex gap-3">
                  <button
                    onClick={() => handleFileUpload(selectedRequest.id)}
                    disabled={!uploadFile}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {t('upload')}
                  </button>
                  <button
                    onClick={() => {
                      setSelectedRequest(null);
                      setUploadFile(null);
                    }}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* User Modal */}
        {showUserModal && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white p-8 rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-bold text-gray-900">
                  {editingUser ? t('editUser') : t('addUser')}
                </h3>
                <button
                  onClick={() => setShowUserModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('username')} *
                    </label>
                    <input
                      type="text"
                      value={userForm.username}
                      onChange={(e) => setUserForm({ ...userForm, username: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('companyName')} *
                    </label>
                    <input
                      type="text"
                      value={userForm.companyName}
                      onChange={(e) => setUserForm({ ...userForm, companyName: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('email')} *
                    </label>
                    <input
                      type="email"
                      value={userForm.email}
                      onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('phone')} *
                    </label>
                    <input
                      type="tel"
                      value={userForm.phone}
                      onChange={(e) => setUserForm({ ...userForm, phone: e.target.value })}
                      required
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('password')} {editingUser ? `(${t('leaveEmptyToKeep')})` : '*'}
                    </label>
                    <input
                      type="password"
                      value={userForm.password}
                      onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                      required={!editingUser}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      {t('role')} *
                    </label>
                    <select
                      value={userForm.role}
                      onChange={(e) => setUserForm({ ...userForm, role: e.target.value as 'admin' | 'user' })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                    >
                      <option value="user">{t('user')}</option>
                      <option value="admin">{t('admin')}</option>
                    </select>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-4">{t('permissions')}</h4>
                  <div className="space-y-3">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userForm.permissions.canViewRequests}
                        onChange={(e) => setUserForm({
                          ...userForm,
                          permissions: { ...userForm.permissions, canViewRequests: e.target.checked }
                        })}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{t('canViewRequests')}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userForm.permissions.canViewResults}
                        onChange={(e) => setUserForm({
                          ...userForm,
                          permissions: { ...userForm.permissions, canViewResults: e.target.checked }
                        })}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{t('canViewResults')}</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={userForm.permissions.canUploadResults}
                        onChange={(e) => setUserForm({
                          ...userForm,
                          permissions: { ...userForm.permissions, canUploadResults: e.target.checked }
                        })}
                        className="w-5 h-5 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                      />
                      <span className="text-gray-700">{t('canUploadResults')}</span>
                    </label>
                  </div>
                </div>
                
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={handleSaveUser}
                    className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-xl font-semibold hover:bg-primary-700 transition-all flex items-center justify-center gap-2"
                  >
                    <Save className="w-5 h-5" />
                    {t('save')}
                  </button>
                  <button
                    onClick={() => setShowUserModal(false)}
                    className="px-6 py-3 bg-gray-200 text-gray-700 rounded-xl font-semibold hover:bg-gray-300 transition-all"
                  >
                    {t('cancel')}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
