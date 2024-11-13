export interface Innovation {
    id: number;
    title: string;
    description: string;
    category: string;
    image: string;
    stats: {
      users: string;
      rating: number;
      impact: string;
    };
  }
  
  export interface AnimatedCounterProps {
    value: number;
    duration: number;
  }
  
  export interface CtaSectionProps {
    onSuccess?: () => void;
    onError?: (error: string) => void;
  }
  
  export interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    ideaName: string;
    ideaDescription: string;
    interests: string[];
  }
  
  export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
  }