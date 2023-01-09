import React from 'react'

function Alert(props) {
  return (
    <>
        <div className={`alert alert-${props.type}`}  role="alert">
        {props.type === 'success'?<i class="fa fa-check mx-2 mt-1" aria-hidden="true"></i> :<i class="fa fa-exclamation-triangle mx-2 mt-1" aria-hidden="true"></i>}
           <span>{props.msg}</span> 
        </div>
    </>
  )
}

export default Alert