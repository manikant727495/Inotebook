import React, { useContext, useState } from 'react'
import { useNavigate, Link} from 'react-router-dom';
import Alert from './Alert';
import UserContext from './Context/User/UserContext';

function Signup() {
  const [newUser,setNewUser] = useState({name:"",email:"",password:"",cpassword:""});
  const [cPasswordError,setCPasswordError] = useState(false);
  const [type,setType] = useState('');
  const [msg, setMsg] = useState('');
  const context = useContext(UserContext);
  const {createUser} = context;
  const navigate = useNavigate();

  const handleOnSubmit = async (e) =>{
    e.preventDefault();
    if(newUser.password === newUser.cpassword){
      let res = await createUser(newUser);
      console.log(res);
      if(res.success){
        setType('success');
        setMsg('Registered Successfully')
        setTimeout(()=>{
          navigate('/Login')
        },1000)
      } else{
        setType('warning');
        setMsg(res.error);
        console.log(res.error);
      }
    } else{
      setCPasswordError("Password and confirm password should be same");
    }
  }

  const OnChangeInput = (e) =>{
    if(e.target.name === 'cpassword'){
      if(e.target.value !== newUser.password){
        setCPasswordError("Password and confirm password should be same");
      } else{
        setCPasswordError("");
      }
    }
    setNewUser({...newUser,[e.target.name] : e.target.value})
  }

  return (
  <section>
    <div className="container-fluid h-custom ">
      <div className='text-center mr-3'>
        <h2 className="my-3 text-success">WELCOME TO INOTEBOOK</h2>
      </div>
      <div className="row d-flex justify-content-center align-items-center h-100">
        <div className="col-md-9 col-lg-6 col-xl-5">
          <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="img-fluid" alt="Sample"/>
        </div>
        <div className="col-md-8 col-lg-6 col-xl-4 offset-xl-1 ">
          <form onSubmit = {handleOnSubmit}>
          <div className='text-center'>
            <h4 className="mt-3 ">Sign Up</h4>
            <p>pleale enter your details</p>
          </div>
            <div className="mb-2">
              <label htmlFor="exampleInputName" className="form-label">Name</label>
              <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" placeholder="Enter your Name" name = "name" onChange={OnChangeInput} required minLength={3}/>
            </div>
            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="form3Example3">Email address</label>
              <input type="email" className="form-control" id="exampleInputEmail1" placeholder="Enter a valid email address" name = "email" onChange={OnChangeInput} aria-describedby="emailHelp" required />
            </div>

            <div className="form-outline mb-2">
              <label className="form-label" htmlFor="form3Example4">Password</label>
              <input type="password" id="form3Example4" className="form-control form-control-md" placeholder="Enter password" name="password" onChange={OnChangeInput} required minLength={5} />
            </div>
            <div className="mb-2">
              <label htmlFor="exampleInputPassword1" className="form-label">ConfirmPassword</label>
              <input type="password" className="form-control" id="exampleInputcPassword1"name = "cpassword" placeholder="Confirm password" onChange={OnChangeInput} required minLength={5} />
              <small style={{color: "red"}}>{cPasswordError}</small>
            </div>

            <div className="text-center text-lg-start pt-3">
              <div className="d-grid">
                <button className="btn btn-primary" type="submit">Register</button>
              </div>
            </div>

          <div className="text-center mt-4">
            <p>Already a member? <Link to="/login">Login</Link></p>
          </div>
          </form>
          {msg !== ''?<Alert type = {type} msg = {msg}/>:''}
          </div>
      </div>
    </div>
  </section>
  )
}

export default Signup