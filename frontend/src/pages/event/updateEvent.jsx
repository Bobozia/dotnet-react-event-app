import { useEffect, useState } from "react";
import { getEventByName, updateEvent } from "../../api/event";
import { Link, useNavigate, useParams } from "react-router-dom";
import { IoMdArrowRoundBack } from "react-icons/io";
import { FaHome } from "react-icons/fa";

function UpdateEvent() {
  const { name } = useParams();
  const navigate = useNavigate();
  const [event, setEvent] = useState(null);
  const [newName, setNewName] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newDate, setNewDate] = useState("");
  const [newTime, setNewTime] = useState("");
  const [newImage, setNewImage] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getEvent();
  }, [name]);

  const getEvent = async () => {
    const response = await getEventByName(name);
    if (response.data.success) {
      setEvent(response.data.event);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (event) {
      setNewName(event.name);
      setNewDescription(event.description);
      setNewLocation(event.location);
      setNewDate(event.date);
      setNewTime(event.time.slice(0, 5));
    }
  }, [event]);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedEvent = {};
    if (newName != event.name) updatedEvent.name = newName;
    if (newDescription != event?.description)
      updatedEvent.description = newDescription;
    if (newLocation != event.location) updatedEvent.location = newLocation;
    if (newDate != event.date || newTime != event.time.slice(0, 5))
      updatedEvent.date = newDate;
    if (newTime != event.time.slice(0, 5))
      updatedEvent.time = newTime.concat(":00.0000000");
    if (newImage) updatedEvent.image = newImage;
    if (!Object.keys(updatedEvent).length) return alert("No changes made");
    const res = await updateEvent(event.id, updatedEvent);
    if (res.status === 200) navigate(`/events/${newName}`);
  };

  return (
    <div className="pt-14 h-full overflow-hidden">
      {isLoading && <p>Loading...</p>}
      {!isLoading && (
        <>
          <Link
            to={`/events/${event?.name}`}
            title="Back to event details page"
            className="inline-block text-slate-200 ml-1 hover:text-slate-400 cursor-pointer text-3xl"
          >
            <IoMdArrowRoundBack />
          </Link>
          <Link
            to={`/`}
            title="Back to home page"
            className="inline-block text-slate-200 ml-1 hover:text-slate-400 cursor-pointer text-3xl"
          >
            <FaHome />
          </Link>
          <form className="h-full" onSubmit={handleSubmit}>
            <fieldset className="h-full flex flex-col justify-center items-center">
              <div>
                <legend className="text-slate-300 text-xl font-bold">
                  Update Event
                </legend>
              </div>
              <label className="text-slate-200 block xl:w-[20%] w-[30%]">
                <span className="text-red-500">*</span>&nbsp;Name
                <input
                  type="text"
                  className="text-slate-900 outline-none w-full"
                  value={newName}
                  onInput={(e) => setNewName(e.target.value)}
                  required
                />
              </label>
              <label className="text-slate-200 block xl:w-[20%] w-[30%]">
                Description
                <textarea
                  className="text-slate-900 outline-none w-full"
                  value={newDescription}
                  onInput={(e) => setNewDescription(e.target.value)}
                />
              </label>
              <label className="text-slate-200 block xl:w-[20%] w-[30%]">
                <span className="text-red-500">*</span>&nbsp;Location
                <input
                  type="text"
                  className="text-slate-900 outline-none w-full"
                  value={newLocation}
                  onInput={(e) => setNewLocation(e.target.value)}
                  required
                />
              </label>
              <label className="text-slate-200 block xl:w-[20%] w-[30%]">
                <span className="text-red-500">*</span>&nbsp;Date
                <input
                  type="date"
                  className="text-slate-900 outline-none w-full"
                  value={newDate}
                  onInput={(e) => setNewDate(e.target.value)}
                  required
                />
              </label>
              <label className="text-slate-200 block xl:w-[20%] w-[30%]">
                Time
                <input
                  type="time"
                  className="text-slate-900 outline-none w-full"
                  value={newTime}
                  onInput={(e) => setNewTime(e.target.value)}
                />
              </label>
              <label className="text-slate-200 block xl:w-[20%] w-[30%]">
                Image
                <input
                  type="file"
                  accept="image/*"
                  className="w-full"
                  onChange={handleFileChange}
                />
              </label>
              <input
                type="submit"
                className="mb-2 px-4 py-1 mt-2 border-slate-400 border-2 font-semibold hover:bg-slate-800 text-slate-200 cursor-pointer"
                value="Update"
              />
            </fieldset>
          </form>
        </>
      )}
    </div>
  );
}

export default UpdateEvent;
