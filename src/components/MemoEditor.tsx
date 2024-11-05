import React from 'react';
import { Save, X, Edit } from 'lucide-react';
import { Memo } from '../types';

interface MemoEditorProps {
  memo: Memo | null;
  isEditing: boolean;
  onEdit: () => void;
  onUpdate: (memo: Memo) => void;
  onCancel: () => void;
  onChange: (field: keyof Memo, value: string) => void;
}

export function MemoEditor({
  memo,
  isEditing,
  onEdit,
  onUpdate,
  onCancel,
  onChange,
}: MemoEditorProps) {
  if (!memo) {
    return (
      <div className="flex items-center justify-center h-[calc(100vh-240px)] bg-white/50 backdrop-blur-lg rounded-xl">
        <p className="text-gray-500">メモを選択してください</p>
      </div>
    );
  }

  return (
    <div className="bg-white/50 backdrop-blur-lg rounded-xl p-6 h-[calc(100vh-240px)] flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <input
          type="text"
          value={memo.title}
          onChange={(e) => onChange('title', e.target.value)}
          placeholder="タイトルを入力..."
          disabled={!isEditing}
          className="text-xl font-medium w-full bg-transparent focus:outline-none disabled:text-gray-800"
        />
        <div className="flex gap-2">
          {isEditing ? (
            <>
              <button
                onClick={() => onUpdate(memo)}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md"
              >
                <Save size={16} />
                保存
              </button>
              <button
                onClick={onCancel}
                className="flex items-center gap-1 px-4 py-2 bg-gradient-to-r from-gray-500 to-gray-600 text-white rounded-lg hover:opacity-90 transition-all shadow-md"
              >
                <X size={16} />
                キャンセル
              </button>
            </>
          ) : (
            <button
              onClick={onEdit}
              className="flex items-center gap-1 px-4 py-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all"
            >
              <Edit size={16} />
              編集
            </button>
          )}
        </div>
      </div>
      <textarea
        value={memo.content}
        onChange={(e) => onChange('content', e.target.value)}
        placeholder="メモを入力..."
        disabled={!isEditing}
        className="flex-1 w-full bg-transparent focus:outline-none resize-none disabled:text-gray-800 custom-scrollbar"
      />
    </div>
  );
}