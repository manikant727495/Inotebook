import NoteContext from "./NoteContext";
import { useState } from "react";

const NoteState = (props) => {
    const url = 'http://localhost:5000/api/notes';
    const initailNotes = [];
    const [notes,setNotes] = useState(initailNotes);

    // Fetch All notes
    const  getAllNotes = async () => {
      const response = await fetch(`${url}/getallnotes`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const json = await response.json()
      setNotes(json)
    }

    // Add Note
    const addNote = async (title,description,tag)=>{
      const data = {
        "title":title,
        "description": description,
        "tag": tag
      }
      const response = await fetch(`${url}/createnote`,{
        method : 'POST',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      console.log(res);
      setNotes(notes.concat(res))
    }

    // Update Note
    const updateNote = async(note)=>{
      const data = {
        "title":note.etitle,
        "description": note.edescription,
        "tag": note.etag
      }
      const response = await fetch(`${url}/updatenote/${note.id}`,{
        method : 'put',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        },
        body: JSON.stringify(data)
      });
      const res = await response.json();
      const newNote = notes.filter((note)=>{
        return note._id !== res._id;
      })
      setNotes(newNote.concat(res))
    }

    // Delete Note
    const deleteNote = async (id)=>{
      const response = await fetch(`${url}/deletenote/${id}`,{
        method : 'DELETE',
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem('auth-token')
        }
      });
      const res = await response.json();
      console.log(res);
      const newNote = notes.filter((note)=>{
        return note._id !== id;
      })
      setNotes(newNote);
    }

    return(
      <NoteContext.Provider value = {{notes,addNote,updateNote,deleteNote,getAllNotes}}>
        {props.children}
      </NoteContext.Provider>
    )
}

export default NoteState;