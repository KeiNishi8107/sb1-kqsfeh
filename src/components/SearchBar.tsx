import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearch: (term: string) => void;
}

export function SearchBar({ searchTerm, onSearch }: SearchBarProps) {
  return (
    <div className="relative">
      <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-indigo-400" size={20} />
      <input
        type="text"
        placeholder="メモを検索..."
        value={searchTerm}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full pl-12 pr-4 py-3 bg-white/50 backdrop-blur-lg border border-indigo-100 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-sm transition-all"
      />
    </div>
  );
}