import React from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Header } from './components/Header';
import { SearchBar } from './components/SearchBar';
import { MemoList } from './components/MemoList';
import { MemoEditor } from './components/MemoEditor';
import type { Memo } from './types';

function App() {
  const [memos, setMemos] = useLocalStorage<Memo[]>('memos', []);
  const [searchTerm, setSearchTerm] = React.useState('');
  const [selectedMemo, setSelectedMemo] = React.useState<Memo | null>(null);
  const [isEditing, setIsEditing] = React.useState(false);

  const filteredMemos = memos.filter(
    memo =>
      memo.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memo.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const createNewMemo = () => {
    const newMemo: Memo = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    setMemos([newMemo, ...memos]);
    setSelectedMemo(newMemo);
    setIsEditing(true);
  };

  const updateMemo = (updatedMemo: Memo) => {
    setMemos(memos.map(memo => 
      memo.id === updatedMemo.id 
        ? { ...updatedMemo, updatedAt: new Date().toISOString() }
        : memo
    ));
    setSelectedMemo(null);
    setIsEditing(false);
  };

  const deleteMemo = (id: string) => {
    setMemos(memos.filter(memo => memo.id !== id));
    setSelectedMemo(null);
  };

  const handleMemoChange = (field: keyof Memo, value: string) => {
    if (selectedMemo) {
      setSelectedMemo({ ...selectedMemo, [field]: value });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-pink-50">
      <div className="container mx-auto px-6 py-8 max-w-7xl">
        <div className="flex flex-col gap-6">
          <Header onNewMemo={createNewMemo} />
          <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="md:col-span-1">
              <MemoList
                memos={filteredMemos}
                selectedMemoId={selectedMemo?.id ?? null}
                onSelectMemo={(memo) => {
                  setSelectedMemo(memo);
                  setIsEditing(false);
                }}
                onDeleteMemo={deleteMemo}
              />
            </div>
            <div className="md:col-span-2">
              <MemoEditor
                memo={selectedMemo}
                isEditing={isEditing}
                onEdit={() => setIsEditing(true)}
                onUpdate={updateMemo}
                onCancel={() => {
                  setSelectedMemo(null);
                  setIsEditing(false);
                }}
                onChange={handleMemoChange}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;