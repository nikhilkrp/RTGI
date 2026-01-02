import { useCallback } from "react";
import { db } from "../../api/instantdb";
import { useUserStore } from "../../store/useUserStore";

const ImageCard = ({ image }) => {
  const { userId, setActiveImage } = useUserStore();

  const handleReaction = useCallback(
    async (emoji) => {
      try {
        await db.transact([
          db.tx.reactions.create({
            imageId: image.id,
            emoji,
            userId,
            createdAt: Date.now(),
          }),
          db.tx.feed.create({
            type: "reaction",
            imageId: image.id,
            emoji,
            userId,
            createdAt: Date.now(),
          }),
        ]);
      } catch (error) {
        console.log("Failed to react. Please retry.",error)
      }
    },
    [image.id, userId]
  );

    if (!image?.urls?.small) return null;

  return (
    <div className="relative group cursor-pointer">
      <img
        src={image.urls.small}
        alt={image.alt_description}
        className="w-full h-48 object-cover rounded"
        onClick={() => setActiveImage(image.id)}
      />

      <div className="absolute bottom-2 left-2 hidden group-hover:flex gap-2 bg-white/80 px-2 py-1 rounded">
        <button onClick={() => handleReaction("❤️")}>❤️</button>
        <button onClick={() => handleReaction("🔥")}>🔥</button>
        <button onClick={() => handleReaction("👏")}>👏</button>
      </div>
    </div>
  );
};

export default ImageCard;