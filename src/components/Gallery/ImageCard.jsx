import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import ImageModal from "./ImageModal";
import { useImageInteractions } from "../../hooks/useImageInteraction";

const ImageCard = ({ image }) => {
  const { reactionCounts, toggleLike } = useImageInteractions(image.id);
  const { setActiveImage } = useUserStore();
  const [open, setOpen] = useState(false);

  if (!image?.urls?.small) return null;

  return (
    <div className="relative group cursor-pointer">
      <img
        src={image.urls.small}
        alt={image.alt_description || "image"}
        className="w-full h-48 object-cover rounded"
        onClick={() => {
          setActiveImage(image.id);
          setOpen(true);
        }}
      />

      {open && (
        <ImageModal
          image={image}
          onClose={() => setOpen(false)}
        />
      )}
      <div className="absolute bottom-2 left-2 hidden group-hover:flex gap-2 bg-white/80 px-2 py-1 rounded">
        <button onClick={(e) => { e.stopPropagation(); toggleLike("heart"); }}>❤️</button>
        <button onClick={(e) => { e.stopPropagation(); toggleLike("fire"); }}>🔥</button>
        <button onClick={(e) => { e.stopPropagation(); toggleLike("clap"); }}>👏</button>
      </div>
      <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex gap-2">
        <span>❤️ {reactionCounts?.heart ?? 0}</span>
        <span>🔥 {reactionCounts?.fire ?? 0}</span>
        <span>👏 {reactionCounts?.clap ?? 0}</span>
      </div>
    </div>
  );
};

export default ImageCard;
