import { Link, useNavigate } from "react-router-dom";
import { FiEdit } from "react-icons/fi";
import { MdDelete } from "react-icons/md";
import { deleteEvent } from "../api/event";

function EventCard({ event, isOwner, events, setEvents }) {
  const navigate = useNavigate();

  const handleDeleteEvent = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (window.confirm("Are you sure you want to delete this event?")) {
      const res = await deleteEvent(event.id);
      if (res.status === 200)
        setEvents(events.filter((e) => e.id !== event.id));
    }
  };

  return (
    <div className="flex flex-row mx-3 border-slate-600 border-2 rounded-md mt-2 hover:border-slate-400">
      <div
        className=" w-[35%] aspect-square bg-cover bg-center hover:cursor-pointer hover:opacity-90"
        style={{ backgroundImage: `url(data:image/png;base64,${event.image}` }}
        onClick={() => {
          navigate(`/events/${event.name}`);
        }}
      >
        {isOwner && (
          <>
            <div className="flex justify-end h-1/6">
              <Link
                onClick={(e) => e.stopPropagation()}
                to={`/events/${event.name}/update`}
                className="bg-gray-500 h-min p-1 border-2 border-gray-600 hover:bg-gray-600 hover:border-gray-800"
              >
                <FiEdit color="white" size="20px" />
              </Link>
            </div>
            <div className="flex h-5/6 justify-end items-end">
              <span
                onClick={handleDeleteEvent}
                className="bg-gray-500 h-min p-1 border-2 border-gray-600 hover:bg-gray-600 hover:border-gray-800"
              >
                <MdDelete color="red" size="20px" />
              </span>
            </div>
          </>
        )}
      </div>

      <div className="pl-2">
        <Link
          to={`/events/${event.name}`}
          className="font-bold text-xl hover:cursor-pointer text-slate-200 hover:text-slate-300"
        >
          {event.name}
        </Link>
        <p className="text-base">Date: {event.date}</p>
        <p className="text-xl text-gray-500">
          <small>{event.description}</small>
        </p>
      </div>
    </div>
  );
}

export default EventCard;
