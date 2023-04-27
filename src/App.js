
import './App.css';
import {BrowserRouter as Router,Routes,Route} from 'react-router-dom'
import Home from './Components/Home';
import Auth from './Components/Auth';
import Create from './Components/Create';
import Save from './Components/Save';
import Navbar from './Components/Navbar';
import Modals from './Components/Modals'
function App() {
  return (
    <div className="App">
      <Router>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/auth" element={<Auth/>}/>
          <Route path="/create-recipe" element={<Create/>}/>
          <Route path="/saved-recipes" element={<Save/>}/>
          <Route path="/show-modals" element={<Modals/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
