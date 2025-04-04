import React from 'react';
import { getProfileData } from '@/lib/profile';
import ProfileClientUI from '@/components/Profile/ProfileClientUI';

export default async function ProfilePage() {
  const profile = await getProfileData('keith');

  return <ProfileClientUI profile={profile} />;
}
