import './App.css';
import {BrowserRouter as Router, 
  Routes,

  Route} from "react-router-dom";
  import Apply from "./components/Apply";
  import Corporations from "./components/Corporations";
  import Contact from "./components/Contact";
  import ListApplicants from './components/ListApplicants';
  import ListCorporations from './components/ListCorporations';

function App() {
  return (
    <div className="container">
      <Router>
        <Routes>
        <Route path="/Apply" element={<Apply/>}/>
        <Route path="/Corporations" element={<Corporations/>}/>
        <Route path="/Contact" element={<Contact/>}/>
        <Route path="/ListApplicants" element={<ListApplicants/>}/>
        <Route path="/ListCorporations" element={<ListCorporations/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App;
