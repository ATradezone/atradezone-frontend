'use client';

import { useAuth as useAuthContext } from '../context/AuthContext';

// This is just a re-export for convenience
// You can add additional logic here if needed
export const useAuth = () => {
  return useAuthContext();
};