

const CommentBox = ({ value, onChange, onSubmit }) => {
  return (
    <div className="flex gap-2 border-t pt-3">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Write a comment (visible to everyone)..."
        className="flex-1 border rounded px-3 py-1 text-sm focus:outline-none"
      />
      <button
        onClick={onSubmit}
        className="px-3 py-1 bg-black text-white rounded text-sm"
      >
        Post comment
      </button>
    </div>
  );
};

export default CommentBox;

