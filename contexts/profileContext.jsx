"use client";
import { useState, useEffect, createContext, useContext } from "react";

import { getProfile } from "@/lib/queries/users";

const ProfileContext = createContext();

export function ProfileProvider({ id, children }) {
  const [profile, setProfile] = useState();

  useEffect(() => {
    const getProfileData = async () => {
      if (id) {
        const profile = await getProfile(id);
        setProfile(profile);
      }
    };
    getProfileData();
  }, [id]);

  return (
    <ProfileContext.Provider value={profile}>
      {children}
    </ProfileContext.Provider>
  );
}

export const useProfile = () => useContext(ProfileContext);
