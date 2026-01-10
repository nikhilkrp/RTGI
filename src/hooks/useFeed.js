import { db } from "../api/instantdb";

export const useFeed = () => {
  const { isLoading, error, data } = db.useQuery({
    feed: {
      $: {},
    },
  });

  return {
    feed: data?.feed || [],
    isLoading,
    error,
  };
};
