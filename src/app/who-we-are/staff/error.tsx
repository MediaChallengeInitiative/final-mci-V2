// app/who-we-are/staff/error.tsx
'use client';

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h2 className="text-xl font-semibold">Something went wrong!</h2>
        <Button
          onClick={reset}
          variant="default"
          className="bg-blue-500 hover:bg-blue-600 text-white"
        >
          Try again
        </Button>
      </div>
    </div>
  );
}




// "use client";
// import React from "react";

// export default function Error({
//   error,
//   reset
// }: {
//   error: Error & { digest?: string };
//   reset: () => void;
// }) {
//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100">
//       <div className="text-center">
//         <h2 className="text-2xl font-bold text-gray-900 mb-4">
//           Something went wrong
//         </h2>
//         <button
//           onClick={() => reset()}
//           className="px-4 py-2 rounded-2xl bg-orange-500 text-white hover:bg-orange-600 transition-colors"
//         >
//           Try again
//         </button>
//       </div>
//     </div>
//   );
// }
