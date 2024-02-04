import { useEffect, useState } from "react";
import { useAuthContext } from "../hooks/useAuthContext";
import { getEventsByUser, getEventsCount, getRandomEvent } from "../api/event";
import EventCard from "../components/EventCard";

function Home() {
  const { user } = useAuthContext();
  const [totalEvents, setTotalEvents] = useState(0);
  const [userEvents, setUserEvents] = useState([]);
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(9);
  const [numberOfPages, setNumberOfPages] = useState(1);
  const [randomEvent, setRandomEvent] = useState({});

  useEffect(() => {
    getEventsCount_();
    getRandomEvent_();
    if (user?.id) getEventsByUser_();
  }, [page, user?.id]);

  const getEventsCount_ = async () => {
    const { data } = await getEventsCount();
    setTotalEvents(data.count);
  };

  const getRandomEvent_ = async () => {
    const { data } = await getRandomEvent(user?.id || null);
    setRandomEvent(data.event);
  };

  const getEventsByUser_ = async () => {
    const { data } = await getEventsByUser(page, pageSize);
    setUserEvents(data.events);
    setNumberOfPages(data.numberOfPages);
  };

  const renderUserEvents = () => {
    return userEvents.map((event) => {
      return (
        <EventCard
          key={event.id}
          event={event}
          events={userEvents}
          setEvents={setUserEvents}
          isOwner={true}
        />
      );
    });
  };

  return (
    <div className="h-full w-full pt-16 text-slate-200 box-border overflow-auto">
      <div className="">
        <p className="ml-1 text-2xl font-semibold">
          {(user?.id && <>Welcome {user?.userName}</>) || (
            <>Welcome to the Event App</>
          )}
        </p>

        <p className="ml-1 text-xl font-semibold text-slate-400">
          There are <span className="italic text-slate-200">{totalEvents}</span>{" "}
          events that are published on our website
        </p>
        {randomEvent && (
          <>
            {" "}
            <p className="ml-1 text-xl font-semibold">
              Random upcoming event for you!
            </p>
            <div className="">
              <EventCard
                key={randomEvent.id}
                event={randomEvent}
                events={[]}
                setEvents={() => {}}
                isOwner={false}
              />
            </div>
          </>
        )}
        {userEvents.length != 0 && (
          <div className="">
            <p className="text-xl font-semibold text-center">Your Events</p>
            <div className="grid grid-cols-3 space-x-4 pl-2 justify-center items-center">
              {renderUserEvents()}
            </div>
            <div className="flex justify-center mt-2">
              {numberOfPages != 1 &&
                Array.from(Array(numberOfPages).keys()).map((pageNumber) => (
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
          </div>
        )}
      </div>
    </div>
  );
}

export default Home;
