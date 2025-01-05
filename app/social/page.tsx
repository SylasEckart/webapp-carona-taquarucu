"use client";

import React, { useMemo } from 'react';
import { Box, Card, Fade } from '@mui/material';
import { SocialFriendsList } from './SocialList';
import { useAppContext } from '../context/AppContext';
import { useUserContext } from '../context/UserContext';
import { useFriendshipContext } from '../context/FriendshipContext';

export default function SocialPage() {
  const { isLoading: appLoading, listUsers } = useAppContext();
  const { user, isLoading: userLoading } = useUserContext();
  const { isLoading: friendsLoading, friendships } = useFriendshipContext();

  const updatedUsers = useMemo(() => {
    const friendshipMap = new Map(
      friendships.map((f) => [
        f.user_id_1 + "_" + f.user_id_2,
        f,
      ])
    );

    return listUsers.map((user) => {
      const friendship = Array.from(friendshipMap.values()).find(
        (f) => f.user_id_1 === user.user_id || f.user_id_2 === user.user_id
      );

      if (!friendship) {
        return { ...user, isFriend: false, isPending: false, friendshipId: null };
      }

      const isPending = friendship.status === "pendente";
      return {
        ...user,
        isSender: friendship.sender === user.user_id,
        isPending,
        friendshipId: friendship.friendship_id,
        isFriend: !isPending,
      };
    });
  }, [friendships, listUsers]);

  if (appLoading || userLoading || friendsLoading) return <div>Loading...</div>;
  if (!user) return <div>No user found</div>;

  return (
    <Box sx={{ flexGrow: 1, overflow: 'auto', p: 2 }}>
      <Fade in={true} timeout={1000}>
        <Card elevation={0} sx={{ my: 2, borderRadius: 4 }}>
          <SocialFriendsList
            initialUsers={updatedUsers}
            myUserId={user.user_id}
          />
        </Card>
      </Fade>
    </Box>
  );
}
