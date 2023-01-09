import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import Home from "./component/Home";
import About from "./component/About";
import NoteState from "./component/Context/Notes/NoteState";
import Login from "./component/Login";
import Signup from "./component/Signup";
import UserState from "./component/Context/User/UserState";

function App() {
  return (
  <UserState>
    <NoteState>
        <Router>
            <Routes>
                <Route path = "/" element = {<Home/>} />
                <Route path= "/about" element = {<About/>}  />
                <Route path = "/login" element = {<Login/>} />
                <Route path= "/signup" element = {<Signup/>}  />
            </Routes>
        </Router>
      </NoteState>
    </UserState>
  );
}

export default App;
