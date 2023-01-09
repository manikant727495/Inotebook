import React, { useContext, useState } from 'react'
import UserContext from './Context/User/UserContext';
import { Link, useNavigate } from 'react-router-dom';
import Alert from './Alert';

function Login() {
  const [user,setUser] = useState({email:"", password:""});
  const context = useContext(UserContext);
  const [type,setType] = useState('');
  const [msg, setMsg] = useState('');
  const {validateUser} = context;
  const navigate = useNavigate();

  const handleOnChange = (e) =>{
      setUser({...user,[e.target.name] : e.target.value})

  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    const res = await validateUser(user);
    console.log(res);
    if(res.success){
      localStorage.setItem('auth-token',res.success);
      navigate('/');
    } else {
      console.log(res.error);
      setType('warning');
      setMsg(res.error);
    }
  }
  
  return (
    <>
    {/* <form className = 'my-3'onSubmit = {handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name = "email" onChange={handleOnChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleOnChange} id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
    </form> */}
  <section >
    <div className='text-center mr-3'>
        <h2 className="my-3 text-success">WELCOME TO INOTEBOOK</h2>
    </div>
    <div className="container-fluid h-custom my-5">
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid" alt="Sample"/>
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
          <form onSubmit = {handleOnSubmit}>
          <div className='text-center mr-2'>
            <h4 className="mt-1 ">LOGIN</h4>
            <p>pleale enter your details</p>
          </div>
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="form3Example3">Email address</label>
              {/* <input type="email" id="form3Example3" className="form-control form-control-md" placeholder="Enter a valid email address" name="email" onChange={handleOnChange} /> */}
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter a valid email address" name = "email" onChange={handleOnChange} aria-describedby="emailHelp" required/>
            </div>

            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="form3Example4">Password</label>
              <input type="password" id="form3Example4" className="form-control form-control-md" placeholder="Enter password" name="password" onChange={handleOnChange} required/>
            </div>

            <div className="text-center text-lg-start pt-3">
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">Login</button>
              </div>
            </div>

          <div className="text-center mt-4">
            <p>Not a member? <Link to="/signup">Register</Link></p>
          </div>
          </form>
          {msg !== ''?<Alert type = {type} msg = {msg} />:''}
        </div>
      </div>
    </div>
  </section>
    </>
  )
}

export default Login;