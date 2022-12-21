const express = require('express');
const fetchuser = require('../middleware/fetchuser');
const Notes = require('../models/Notes');
const router = express.Router()
const { body, validationResult } = require('express-validator');
const { findById, findByIdAndUpdate } = require('../models/User');


//Route 1: get all notes using ge
router.get('/getallnotes',
            fetchuser,
            async(req, res)=>{
                try{
                    const userId = req.user.id;
                    const notes = await Notes.find({user:userId});
                    res.json(notes);
                } catch(error){
                    console.log(error.message);
                    res.status(500).send('some error occured');
                }
            }
)

//Route 2: create  a note using post creatnote
router.post('/createnote',
            fetchuser,
            [
                body('title','title must be at least three character long').isLength({ min: 3 }),
                body('description','description must be at least 5 character long').isLength({ min: 5 }),
                body('tag','tag must be at least 3 character long').isLength({ min: 3 }),
            ],
            async(req,res) =>{
                // if there are errors the return bad request and errors 
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return res.status(400).json({ errors: errors.array() });
                }

                try{
                    const userId = req.user.id;
                    const notes = await Notes.create ({
                        title : req.body.title,
                        description : req.body.description,
                        tag : req.body.tag,
                        user: userId
                    });
                    res.json(notes);
                } catch(error){
                    console.log(error.message);
                    res.status(500).send('some error occured');  
                }

            }
)

// Route 4: Update a note using /api/notes/updatenote/:id
router.put('/updatenote/:id',
            fetchuser,
            async (req,res)=>{
                const {title, description, tag} = req.body;
                const newnote = {};
                if(title) newnote.title = title;
                if(description) newnote.description = description;
                if(tag) newnote.tag = tag;
                const id = req.params.id;
                let note = await Notes.findById(id);
                if(!note){
                    res.status(401).json({error: "notes not found"});
                }
                if(note.user.toString() != req.user.id){
                    return res.status(401).send("Not Allowed");
                }
                note = await Notes.findByIdAndUpdate(id,{$set:newnote}, {new:true});
                res.json(note);
            }
        )

// Route 5: Delete a note using /api/notes/deletenote/:id
router.delete('/deletenote/:id',
            fetchuser,
            async (req,res)=>{
                const id = req.params.id;
                let note = await Notes.findById(id);
                if(!note){
                    res.status(401).json({error: "notes not found"});
                }
                if(note.user.toString() != req.user.id){
                    return res.status(401).send("Not Allowed");
                }
                note = await Notes.findByIdAndDelete(id);
                res.json({"success":"note has been delete", note:note});
            }
        )

module.exports = router;