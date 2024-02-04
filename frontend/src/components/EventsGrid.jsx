import { useAuthContext } from "../hooks/useAuthContext";
import EventCard from "./EventCard";

function EventsGrid({ events, setEvents }) {
  //add select to choose : upcoming, past, all
  //add search bar
  //add pagination
  const { user } = useAuthContext();

  return (
    <div className="grid grid-cols-2 mx-auto pb-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          events={events}
          setEvents={setEvents}
          isOwner={event.userId == user?.id ? true : false}
        />
      ))}
    </div>
  );
}

export default EventsGrid;
