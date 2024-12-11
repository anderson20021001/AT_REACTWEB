import React, { createContext, useContext, useState, useEffect } from 'react';

export interface DiaperEntry {
  id: string;
  timestamp: string;
  status: 'urine' | 'feces' | 'both' | 'clean';
  notes?: string;
}

export interface SleepEntry {
  id: string;
  startTime: string;
  endTime: string;
  notes?: string;
}

export interface FeedingEntry {
  id: string;
  startTime: string;
  endTime: string;
  type: 'bottle' | 'breast';
  amount?: number;
  side?: 'left' | 'right' | 'both';
  notes?: string;
}

interface TrackingContextType {
  diapers: DiaperEntry[];
  sleep: SleepEntry[];
  feeding: FeedingEntry[];
  addDiaper: (entry: Omit<DiaperEntry, 'id'>) => void;
  addSleep: (entry: Omit<SleepEntry, 'id'>) => void;
  addFeeding: (entry: Omit<FeedingEntry, 'id'>) => void;
}

const TrackingContext = createContext<TrackingContextType | null>(null);

export const TrackingProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [diapers, setDiapers] = useState<DiaperEntry[]>([]);
  const [sleep, setSleep] = useState<SleepEntry[]>([]);
  const [feeding, setFeeding] = useState<FeedingEntry[]>([]);

  useEffect(() => {
    const loadData = () => {
      const storedDiapers = localStorage.getItem('diapers');
      const storedSleep = localStorage.getItem('sleep');
      const storedFeeding = localStorage.getItem('feeding');

      if (storedDiapers) setDiapers(JSON.parse(storedDiapers));
      if (storedSleep) setSleep(JSON.parse(storedSleep));
      if (storedFeeding) setFeeding(JSON.parse(storedFeeding));
    };

    loadData();
  }, []);

  const addDiaper = (entry: Omit<DiaperEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    const newDiapers = [newEntry, ...diapers];
    setDiapers(newDiapers);
    localStorage.setItem('diapers', JSON.stringify(newDiapers));
  };

  const addSleep = (entry: Omit<SleepEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    const newSleep = [newEntry, ...sleep];
    setSleep(newSleep);
    localStorage.setItem('sleep', JSON.stringify(newSleep));
  };

  const addFeeding = (entry: Omit<FeedingEntry, 'id'>) => {
    const newEntry = { ...entry, id: Date.now().toString() };
    const newFeeding = [newEntry, ...feeding];
    setFeeding(newFeeding);
    localStorage.setItem('feeding', JSON.stringify(newFeeding));
  };

  return (
    <TrackingContext.Provider
      value={{
        diapers,
        sleep,
        feeding,
        addDiaper,
        addSleep,
        addFeeding,
      }}
    >
      {children}
    </TrackingContext.Provider>
  );
};

export const useTracking = () => {
  const context = useContext(TrackingContext);
  if (!context) {
    throw new Error('useTracking must be used within a TrackingProvider');
  }
  return context;
};