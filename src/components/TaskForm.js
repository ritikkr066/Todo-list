import axios from "axios";
import { useState } from "react";

const TaskForm = ({addTask}) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

      const handleSubmit = (e) => {
        e.preventDefault();
        if (title && description) {
          addTask(title, description);
          setTitle('');
          setDescription('');
        }
      };

    return (
      <form onSubmit={handleSubmit} className="flex flex-col mb-4 space-y-2 sm:flex-row sm:space-y-0 ">
        <input
          type="text"
          placeholder="Title"
          className="p-2 border sm:md-0 sm:mr-2"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          className="border p-2 sm:mr-2 sm:w-[40vw]"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type="submit" className="p-2 px-2 text-white bg-orange-500 rounded-md">Add Task</button>
      </form>
    );
  };
  export default TaskForm;