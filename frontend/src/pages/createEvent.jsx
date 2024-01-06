import { useState } from "react";
import { createEvent } from "../api/event";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState("");
  const navigate = useNavigate();

  const tryCreateEvent = async (e) => {
    e.preventDefault();
    if (!name || !location || !date) {
      alert("Name, location and date are required");
      return;
    }
    const event = { name, location, date };

    if (description) event.description = description;
    if (time) event.time = time.concat(":00.0000000");
    if (image) event.image = image;
    const res = await createEvent(event);

    if (res.status === 200) navigate("/events");
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="pt-14 h-full">
      <form className="h-full" onSubmit={tryCreateEvent}>
        <fieldset className="h-full flex flex-col justify-center items-center">
          <div>
            <legend className="text-slate-300 text-xl font-bold">
              Create Event
            </legend>
          </div>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            <span className="text-red-500">*</span>&nbsp;Name
            <input
              type="text"
              className="text-slate-900 outline-none w-full"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            Description
            <textarea
              className="text-slate-900 outline-none w-full"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            <span className="text-red-500">*</span>&nbsp;Location
            <input
              type="text"
              className="text-slate-900 outline-none w-full"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              required
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            <span className="text-red-500">*</span>&nbsp;Date
            <input
              type="date"
              className="text-slate-900 outline-none w-full"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            Time
            <input
              type="time"
              className="text-slate-900 outline-none w-full"
              value={time}
              onChange={(e) => setTime(e.target.value)}
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
            value="Create"
          />
        </fieldset>
      </form>
    </div>
  );
}

export default CreateEvent;
