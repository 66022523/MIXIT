"use client";
import { useState, useEffect, createContext, useContext } from "react";

import { getUser as getAuthUser } from "@/lib/queries/auth";
import { getProfile } from "@/lib/queries/users";

const ProfileContext = createContext();

export function ProfileProvider({ children }) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfileData = async () => {
      const { user } = await getAuthUser();
      const profile = await getProfile(user.id);
      setProfile(profile);
    };
    getProfileData();
  }, []);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
