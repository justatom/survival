'use client';

import { useState } from 'react';
import { QuizQuestion as QuizQuestionType } from '../types';

interface QuizQuestionProps {
  question: QuizQuestionType;
  onAnswer: (answer: string | number) => void;
  userNickname: string;
}

export default function QuizQuestion({ question, onAnswer, userNickname }: QuizQuestionProps) {
  const [selectedAnswer, setSelectedAnswer] = useState<string | number>('');
  const [textAnswer, setTextAnswer] = useState('');
  const [rangeAnswer, setRangeAnswer] = useState(50);

  const handleSubmit = () => {
    let answer;
    switch (question.type) {
      case 'multiple-choice':
        answer = selectedAnswer;
        break;
      case 'text':
        answer = textAnswer;
        break;
      case 'range':
        answer = rangeAnswer;
        break;
      default:
        return;
    }
    onAnswer(answer);
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="bg-black bg-opacity-80 p-8 rounded-lg border border-cyan-500 shadow-2xl shadow-cyan-500/50 max-w-2xl w-full">
        <div className="mb-6">
          <p className="text-cyan-300 text-sm mb-2">สวัสดี {userNickname}!</p>
          <h2 className="text-2xl font-bold text-white mb-6">{question.question}</h2>
        </div>

        {question.type === 'multiple-choice' && (
          <div className="space-y-3 mb-6">
            {question.options?.map((option, index) => (
              <button
                key={index}
                onClick={() => setSelectedAnswer(option)}
                className={`w-full p-4 text-left rounded-lg border transition duration-300 ${
                  selectedAnswer === option
                    ? 'border-purple-500 bg-purple-900 bg-opacity-50 text-purple-200'
                    : 'border-cyan-500 bg-gray-900 text-white hover:bg-cyan-900 hover:bg-opacity-30'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        )}

        {question.type === 'text' && (
          <div className="mb-6">
            <textarea
              value={textAnswer}
              onChange={(e) => setTextAnswer(e.target.value)}
              className="w-full px-4 py-3 bg-gray-900 border border-cyan-500 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 min-h-[120px]"
              placeholder="พิมพ์คำตอบของคุณ..."
            />
          </div>
        )}

        {question.type === 'range' && (
          <div className="mb-6">
            <div className="text-center mb-4">
              <span className="text-2xl font-bold text-cyan-400">{rangeAnswer}</span>
            </div>
            <input
              type="range"
              min={question.min || 0}
              max={question.max || 100}
              value={rangeAnswer}
              onChange={(e) => setRangeAnswer(parseInt(e.target.value))}
              className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
            />
            <div className="flex justify-between text-sm text-gray-400 mt-2">
              <span>{question.min || 0}</span>
              <span>{question.max || 100}</span>
            </div>
          </div>
        )}

        <button
          onClick={handleSubmit}
          disabled={
            (question.type === 'multiple-choice' && !selectedAnswer) ||
            (question.type === 'text' && !textAnswer.trim())
          }
          className="w-full bg-gradient-to-r from-cyan-500 to-purple-600 text-white font-bold py-3 px-4 rounded-lg hover:from-cyan-600 hover:to-purple-700 transition duration-300 transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
        >
          ตอบคำถาม
        </button>
      </div>
    </div>
  );
}
