import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getEventByName } from "../api/event";
import Comment from "../components/Comment";
import { getUserById } from "../api/user";
import { UserContext } from "../contexts/UserContext";
import { makeComment } from "../api/comment";

function Event() {
  const { name } = useParams();
  const [event, setEvent] = useState(null);
  const [comments, setComments] = useState([]);
  const [commenters, setCommenters] = useState([]);
  const { user } = useContext(UserContext);
  const [comment, setComment] = useState("");

  useEffect(() => {
    getEvent();
  }, [name]);

  const getEvent = async () => {
    const response = await getEventByName(name);
    if (response.data.success) {
      setEvent(response.data.event);
      setComments(response.data.event.comments);
    }
  };

  useEffect(() => {
    const fetchCommenters = async () => {
      const usersData = await Promise.all(
        comments.map(async (comment) => {
          const response = await getUserById(comment.userId);
          if (response.data.success) {
            return response.data.user;
          }
        })
      );
      setCommenters(usersData);
    };

    if (comments.length > 0) {
      fetchCommenters();
    }
  }, [comments]);

  const renderComment = (comment, index) => {
    const commenter = commenters[index];
    if (commenter == null) return null;
    return <Comment key={comment.id} comment={comment} commenter={commenter} />;
  };

  const handleSendComment = async (e) => {
    e.preventDefault();
    if (comment.trim() === "") return;
    const res = await makeComment(comment, event.id);
    if (res.data.success) {
      setComment("");
      setComments([res.data.comment, ...comments]);
    }
  };
  return (
    <div className="h-full w-full pt-16 overflow-y-auto">
      {event && (
        <div className="flex flex-row w-auto overflow-y-auto">
          <div className="w-[60%]">
            <img
              src={`data:image/png;base64,${event.image}`}
              alt={event.name}
              className="w-3/4 mx-auto"
            />
            {user?.id != null ||
              (comments?.length > 0 && (
                <h1 className="text-3xl font-bold text-slate-200 text-center">
                  Comments:
                </h1>
              ))}
            {user?.id && (
              <form
                className="flex items-center px-2 mx-auto w-[70%]"
                onSubmit={handleSendComment}
              >
                <input
                  type="text"
                  placeholder="Comment"
                  className="mb-2 focus:outline-none hover:bg-slate-100 w-[60%] mr-2"
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  required
                />
                <input
                  type="submit"
                  className="mb-2 px-4 py-1 border-slate-400 border-2 font-semibold hover:bg-slate-800 text-slate-200 w-[20%]"
                  value="Comment"
                />
              </form>
            )}
            <div className="mx-auto w-[70%]">
              {comments != null &&
                comments.length != 0 &&
                commenters.length != 0 &&
                comments.map((comment, index) => renderComment(comment, index))}
            </div>
          </div>
          <div className="w-[40%]">
            <h1 className="text-4xl font-bold text-slate-200">{event.name}</h1>
            <p className="text-xl text-gray-300">{event.description}</p>
            <p className="text-xl text-gray-300">
              Date: {new Date(event.date).toLocaleDateString()}
            </p>
            <p className="text-xl text-gray-300">Location: {event.location}</p>
            {event.time != null && (
              <p className="text-xl text-gray-300">
                Time: &nbsp;
                {new Date(`1970-01-01T${event.time}Z`).toLocaleTimeString()}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Event;
