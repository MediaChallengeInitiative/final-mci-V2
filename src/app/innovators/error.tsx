'use client';

export default function Error({ 
  error 
}: { 
  error: Error 
}) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full mx-auto p-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Something Went Wrong
          </h2>
          <p className="text-gray-600 mb-8">
            {error.message || "An unexpected error occurred. Please try again later."}
          </p>
          <div className="space-y-4">
            
             <a href="/"
              className="inline-block bg-sky-500 text-white px-6 py-3 rounded-lg font-medium hover:bg-sky-600 transition-colors"
            >
              Return Home
            </a>
            <button
              onClick={() => window.location.reload()}
              className="block w-full text-sky-500 hover:text-sky-600 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}