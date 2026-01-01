import { db } from "@instantdb/react";

export const useFeed = () => {
  const { isLoading, error, data } = db.useQuery({
    feed: {
      $: {
        order: { createdAt: "desc" }, 
      },
    },
  });

  return {
    feed: data?.feed || [],
    isLoading,
    error,
  };
};
