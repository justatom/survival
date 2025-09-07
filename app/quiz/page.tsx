'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import QuizQuestion from '../../components/QuizQuestion';
import { User, QuizQuestion as QuizQuestionType, Answer } from '../../types';
import { getFromLocalStorage, saveToLocalStorage } from '../../lib/localStorage';

const questions: QuizQuestionType[] = [
  {
    id: 1,
    question: "หากคุณติดอยู่บนเกาะร้าง สิ่งแรกที่คุณจะทำคืออะไร?",
    type: 'multiple-choice',
    options: [
      "หาน้ำสะอาด",
      "สร้างที่พักพิง",
      "หาอาหาร",
      "ส่งสัญญาณขอความช่วยเหลือ"
    ],
    correct: "หาน้ำสะอาด"
  },
  {
    id: 2,
    question: "บรรยายความรู้สึกของคุณเมื่อต้องเอาตัวรอดในป่า",
    type: 'text'
  },
  {
    id: 3,
    question: "คุณคิดว่าคุณสามารถเอาตัวรอดได้กี่วันโดยไม่มีอาหารและน้ำ? (วัน)",
    type: 'range',
    min: 1,
    max: 30
  },
];

export default function Quiz() {
  const [user, setUser] = useState<User | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [score, setScore] = useState(0);
  const router = useRouter();

  useEffect(() => {
    // ใช้ Generic type เพื่อกำหนด type ที่คืนกลับมา
    const userData = getFromLocalStorage<User>('user');
    if (!userData) {
      router.push('/');
    } else {
      setUser(userData);
    }
  }, [router]);

  const handleAnswer = (answer: string | number) => {
    const newAnswer: Answer = {
      questionId: questions[currentQuestion].id,
      answer
    };

    const newAnswers = [...answers, newAnswer];
    setAnswers(newAnswers);

    // คำนวณคะแนน
    let newScore = score;
    const question = questions[currentQuestion];
    if (question.type === 'multiple-choice' && question.correct === answer) {
      newScore += 10;
      setScore(newScore);
    }

    // บันทึกข้อมูล
    saveToLocalStorage('answers', newAnswers);
    saveToLocalStorage('score', newScore);

    // ไปคำถามถัดไป หรือหน้าผลลัพธ์
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      router.push('/result');
    }
  };

  if (!user) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-cyan-400">กำลังโหลด...</div>
    </div>;
  }

  return (
    <QuizQuestion
      question={questions[currentQuestion]}
      onAnswer={handleAnswer}
      userNickname={user.nickname}
    />
  );
}
