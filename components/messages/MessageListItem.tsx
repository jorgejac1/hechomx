'use client';

import { memo } from 'react';
import { Mail, MailOpen, Clock, Package } from 'lucide-react';
import { formatRelativeTime } from '@/lib';
import Avatar from '@/components/common/Avatar';
import type { SellerMessage } from '@/lib/types';

interface MessageListItemProps {
  message: SellerMessage;
  isSelected: boolean;
  onClick: () => void;
}

const MessageListItem = memo(function MessageListItem({
  message,
  isSelected,
  onClick,
}: MessageListItemProps) {
  return (
    <button
      onClick={onClick}
      className={`w-full p-4 text-left hover:bg-gray-50 transition ${
        isSelected ? 'bg-primary-50' : ''
      } ${message.status === 'unread' ? 'bg-blue-50' : ''}`}
    >
      <div className="flex items-start gap-3">
        <Avatar
          src={message.from.avatar}
          name={message.from.name}
          alt={message.from.name}
          size="md"
        />
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
          <p className="text-xs font-medium text-gray-900 truncate mb-1">{message.subject}</p>
          <p className="text-xs text-gray-600 truncate">{message.message}</p>
          <div className="flex items-center gap-2 mt-2">
            <Clock className="w-3 h-3 text-gray-400" />
            <span className="text-xs text-gray-500">{formatRelativeTime(message.date)}</span>
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
  );
});

export default MessageListItem;
