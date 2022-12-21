import NoteContext from './Context/Notes/NoteContext'
import { useContext, useState } from 'react';
function AddNote() {
    const {addNote} = useContext(NoteContext);
    const [note, setNote] = useState({title:"", description:"", tag: "" });
    let [descError, setDescError] = useState('');
    let [titleError, setTitleError] = useState('');

    const handleOnSubmit = (event) => {
        addNote(note.title,note.description,note.tag);
        setNote({title:"", description:"", tag: "" });
        event.preventDefault();
    }

    const  handleOnChange = (e) => {
        setNote({...note, [e.target.name] : e.target.value});
        if(e.target.value.length <= 4 && e.target.name === "description"){
            setDescError("Description Should be of min 5 char long");
        }else{
            setDescError("");
        }
        if(e.target.value.length <= 2 && e.target.name === "title"){
            setTitleError("Title should be of min 3 char long");
        } else{
            setTitleError("");
        }
    }

    return (
        <>
            <h2>Add a Note</h2>
            <form className="my-3">
                <div className="mb-3">
                    <label htmlFor="titleInput" className="form-label">Title</label>
                    <input type="text" className="form-control" id="titleInput" name= "title" aria-describedby="emailHelp" onChange={handleOnChange} value={note.title} required={true} minLength={3} />
                    <small style={{color: "red"}}>{titleError}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputDescription" className="form-label">Description</label>
                    <input type="text" className="form-control"name = "description" id="exampleInputDescription"  onChange={handleOnChange} value={note.description} required={true} minLength={2}/>
                    <small style={{color: "red"}}>{descError}</small>
                </div>
                <div className="mb-3">
                    <label htmlFor="exampleInputTag" className="form-label">Tag</label>
                    <input type="text" className="form-control"name = "tag" id="exampleInputDescription" value={note.tag} onChange={handleOnChange} />
                </div>
                <button disabled = {note.description.length <=4 || note.title.length <= 2} className="btn btn-primary" onClick={handleOnSubmit}>Submit</button>
            </form>
        </>
    )
}

export default AddNote;