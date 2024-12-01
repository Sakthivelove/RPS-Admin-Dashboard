import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define the type for the context state
interface AuthContextType {
  user: any; // Replace `any` with the actual user type if you have one
  setUser: React.Dispatch<React.SetStateAction<any>>; // Function to update user
}

// Create context with a default value of an empty object (you can adjust as needed)
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Define the type for AuthContextProvider props
interface AuthProviderProps {
  children: ReactNode;  // Expecting ReactNode as the children type
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<any>(null); // Replace `any` with your user type

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use the auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
