import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'TimeTrack Pro - Smart Timesheet Management',
  description: 'Track time, boost productivity, and simplify timesheet management for modern teams',
  keywords: 'timesheet, time tracking, productivity, team management, hours tracking',
  authors: [{ name: 'TimeTrack Pro' }],
  openGraph: {
    type: 'website',
    title: 'TimeTrack Pro - Smart Timesheet Management',
    description: 'Track time, boost productivity, and simplify timesheet management for modern teams',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}