import { useMemo } from "react";

const EmojiBar = ({
  reactions = [],
  onReact,
  activeEmoji = "heart",
}) => {

  const emojiCounts = useMemo(() => {
    return reactions.reduce((acc, reaction) => {
      acc[reaction.type] = (acc[reaction.type] || 0) + 1;
      return acc;
    }, {});
  }, [reactions]);

  const emojis = [
    { type: "heart", label: "❤️" },
    { type: "fire", label: "🔥" },
    { type: "clap", label: "👏" },
  ];

  return (
    <div className="flex gap-3 items-center mt-3">
      {emojis.map((emoji) => (
        <button
          key={emoji.type}
          onClick={() => onReact(emoji.type)}
          className="flex items-center gap-1 text-sm hover:scale-110 transition"
        >
          <span>{emoji.label}</span>
          {emojiCounts[emoji.type] > 0 && (
            <span className="text-gray-600">
              {emojiCounts[emoji.type]}
            </span>
          )}
        </button>
      ))}
    </div>
  );
};

export default EmojiBar;

