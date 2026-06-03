import { createContext, useContext, useState, ReactNode } from 'react';

interface AppState {
  currentStep: number;
  completedSteps: number[];
  formData: Record<string, unknown>;
}

const defaultState: AppState = {
  currentStep: 0,
  completedSteps: [],
  formData: {},
};

const AppContext = createContext<{
  state: AppState;
  setState: (updater: (prev: AppState) => AppState) => void;
}>({
  state: defaultState,
  setState: () => {},
});

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, setStateRaw] = useState<AppState>(defaultState);
  const setState = (updater: (prev: AppState) => AppState) => {
    setStateRaw(updater);
  };
  return (
    <AppContext.Provider value={{ state, setState }}>
      {children}
    </AppContext.Provider>
  );
}

export const useApp = () => useContext(AppContext);
