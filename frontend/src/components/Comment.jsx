function Comment({ comment, commenter }) {
  return (
    <div
      id={comment.id}
      className="flex border-2 border-slate-400 hover:border-slate-200 my-1 mx-2 text-slate-300"
    >
      <div className="flex items-center justify-center">
        {commenter.profilePicture != "" && (
          <img
            src={`data:image/png;base64,${commenter.profilePicture}`}
            alt="user"
            className="w-10 h-10 rounded-full"
          />
        )}
      </div>
      <div className="flex flex-col p-1 w-full">
        <div className="flex justify-between">
          <span className="font-bold">{commenter.userName}</span>
          <span>{new Date(comment.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex w-full">
          <span>{comment.content}</span>
        </div>
      </div>
    </div>
  );
}

export default Comment;
