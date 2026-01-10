const emojiMap = {
  heart: "❤️",
  fire: "🔥",
  clap: "👏",
};

const FeedItem = ({ item }) => {
  if (item.type === "reaction") {
    return (
      <div className="text-sm">
        <span className="font-medium">User</span>{" "}
        reacted{" "}
        <span className="text-red-500">{emojiMap[item.reactionType || item.type] || "❤️"}</span>{" "}
        on an image
      </div>
    );
  }

  if (item.type === "comment") {
    return (
      <div className="text-sm">
        <span className="font-medium">User</span>{" "}
        commented on an image
      </div>
    );
  }

  return null;
};

export default FeedItem;
