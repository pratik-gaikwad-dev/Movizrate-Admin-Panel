import "./App.css";
import Login from "./views/Login";
import "./css/Login.css";
import UserState from "./states/UserState";
import Message from "./components/Message";
import MessageState from "./states/MessageState";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./views/Home";

function App() {
  return (
    <BrowserRouter>
      <MessageState>
        <UserState>
          <Message />
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route path="/" element={<Home />} />
          </Routes>
        </UserState>
      </MessageState>
    </BrowserRouter>
  );
}

export default App;
