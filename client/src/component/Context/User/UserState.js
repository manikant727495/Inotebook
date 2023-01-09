import { useState } from "react";
import UserContext from "./UserContext";

const UserState = (props) =>{
    const url = 'http://localhost:5000/api/auth';
    const [user,setUser] = useState({name:" "});
    // Validated user
    const validateUser = async (user) =>{
        const data = {
            "email": user.email,
            "password": user.password
        }
        const response = await fetch(`${url}/login`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json()
        return res;
    }

    const createUser = async (user) =>{
        const data = {
            "name":user.name,
            "email": user.email,
            "password": user.password
        }
        const response = await fetch(`${url}/createUser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        const res = await response.json();
        return res;
    }

    const getUser = async () =>{
        const response = await fetch(`${url}/getuser`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "auth-token": localStorage.getItem('auth-token')
            }
        })
        const res = await response.json();
        res.name = res.name.toUpperCase();
        setUser(res);
    }
    

    return(
        <UserContext.Provider value = {{validateUser,createUser,getUser,user}}>
            {props.children}
        </UserContext.Provider>
    )
}

export default UserState;

