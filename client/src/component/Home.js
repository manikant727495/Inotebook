import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'
import Navbar from './Navbar'

export default function Home() {
  return (
    <>
      <Navbar/>
      <div className="container my-3">
        <AddNote/>
        <Notes/>
      </div>
    </>
  )
}
