import React from 'react';
import { Trash2, Clock } from 'lucide-react';
import { Memo } from '../types';
import { formatDate } from '../utils/formatDate';

interface MemoListProps {
  memos: Memo[];
  selectedMemoId: string | null;
  onSelectMemo: (memo: Memo) => void;
  onDeleteMemo: (id: string) => void;
}

export function MemoList({ memos, selectedMemoId, onSelectMemo, onDeleteMemo }: MemoListProps) {
  return (
    <div className="space-y-4 overflow-y-auto max-h-[calc(100vh-240px)] pr-2 custom-scrollbar">
      {memos.map(memo => (
        <div
          key={memo.id}
          onClick={() => onSelectMemo(memo)}
          className={`p-5 rounded-xl cursor-pointer transition-all group ${
            selectedMemoId === memo.id
              ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg'
              : 'bg-white/50 backdrop-blur-lg hover:bg-white/80 shadow-sm hover:shadow-md'
          }`}
        >
          <div className="flex justify-between items-start">
            <h3 className={`font-medium line-clamp-1 ${
              selectedMemoId === memo.id ? 'text-white' : 'text-gray-800'
            }`}>
              {memo.title || '無題のメモ'}
            </h3>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onDeleteMemo(memo.id);
              }}
              className={`opacity-0 group-hover:opacity-100 ${
                selectedMemoId === memo.id
                  ? 'text-white/70 hover:text-white'
                  : 'text-gray-400 hover:text-red-500'
              } transition-all`}
            >
              <Trash2 size={16} />
            </button>
          </div>
          <p className={`text-sm mt-2 line-clamp-2 ${
            selectedMemoId === memo.id ? 'text-white/90' : 'text-gray-600'
          }`}>
            {memo.content}
          </p>
          <div className={`flex items-center gap-1 text-xs mt-3 ${
            selectedMemoId === memo.id ? 'text-white/70' : 'text-gray-400'
          }`}>
            <Clock size={12} />
            {formatDate(memo.updatedAt)}
          </div>
        </div>
      ))}
      {memos.length === 0 && (
        <div className="text-center py-12 text-gray-500 bg-white/50 backdrop-blur-lg rounded-xl">
          メモが見つかりません
        </div>
      )}
    </div>
  );
}