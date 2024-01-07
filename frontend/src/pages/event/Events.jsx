import { useContext, useEffect, useState } from "react";
import { getEventsByFilter } from "../../api/event";
import EventsGrid from "../../components/EventsGrid";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";

function Events() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(UserContext);
  const [filter, setFilter] = useState("all");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    getEvents(filter);
  }, [filter, page]);

  const getEvents = async (filter) => {
    const response = await getEventsByFilter(filter, page, pageSize);
    setEvents(response.data.events);
    setNumberOfPages(response.data.numberOfPages);
    console.log(response);
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
          <select
            onChange={(e) => setFilter(e.target.value)}
            className="mb-2 px-4 py-1 border-slate-400 border-2 font-semibold bg-slate-700 hover:bg-slate-800 text-slate-200 w-[10%] mr-5"
          >
            <option value="all">All</option>
            <option value="upcoming">Upcoming</option>
            <option value="past">Past</option>
          </select>

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
      {!loading && (
        <div className="flex justify-center">
          {Array.from(Array(numberOfPages).keys()).map((pageNumber) => (
            <button
              key={pageNumber}
              className={`py-1 px-3 border-slate-400 border-2 font-semibold hover:bg-slate-800 text-slate-200 mr-2 ${
                pageNumber + 1 === page ? "bg-slate-800" : ""
              }`}
              onClick={() => {
                setPage(pageNumber + 1);
              }}
            >
              {pageNumber + 1}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Events;
