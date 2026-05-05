import React from 'react'
import { useState, useEffect } from 'react'
import { createNote, getNotes } from '../../lib/services'

const Home = () => {
  const [isDisabledBtn, setIsDisabledBtn] = useState(false)
  const [notes, setNotes] = useState([])
  const [note, setNote] = useState({
    title: "",
    content: "",
  })

  const getData = async () => {
    const res = await getNotes();
    if (res.success) {
      setNotes(res.notes);
    }
  }

  useEffect(() => {
   getData()
  }, [])
  

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
        getData() // Refresh the notes list after creating a new note
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
    </div>
    <div className="notes py-8">
      <h3 className='text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2'>
        <span><img src="/icons/notes.svg" alt="notes" /></span> <span>My Notes</span>
      </h3>

    {notes.length > 0 ? (
      <div className="noteslists w-full flex items-center gap-4 overflow-x-auto">
      
      {notes.map((note) => {
        return (
          <div key={note._id} className="note-item p-4 shrink-0 w-72 bg-green-100 rounded-md shadow-md mb-4">
            <h4 className='text-xl font-bold text-green-800'>{note.title}</h4>
            <p className='text-gray-600 h-32 overflow-y-auto'>{note.content}</p>
          </div>
        )
      })}
        
      </div>
    ):(
      <p className='text-center text-gray-600'>No notes available. Please add a note to see it here.</p>
    )}
      
    </div>

    </div>
  )
}

export default Home