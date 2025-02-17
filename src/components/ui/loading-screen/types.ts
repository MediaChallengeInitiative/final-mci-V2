// components/ui/loading-screen/types.ts
export interface LoadingState {
  isLoading: boolean;
  progress?: number;
  message?: string;
}

export interface LoadingContextType {
  loadingState: LoadingState;
  setLoadingState: (state: LoadingState) => void;
}
