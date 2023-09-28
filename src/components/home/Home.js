import '../layout/reset.css';
import '../layout/main_section.css';
import '../layout/main_title.css';
import './figure_card.css';
import './wrapper_theme.css';
import pessoa from '../../assets/img/teste.png';
import alimento from '../../assets/img/Alimento.png';
import objeto from '../../assets/img/objetos.png';
import action from '../../assets/img/ações.png';
import emotion from '../../assets/img/emoções.png';
import lugar from '../../assets/img/lugares.png';


function Home() {
    return (
        <section class="main_section">
            <div class="wrapper_theme">
                <a href="/Pessoas">
                    <figure class="figure_card">
                        <img class="icon" src={pessoa} alt="Figura de duas pessoas"/>
                            <figcaption>PESSOAS</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="figure_card">
                        <img class="icon" src={alimento} alt="Figura de uma cesta de alimentos"/>
                            <figcaption>ALIMENTOS</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="figure_card">
                        <img class="icon" src={objeto} alt="Figura de uma caixa com objetos"/>
                            <figcaption>OBJETOS</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="figure_card">
                        <img class="icon" src={action} alt="Figura de uma mão pegando uma caixa"/>
                            <figcaption>AÇÕES</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="figure_card">
                        <img class="icon" src={emotion} alt="Figura de emojis"/>
                            <figcaption>EMOÇÕES</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="figure_card">
                        <img class="icon" src={lugar} alt="Figura de uma praça"/>
                            <figcaption>LUGARES</figcaption>
                    </figure>
                </a>

            </div>

        </section>

    );
}

export default Home