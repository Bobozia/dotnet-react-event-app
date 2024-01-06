import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import EventCard from "./EventCard";

function EventsGrid({ events }) {
  //add select to choose : upcoming, past, all
  //add search bar
  //add pagination
  const { user } = useContext(UserContext);

  return (
    <div className="grid grid-cols-2 mx-auto pb-4">
      {events.map((event) => (
        <EventCard
          key={event.id}
          event={event}
          isOwner={event.userId == user.id ? true : false}
        />
      ))}
    </div>
  );
}

export default EventsGrid;
