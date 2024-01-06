import { useContext, useEffect, useState } from "react";
import { getAllEvents } from "../../api/event";
import EventsGrid from "../../components/EventsGrid";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (events.length === 0) {
      getEvents();
    }
  });

  const getEvents = async () => {
    const response = await getAllEvents();
    setEvents(response.data.events);
    setLoading(false);
  };

  const redirectToCreateEventPage = (e) => {
    e.preventDefault();
    navigate("/create-event");
  };

  return (
    <div className="h-full w-full pt-16 overflow-y-auto">
      {user?.userName && (
        <div className="flex justify-end">
          <button
            className="mb-2 px-4 py-1 border-slate-400 border-2 font-semibold hover:bg-slate-800 text-slate-200 w-[10%] mr-5"
            onClick={redirectToCreateEventPage}
          >
            Create new event
          </button>
        </div>
      )}
      {loading && <p>Loading...</p>}
      {!loading && events.length == 0 && <p>There are no events :P</p>}
      <EventsGrid events={events} setEvents={setEvents} />
    </div>
  );
}

export default Events;
