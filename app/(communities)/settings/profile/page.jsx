import SettingsProfileForm from "./_components/Form";

import { getUserProfile } from "@/libs/queries/users";

import { createClient } from "@/utils/supabase/server";

export default async function ProfileSettings() {
  const supabase = await createClient()
  const { data: { user }, error } = await supabase.auth.getUser()
  const { data: userProfileData } = await getUserProfile(user?.id)

  return (
    <SettingsProfileForm profile={userProfileData} />
  );
}
