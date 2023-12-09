import EventCard from "./EventCard";

function EventsGrid({ events }) {
  //add select to choose : upcoming, past, all
  //add search bar
  //add pagination
  return (
    <div className="grid grid-cols-2 mx-auto pb-4">
      {events.map((event) => (
        <EventCard key={event.id} event={event} />
      ))}
    </div>
  );
}

export default EventsGrid;
