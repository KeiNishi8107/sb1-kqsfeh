import React from 'react';
import { Plus, BookMarked } from 'lucide-react';

interface HeaderProps {
  onNewMemo: () => void;
}

export function Header({ onNewMemo }: HeaderProps) {
  return (
    <header className="flex items-center justify-between bg-white/50 backdrop-blur-lg rounded-2xl p-6 shadow-sm">
      <div className="flex items-center gap-3">
        <BookMarked size={32} className="text-indigo-600" />
        <h1 className="text-3xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          メモ帳
        </h1>
      </div>
      <button
        onClick={onNewMemo}
        className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-xl hover:opacity-90 transition-all shadow-md hover:shadow-lg active:scale-95"
      >
        <Plus size={20} />
        新規メモ
      </button>
    </header>
  );
}