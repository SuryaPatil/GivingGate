import { Fragment } from 'react';
import './App.css';
import {BrowserRouter as Router, 
  Routes,
  Navigate,
  Link,
  Route} from "react-router-dom";
  import Apply from "./components/Apply";
  import Corporations from "./components/Corporations";
  import Contact from "./components/Contact";


function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
        <Route path="/Apply" element={<Apply/>}/>
        <Route path="/Corporations" element={<Corporations/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
