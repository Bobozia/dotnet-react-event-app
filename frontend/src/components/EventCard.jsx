import { Link } from "react-router-dom";

function EventCard({ event }) {
  return (
    <div className="flex flex-row mx-3 border-slate-600 border-2 rounded-md mt-2 hover:border-slate-400">
      <div
        className=" w-[35%] aspect-square bg-cover bg-center hover:cursor-pointer hover:opacity-90"
        style={{ backgroundImage: `url(data:image/png;base64,${event.image}` }}
        onClick={() => {
          window.location.href = `/events/${event.name}`;
        }}
      ></div>

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
