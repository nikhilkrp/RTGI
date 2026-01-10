import { useFeed } from "../../hooks/useFeed";
import FeedItem from "./FeedItem";

const FeedList = () => {
  const { feed, isLoading, error } = useFeed();

  if (isLoading) {
    return (
      <div className="p-4 text-sm text-gray-500">
        Loading activity...
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 text-sm text-red-500">
        Failed to load feed
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col border-l">
      <div className="p-4 border-b font-semibold">
        Live Activity
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {feed.length === 0 ? (
          <p className="text-sm text-gray-400">
            No activity yet
          </p>
        ) : (
          feed.map((item) => (
            <FeedItem key={item.id} item={item} />
          ))
        )}
      </div>
    </div>
  );
};

export default FeedList;
