import React from 'react'
import { useState } from 'react'
import { createNote } from '../../lib/services'

const Home = () => {
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)
  const [note, setNote] = useState({
    title: "",
    content: "",
  })

    const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNote((note) => ({
      ...note,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!note.title || !note.content) {
      alert("Please fill all the fields");
      return;
    }

    try {
      const res = await createNote(note);
      if (res.success) {
        alert(res.message);
      }
      // Clear the form after successful submission
      setNote({
        title: "",
        content: "",
      });
    } catch (error) {
      console.error("Error creating note:", error);
    }
  };

  return (
    <div className='w-[98%] lg:w-[70vw] mx-auto px-6 py-4 bg-green-200 rounded-lg shadow-md'>
      <h1 className='text-3xl text-center font-bold text-green-800 py-4'>Smart Notes</h1>
      <p className='text-lg text-green-700 text-center py-2'>Welcome to Smart Notes! Your simple and efficient note-taking app.</p>
    
    <div className="notesform">
      <h2 className='text-2xl font-semibold text-green-800 mb-4'>Create a New Note</h2>
      <form onSubmit={handleSubmit} className='flex flex-col justify-center items-center gap-4'>
        <input type="text" value={note.title} placeholder="Note Title" onChange={(e) => { handleInputChange(e); }} name='title' className='p-2 text-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full' />
        <textarea value={note.content} placeholder="Note Content" onChange={(e) => { handleInputChange(e); }} name='content' className='p-2 text-green-700 rounded-md focus:outline-none focus:ring-2 focus:ring-green-400 w-full' rows="5"></textarea>
        <button type="submit" disabled={isDisabledBtn} className={`${isDisabledBtn ? 'bg-gray-400 cursor-not-allowed' : 'bg-green-500 hover:bg-green-600'} text-white py-2 px-4 rounded-md transition-colors duration-300 w-[50%] cursor-pointer`}>Add Note</button>
      </form>

      <div className="notes py-8">
        I will display the list of notes here. Each note will have options to edit or delete it. This is just a placeholder for now, but in the future, it will be dynamically generated based on the notes created by the user.
      </div>
    </div>

    </div>
  )
}

export default Home
