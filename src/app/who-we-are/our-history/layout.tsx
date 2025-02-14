// app/who-we-are/our-history/layout.tsx

import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Our History | Who We Are',
  description: 'Explore our journey of innovation and growth through the years.',
};

export default function HistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}