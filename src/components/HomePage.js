
import React, { useState, useEffect } from 'react';
import Task from './Task';
import TaskForm from './TaskForm';
import axios from 'axios';

const HomePage = () => {
  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

    //api calling for addTask
     const addTask = async (task) => {
    try {
      const response = await axios.post('http://localhost:3001/tasks', task);
      return response.data;
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };
  
  //function to add task
  const handleAddTask = async (title, description) => {
    const newTask = {
      title,
      description,
      completed:false,
      lastUpdated: new Date().toISOString(),
    };
    const addedTask = await addTask(newTask);
    setTasks([...tasks, addedTask]);
  };


//api calling to get all tasks
const fetchTasks = async () => {
    try {
      const response = await axios.get("http://localhost:3001/tasks");
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

    //update task
  const updateTask = async (id, updatedTask) => {
    try {
      await axios.patch(`http://localhost:3001/tasks/${id}`, updatedTask);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  //delete existing task
  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:3001/tasks/${id}`);
      fetchTasks(); // Refresh the task list
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

    //filter existing task
  const filteredTasks = tasks.filter((task) =>
    task?.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="mx-auto  p-4">
      <h1 className="text-3xl text-blue-500 underline underline-offset-4 decoration-blue-500 font-Medium mb-4 justify-center items-center flex ">Todo List</h1>
      <input
        type="text"
        placeholder="Search task by Titles ..."
        className="border p-2 mb-4 w-full"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
     {/* component to add task */}
      <TaskForm addTask={handleAddTask} /> 

      <div className="space-y-2">
        {filteredTasks.map(task => (
          // component to show all existing tasks
          <Task key={task.id} task={task} updateTask={ updateTask}  deleteTask={deleteTask} />
        ))}
      </div>
    </div>
  );
};



export default HomePage;
