import './main_header.css';
import './main_action.css';

function Navbar() {
    return (
        <header class="main_header">
            <nav id="menu" class="menu">
                <a class="main_action" href="/"> Home </a>
                <a class="main_action" href="galeria.html"> Galeria de Criação </a>
            </nav>
        </header>
    )
}

export default Navbar