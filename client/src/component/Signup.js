import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import UserContext from './Context/User/UserContext';

function Signup() {
  const [newUser,setNewUser] = useState({name:"",email:"",password:"",cpassword:""});
  const [cPasswordError,setCPasswordError] = useState('');
  const context = useContext(UserContext);
  const {createUser} = context;
  const navigate = useNavigate();

  const handleOnSubmit = async (e) =>{
    e.preventDefault();
    if(newUser.password === newUser.cpassword){
      let res = await createUser(newUser);
      console.log(res);
      if(res.success){
        navigate('/Login')
      } else{
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
    <form onSubmit={handleOnSubmit}>
      <div className="mb-3">
        <label htmlFor="exampleInputName" className="form-label">Name</label>
        <input type="text" className="form-control" id="exampleInputName" aria-describedby="nameHelp" name = "name" onChange={OnChangeInput} required minLength={3}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
        <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name = "email" onChange={OnChangeInput}/>
        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
        <input type="password" className="form-control" id="exampleInputPassword1" name = "password" onChange={OnChangeInput} required minLength={5}/>
      </div>
      <div className="mb-3">
        <label htmlFor="exampleInputPassword1" className="form-label">ConfirmPassword</label>
        <input type="password" className="form-control" id="exampleInputcPassword1"name = "cpassword" onChange={OnChangeInput} required minLength={5}/>
        <small style={{color: "red"}}>{cPasswordError}</small>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  )
}

export default Signup