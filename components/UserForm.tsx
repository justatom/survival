'use client';

import { useState } from 'react';
import { User } from '../types';

interface UserFormProps {
  onSubmit: (user: User) => void;
}

export default function UserForm({ onSubmit }: UserFormProps) {
  const [nickname, setNickname] = useState('');
  const [fullName, setFullName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (nickname.trim() && fullName.trim()) {
      onSubmit({ nickname: nickname.trim(), fullName: fullName.trim() });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg border border-cyan-500 shadow-2xl shadow-cyan-500/50 max-w-md w-full">
        <h1 className="text-4xl font-bold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600">
          SURVIVAL
        </h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-cyan-300 text-sm font-bold mb-2">
              ชื่อเล่น
            </label>
            <input
              type="text"
              value={nickname}
              onChange={(e) => setNickname(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-cyan-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="กรอกชื่อเล่น"
              required
            />
          </div>
          
          <div>
            <label className="block text-cyan-300 text-sm font-bold mb-2">
              ชื่อ-นามสกุล
            </label>
            <input
              type="text"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              className="w-full px-4 py-2 bg-gray-900 border border-cyan-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
              placeholder="กรอกชื่อ-นามสกุล"
              required
            />
          </div>
          
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
          >
            เริ่มเกม
          </button>
        </form>
      </div>
    </div>
  );
}
