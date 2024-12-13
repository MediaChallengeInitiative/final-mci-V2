import { useState, useCallback } from "react";

export type ToastType = "success" | "error" | "warning" | "info";

export interface Toast {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  title?: string;
}

export interface ToastOptions {
  type?: ToastType;
  duration?: number;
  title?: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const generateId = useCallback((): string => {
    return Date.now().toString(36) + Math.random().toString(36).slice(2);
  }, []);

  const removeToast = useCallback((id: string): void => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const addToast = useCallback(
    (message: string, options: ToastOptions = {}): string => {
      const { type = "info", duration = 5000, title } = options;

      const newToast: Toast = {
        id: generateId(),
        message,
        type,
        duration,
        title
      };

      setToasts((prev) => [...prev, newToast]);

      if (duration !== Infinity) {
        setTimeout(() => {
          removeToast(newToast.id);
        }, duration);
      }

      return newToast.id;
    },
    [generateId, removeToast] // Added removeToast to the dependency array
  );

  const clearToasts = useCallback((): void => {
    setToasts([]);
  }, []);

  const success = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">): string => {
      return addToast(message, { ...options, type: "success" });
    },
    [addToast]
  );

  const error = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">): string => {
      return addToast(message, { ...options, type: "error" });
    },
    [addToast]
  );

  const warning = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">): string => {
      return addToast(message, { ...options, type: "warning" });
    },
    [addToast]
  );

  const info = useCallback(
    (message: string, options?: Omit<ToastOptions, "type">): string => {
      return addToast(message, { ...options, type: "info" });
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearToasts,
    success,
    error,
    warning,
    info
  } as const;
};



// import { useState, useCallback } from "react";

// export type ToastType = "success" | "error" | "warning" | "info";

// export interface Toast {
//   id: string;
//   message: string;
//   type: ToastType;
//   duration?: number;
//   title?: string;
// }

// export interface ToastOptions {
//   type?: ToastType;
//   duration?: number;
//   title?: string;
// }

// export const useToast = () => {
//   const [toasts, setToasts] = useState<Toast[]>([]);

//   const generateId = useCallback((): string => {
//     return Date.now().toString(36) + Math.random().toString(36).slice(2);
//   }, []);

//   const addToast = useCallback(
//     (message: string, options: ToastOptions = {}): string => {
//       const { type = "info", duration = 5000, title } = options;

//       const newToast: Toast = {
//         id: generateId(),
//         message,
//         type,
//         duration,
//         title
//       };

//       setToasts((prev) => [...prev, newToast]);

//       if (duration !== Infinity) {
//         setTimeout(() => {
//           removeToast(newToast.id);
//         }, duration);
//       }

//       return newToast.id;
//     },
//     [generateId]
//   );

//   const removeToast = useCallback((id: string): void => {
//     setToasts((prev) => prev.filter((toast) => toast.id !== id));
//   }, []);

//   const clearToasts = useCallback((): void => {
//     setToasts([]);
//   }, []);

//   const success = useCallback(
//     (message: string, options?: Omit<ToastOptions, "type">): string => {
//       return addToast(message, { ...options, type: "success" });
//     },
//     [addToast]
//   );

//   const error = useCallback(
//     (message: string, options?: Omit<ToastOptions, "type">): string => {
//       return addToast(message, { ...options, type: "error" });
//     },
//     [addToast]
//   );

//   const warning = useCallback(
//     (message: string, options?: Omit<ToastOptions, "type">): string => {
//       return addToast(message, { ...options, type: "warning" });
//     },
//     [addToast]
//   );

//   const info = useCallback(
//     (message: string, options?: Omit<ToastOptions, "type">): string => {
//       return addToast(message, { ...options, type: "info" });
//     },
//     [addToast]
//   );

//   return {
//     toasts,
//     addToast,
//     removeToast,
//     clearToasts,
//     success,
//     error,
//     warning,
//     info
//   } as const;
// };
