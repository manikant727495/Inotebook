import React, { useContext, useState } from 'react'
import UserContext from './Context/User/UserContext';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [user,setUser] = useState({email:"", password:""});
  const context = useContext(UserContext);
  const {validateUser} = context;
  const navigate = useNavigate();

  const handleOnChange = (e) =>{
      setUser({...user,[e.target.name] : e.target.value})
  }

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    const res = await validateUser(user);
    console.log(res);
    if(res.success){
      localStorage.setItem('auth-token',res.success);
      navigate('/');
    } else {
      console.log(res.error);
    }
  }
  
  return (
    <form className = 'my-3'onSubmit = {handleOnSubmit}>
        <div className="mb-3">
          <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
          <input type="email" className="form-control" id="exampleInputEmail1" name = "email" onChange={handleOnChange} aria-describedby="emailHelp"/>
        </div>
        <div className="mb-3">
          <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
          <input type="password" className="form-control" name="password" onChange={handleOnChange} id="exampleInputPassword1"/>
        </div>
        <button type="submit" className="btn btn-primary" >Submit</button>
    </form>
  )
}

export default Login;