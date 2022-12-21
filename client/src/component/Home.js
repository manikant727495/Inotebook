import React from 'react'
import Notes from './Notes'
import AddNote from './AddNote'

export default function Home() {
  return (
    <>
      <AddNote/>
      <div className="container my-3">
        <Notes/>
      </div>
    </>
  )
}
