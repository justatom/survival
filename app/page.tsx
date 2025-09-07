'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import UserForm from '../components/UserForm';
import { User } from '../types';
import { saveToLocalStorage } from '../lib/localStorage';

export default function Home() {
  const router = useRouter();

  const handleUserSubmit = (userData: User) => {
    // บันทึกข้อมูลใน localStorage
    saveToLocalStorage('user', userData);
    // ไปหน้า quiz
    router.push('/quiz');
  };

  return (
    <div>
      <UserForm onSubmit={handleUserSubmit} />
    </div>
  );
}
