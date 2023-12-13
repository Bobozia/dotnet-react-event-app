import { useEffect, useState } from "react";
import { getAllEvents } from "../api/event";
import EventsGrid from "../components/EventsGrid";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

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

  return (
    <div className="h-full w-full pt-16 overflow-y-scroll">
      {loading && <p>Loading...</p>}
      {!loading && events.length == 0 && <p>There are no events :P</p>}
      <EventsGrid events={events} />
    </div>
  );
}

export default Events;
