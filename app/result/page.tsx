'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { User, Answer } from '../../types';
import { getFromLocalStorage } from '../../lib/localStorage';

export default function Result() {
  const [user, setUser] = useState<User | null>(null);
  const [score, setScore] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const router = useRouter();

  useEffect(() => {
    // ใช้ Generic Type เพื่อกำหนด type ที่ชัดเจน
    const userData = getFromLocalStorage<User>('user');
    const userScore = getFromLocalStorage<number>('score') || 0;
    const userAnswers = getFromLocalStorage<Answer[]>('answers') || [];

    if (!userData) {
      router.push('/');
    } else {
      setUser(userData);
      setScore(userScore);
      setAnswers(userAnswers);
    }
  }, [router]);

  const resetQuiz = () => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
    router.push('/');
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-cyan-400">กำลังโหลด...</div>
    </div>;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg border border-cyan-500 shadow-2xl shadow-cyan-500/50 max-w-2xl w-full text-center">
        <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-600 mb-6">
          ผลลัพธ์
        </h1>
        
        <div className="mb-8">
          <p className="text-xl text-cyan-300 mb-2">สวัสดี {user.nickname}!</p>
          <p className="text-lg text-white mb-4">ชื่อ-นามสกุล: {user.fullName}</p>
          <div className="text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500 mb-4">
            {score}
          </div>
          <p className="text-xl text-gray-300">คะแนน</p>
        </div>

        <div className="mb-8 text-left">
          <h3 className="text-xl font-bold text-cyan-400 mb-4">สรุปคำตอบ:</h3>
          <div className="space-y-2">
            {answers.map((answer, index) => (
              <div key={answer.questionId} className="bg-gray-900 p-3 rounded-lg">
                <span className="text-cyan-300">คำถาม {answer.questionId}: </span>
                <span className="text-white">{answer.answer.toString()}</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={resetQuiz}
          className="bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition duration-300 transform hover:scale-105"
        >
          เล่นใหม่
        </button>
      </div>
    </div>
  );
}
