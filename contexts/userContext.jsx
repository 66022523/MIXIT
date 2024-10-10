"use client";
import { useState, useEffect, createContext, useContext } from "react";

import { getUser } from "@/lib/queries/auth";

const UserContext = createContext();

export function UserProvider({ children }) {
  const [user, setUser] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const { user } = await getUser();
      setUser(user);
    };
    getUserData();
  }, []);

  return (
    <UserContext.Provider value={user}>
      {children}
    </UserContext.Provider>
  );
}

export const useUser = () => useContext(UserContext);
