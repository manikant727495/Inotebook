import React, { useEffect, useState, useRef } from 'react'
import NoteContext from './Context/Notes/NoteContext'
import { useContext } from 'react'
import Noteitem from './Noteitem';
function Notes() {
  const ref = useRef(null);
  const refclose = useRef(null);
  const context = useContext(NoteContext);
  const { getAllNotes, notes , updateNote} = context;
  const [note, setNote] = useState({ etitle: "", edescription: "", etag: "" });
  useEffect(() => {
    getAllNotes();
    // eslint-disable-next-line
  }, [])

  const editNote = (note) => {
    ref.current.click();
    setNote({ etitle: note.title, edescription: note.description, etag: note.tag, id: note._id})
  }

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  }

  const handleClick = (e) =>{
    updateNote(note);
    refclose.current.click();
  }


  return (
    <>
      <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
        Launch demo modal
      </button>
      <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">Title</label>
                  <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={onChange} required={true} minLength={3} />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">Description</label>
                  <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={onChange} required={true} minLength={5}/>
                </div>
                <div className="mb-3">
                  <label htmlFor="tag" className="form-label">Tag</label>
                  <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button ref = {refclose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button onClick={handleClick} disabled={note.etitle.length<3 || note.edescription.length<5} type="button" className="btn btn-primary">Update Note</button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h2>Your Notes</h2>
        {notes.map((note) => {
          return <Noteitem key= {note._id} note={note} editNote={editNote} />
        })}
      </div>
    </>
  )
}

export default Notes;