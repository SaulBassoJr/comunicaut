import{BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import './App.css';

import Navbar from './components/layout/navbar/Navbar';
import Footer from './components/layout/footer/Footer';
import Home from './components/home/Home';
import Galeria from './components/galeria/Galeria';
import Pessoas from './components/cards/pessoas/Pessoas';

function App() {
  return (
    <Router>
      <Navbar/>
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route path='/GaleriaCriação' element={<Galeria/>}/>
        <Route path='/Pessoas' element={<Pessoas/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;