import React from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import getQueryClient from "@/lib/react-query/getQueryClient";
import { profileApi } from "@/lib/api/profile.api";
import ProfileClient from "@/components/admins/account/ProfileClient";

export default async function ProfilePage() {
  const queryClient = getQueryClient();

  // Prefetch data on the server
  await queryClient.prefetchQuery({
    queryKey: ["profile"],
    queryFn: profileApi.getProfile,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProfileClient />
    </HydrationBoundary>
  );
}
