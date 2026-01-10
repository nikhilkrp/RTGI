import { useState } from "react";
import { useUserStore } from "../../store/useUserStore";
import { useImageInteractions } from "../../hooks/useImageInteraction";
import EmojiBar from "../Interactions/EmojiBar";

const ImageModal = ({ image, onClose }) => {
  const { userId } = useUserStore();

  const {
    reactions,
    comments,
    toggleReaction,
    addComment,
    isLoading,
    error,
  } = useImageInteractions(image.id);

  const [commentText, setCommentText] = useState("");

  const handleAddComment = () => {
    if (!commentText.trim()) return;
    addComment(commentText);
    setCommentText("");
  };

  if (isLoading) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center text-white z-50">
        Loading interactions...
      </div>
    );
  }

  if (error) {
    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center text-red-400 z-50">
        Failed to load interactions
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
      <div className="bg-black w-4/5 h-4/5 rounded-lg relative overflow-hidden">

        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-50 text-white text-xl"
        >
          ✕
        </button>

        <div className="relative w-full h-full flex items-center justify-center">

  
          <img
            src={image.urls.regular}
            alt={image.alt_description || "Gallery Image"}
            className="max-h-full max-w-full object-contain"
          />

          <div className="absolute top-3 left-3 bg-black/70 px-3 py-2 rounded">
            <EmojiBar
              reactions={reactions}
              onReact={toggleReaction}
            />
          </div>

  
          <div className="absolute bottom-20 left-3 right-3 max-h-48 overflow-y-auto space-y-2">
            {comments.length === 0 ? (
              <p className="text-xs text-gray-300">
                No comments yet. Be the first!
              </p>
            ) : (
              comments.map((comment) => (
                <div
                  key={comment.id}
                  className="bg-black/70 text-white text-xs px-2 py-1 rounded"
                >
                  <span className="font-semibold">
                    {comment.userId === userId
                      ? "You"
                      : comment.userId.slice(0, 6)}
                    :
                  </span>{" "}
                  {comment.text}
                </div>
              ))
            )}
          </div>

          <div className="absolute bottom-0 left-0 right-0 bg-black/80 p-3 flex gap-2">
            <input
              type="text"
              value={commentText}
              onChange={(e) => setCommentText(e.target.value)}
              placeholder="Comment on this image..."
              className="flex-1 px-3 py-1 text-sm rounded outline-none"
            />
            <button
              onClick={handleAddComment}
              className="bg-white text-black px-4 py-1 text-sm rounded"
            >
              Post
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageModal;


