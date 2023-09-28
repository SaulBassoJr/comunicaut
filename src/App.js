import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/Navbar';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element=''/>
      </Routes>
    </Router>
  );
}

export default App;
