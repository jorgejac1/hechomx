'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import AuthPageWrapper from '@/components/auth/AuthPageWrapper';
import { getSellerMessages } from '@/lib/api/sellerApi';
import type { SellerMessage } from '@/lib/types';
import type { User } from '@/contexts/AuthContext';
import { formatRelativeTime, ROUTES } from '@/lib';
import LoadingSpinner from '@/components/common/feedback/LoadingSpinner';
import {
  Mail,
  MailOpen,
  Send,
  Search,
  Filter,
  ArrowLeft,
  Package,
  Clock,
  CheckCircle2,
} from 'lucide-react';

export default function MessagesPage() {
  return (
    <AuthPageWrapper requireSeller loadingText="Cargando mensajes...">
      {(user) => <MessagesContent user={user} />}
    </AuthPageWrapper>
  );
}

function MessagesContent({ user }: { user: User }) {
  const router = useRouter();
  const [messages, setMessages] = useState<SellerMessage[]>([]);
  const [filteredMessages, setFilteredMessages] = useState<SellerMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState<'all' | 'unread' | 'read'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMessage, setSelectedMessage] = useState<SellerMessage | null>(null);
  const [replyText, setReplyText] = useState('');

  useEffect(() => {
    async function loadMessages() {
      setIsLoading(true);
      const data = await getSellerMessages(user.email);
      setMessages(data);
      setFilteredMessages(data);
      setIsLoading(false);
    }
    loadMessages();
  }, [user.email]);

  // Filter messages
  useEffect(() => {
    let filtered = messages;

    if (filterStatus !== 'all') {
      filtered = filtered.filter((msg) => msg.status === filterStatus);
    }

    if (searchQuery) {
      filtered = filtered.filter(
        (msg) =>
          msg.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
          msg.from.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredMessages(filtered);
  }, [filterStatus, searchQuery, messages]);

  if (isLoading) {
    return <LoadingSpinner size="lg" fullScreen text="Cargando mensajes..." />;
  }

  const unreadCount = messages.filter((m) => m.status === 'unread').length;

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) return;

    console.log('Sending reply:', replyText);

    const updatedMessages = messages.map((msg) =>
      msg.id === selectedMessage.id
        ? {
            ...msg,
            status: 'read' as const,
            replies: [
              ...(msg.replies || []),
              {
                from: 'seller' as const,
                message: replyText,
                date: new Date().toISOString(),
              },
            ],
          }
        : msg
    );

    setMessages(updatedMessages);
    setSelectedMessage({
      ...selectedMessage,
      status: 'read',
      replies: [
        ...(selectedMessage.replies || []),
        {
          from: 'seller',
          message: replyText,
          date: new Date().toISOString(),
        },
      ],
    });
    setReplyText('');
  };

  const markAsRead = (message: SellerMessage) => {
    if (message.status === 'read') return;

    const updatedMessages = messages.map((msg) =>
      msg.id === message.id ? { ...msg, status: 'read' as const } : msg
    );
    setMessages(updatedMessages);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 sm:p-6">
        {/* Header */}
        <div className="mb-6">
          <button
            onClick={() => router.push(ROUTES.DASHBOARD)}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-900 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Volver al Dashboard
          </button>
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Mensajes</h1>
          <p className="text-gray-600 mt-1">
            {unreadCount > 0 ? (
              <>
                <span className="font-semibold text-primary-600">{unreadCount}</span>{' '}
                {unreadCount === 1 ? 'mensaje sin leer' : 'mensajes sin leer'}
              </>
            ) : (
              'Todos los mensajes leídos'
            )}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Messages List */}
          <div className="lg:col-span-1 bg-white rounded-xl shadow-md overflow-hidden">
            {/* Filters */}
            <div className="p-4 border-b border-gray-200">
              <div className="mb-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Buscar mensajes..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mb-2">
                <Filter className="w-4 h-4 text-gray-600" />
                <span className="text-xs font-semibold text-gray-700">Filtrar por estado:</span>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => setFilterStatus('all')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filterStatus === 'all'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Todos
                </button>
                <button
                  onClick={() => setFilterStatus('unread')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filterStatus === 'unread'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Sin leer ({unreadCount})
                </button>
                <button
                  onClick={() => setFilterStatus('read')}
                  className={`flex-1 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    filterStatus === 'read'
                      ? 'bg-primary-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  Leídos
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredMessages.length === 0 ? (
                <div className="p-8 text-center">
                  <Mail className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 text-sm">No hay mensajes</p>
                </div>
              ) : (
                filteredMessages.map((message) => (
                  <button
                    key={message.id}
                    onClick={() => {
                      setSelectedMessage(message);
                      markAsRead(message);
                    }}
                    className={`w-full p-4 text-left hover:bg-gray-50 transition ${
                      selectedMessage?.id === message.id ? 'bg-primary-50' : ''
                    } ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start gap-3">
                      {message.from.avatar ? (
                        <Image
                          src={message.from.avatar}
                          alt={message.from.name}
                          width={40}
                          height={40}
                          className="rounded-full shrink-0"
                        />
                      ) : (
                        <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center shrink-0">
                          <span className="text-gray-600 font-semibold text-sm">
                            {message.from.name.charAt(0)}
                          </span>
                        </div>
                      )}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <p
                            className={`text-sm font-semibold truncate ${
                              message.status === 'unread' ? 'text-gray-900' : 'text-gray-700'
                            }`}
                          >
                            {message.from.name}
                          </p>
                          {message.status === 'unread' ? (
                            <Mail className="w-4 h-4 text-blue-600 shrink-0" />
                          ) : (
                            <MailOpen className="w-4 h-4 text-gray-400 shrink-0" />
                          )}
                        </div>
                        <p className="text-xs font-medium text-gray-900 truncate mb-1">
                          {message.subject}
                        </p>
                        <p className="text-xs text-gray-600 truncate">{message.message}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <Clock className="w-3 h-3 text-gray-400" />
                          <span className="text-xs text-gray-500">
                            {formatRelativeTime(message.date)}
                          </span>
                          {message.orderId && (
                            <>
                              <span className="text-gray-300">•</span>
                              <Package className="w-3 h-3 text-gray-400" />
                              <span className="text-xs text-gray-500">{message.orderId}</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>

          {/* Message Detail */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-md overflow-hidden">
            {selectedMessage ? (
              <div className="flex flex-col h-[700px]">
                {/* Header */}
                <div className="p-6 border-b border-gray-200">
                  <div className="flex items-start gap-4 mb-4">
                    {selectedMessage.from.avatar ? (
                      <Image
                        src={selectedMessage.from.avatar}
                        alt={selectedMessage.from.name}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gray-300 rounded-full flex items-center justify-center">
                        <span className="text-gray-600 font-semibold">
                          {selectedMessage.from.name.charAt(0)}
                        </span>
                      </div>
                    )}
                    <div className="flex-1">
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        {selectedMessage.subject}
                      </h2>
                      <p className="text-sm text-gray-600">De: {selectedMessage.from.name}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {formatRelativeTime(selectedMessage.date)}
                      </p>
                    </div>
                    {selectedMessage.status === 'read' && (
                      <CheckCircle2 className="w-5 h-5 text-green-600" />
                    )}
                  </div>
                  {selectedMessage.orderId && (
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-blue-50 rounded-lg">
                      <Package className="w-4 h-4 text-blue-600" />
                      <span className="text-sm font-medium text-blue-900">
                        Pedido: {selectedMessage.orderId}
                      </span>
                    </div>
                  )}
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto p-6 space-y-4">
                  {/* Original Message */}
                  <div className="bg-gray-50 rounded-lg p-4">
                    <p className="text-sm text-gray-900">{selectedMessage.message}</p>
                  </div>

                  {/* Replies */}
                  {selectedMessage.replies?.map((reply, index) => (
                    <div
                      key={index}
                      className={`rounded-lg p-4 ${
                        reply.from === 'seller' ? 'bg-primary-50 ml-8' : 'bg-gray-50 mr-8'
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <p className="text-xs font-semibold text-gray-900">
                          {reply.from === 'seller' ? 'Tú' : selectedMessage.from.name}
                        </p>
                        <span className="text-xs text-gray-500">
                          {formatRelativeTime(reply.date)}
                        </span>
                      </div>
                      <p className="text-sm text-gray-900">{reply.message}</p>
                    </div>
                  ))}
                </div>

                {/* Reply Input */}
                <div className="p-6 border-t border-gray-200">
                  <div className="flex gap-3">
                    <textarea
                      value={replyText}
                      onChange={(e) => setReplyText(e.target.value)}
                      placeholder="Escribe tu respuesta..."
                      rows={3}
                      className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 resize-none"
                    />
                    <button
                      onClick={handleSendReply}
                      disabled={!replyText.trim()}
                      className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition font-medium disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center gap-2 h-fit"
                    >
                      <Send className="w-4 h-4" />
                      Enviar
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[700px]">
                <div className="text-center">
                  <Mail className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                  <p className="text-gray-600">Selecciona un mensaje para ver los detalles</p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
