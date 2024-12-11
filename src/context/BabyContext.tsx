import React, { createContext, useContext, useState, useEffect } from 'react';

interface BabyInfo {
  name: string;
  weight: number;
  length: number;
  birthDate: string;
  gender: 'male' | 'female';
  photo: string;
}

interface BabyContextType {
  babyInfo: BabyInfo;
  updateBabyInfo: (info: Partial<BabyInfo>) => void;
}

const defaultBabyInfo: BabyInfo = {
  name: 'Sofia Martinez',
  weight: 3.5,
  length: 49,
  birthDate: '2024-01-15',
  gender: 'female',
  photo: 'https://images.unsplash.com/photo-1519689680058-324335c77eba?q=80&w=2940&auto=format&fit=crop'
};

const BabyContext = createContext<BabyContextType | null>(null);

export const BabyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [babyInfo, setBabyInfo] = useState<BabyInfo>(defaultBabyInfo);

  useEffect(() => {
    const storedInfo = localStorage.getItem('babyInfo');
    if (storedInfo) {
      setBabyInfo(JSON.parse(storedInfo));
    }
  }, []);

  const updateBabyInfo = (info: Partial<BabyInfo>) => {
    const newInfo = { ...babyInfo, ...info };
    setBabyInfo(newInfo);
    localStorage.setItem('babyInfo', JSON.stringify(newInfo));
  };

  return (
    <BabyContext.Provider value={{ babyInfo, updateBabyInfo }}>
      {children}
    </BabyContext.Provider>
  );
};

export const useBaby = () => {
  const context = useContext(BabyContext);
  if (!context) {
    throw new Error('useBaby must be used within a BabyProvider');
  }
  return context;
};