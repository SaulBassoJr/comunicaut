import './main_header.css';
import './main_action.css';

function Navbar() {
    return (
        <header className="main_header">
            <nav id="menu" className="menu">
                <a className="main_action" href="/"> Home </a>
                <a className="main_action" href="/GaleriaCriação"> Galeria de Criação </a>
            </nav>
        </header>
    )
}

export default Navbar