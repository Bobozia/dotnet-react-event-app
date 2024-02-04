import { useState } from "react";
import { createEvent } from "../../api/event";
import { useNavigate } from "react-router-dom";

function CreateEvent() {
  const [form, setForm] = useState({
    name: "",
    description: "",
    location: "",
    date: "",
    time: "",
    image: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setForm((prev) => ({ ...prev, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const tryCreateEvent = async (e) => {
    e.preventDefault();
    const { name, description, location, date, time, image } = form;
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

  const handleSubmit = (e) => {
    e.preventDefault();
    tryCreateEvent(e);
  };

  return (
    <div className="pt-14 h-full">
      <form className="h-full" onSubmit={handleSubmit}>
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
              name="name"
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            Description
            <textarea
              className="text-slate-900 outline-none w-full"
              name="description"
              onChange={handleChange}
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            <span className="text-red-500">*</span>&nbsp;Location
            <input
              type="text"
              className="text-slate-900 outline-none w-full"
              name="location"
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            <span className="text-red-500">*</span>&nbsp;Date
            <input
              type="date"
              className="text-slate-900 outline-none w-full"
              name="date"
              onChange={handleChange}
              required
            />
          </label>
          <label className="text-slate-200 block xl:w-[20%] w-[30%]">
            Time
            <input
              type="time"
              className="text-slate-900 outline-none w-full"
              name="time"
              onChange={handleChange}
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
