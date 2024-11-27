import React from 'react';
import { StaffSkeleton } from '@/components/staff/StaffSkeleton';

export default function Loading() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="animate-pulse">
          <div className="h-12 w-48 bg-gray-200 rounded-lg mx-auto" />
          <div className="h-6 w-64 bg-gray-200 rounded-lg mx-auto mt-4" />
        </div>
        <StaffSkeleton count={8} />
      </div>
    </main>
  );
}