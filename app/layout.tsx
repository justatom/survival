import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import BackgroundVideo from '../components/BackgroundVideo';
import BackgroundMusic from '../components/BackgroundMusic';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Survival Quiz Game',
  description: 'Interactive futuristic quiz game',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="th">
      <body className={inter.className}>
        <BackgroundVideo />
        <BackgroundMusic />
        <main className="relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}
