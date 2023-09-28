import '../../layout/reset.css';
import '../../layout/main_section.css';
import '../../layout/main_title.css';
import './wrapper_pessoafigure.css';
import './pessoa_card.css';
import menino from '../../../assets/img/meninoIcon.png';
import menina from '../../../assets/img/meninaIcon.png';
import idoso from '../../../assets/img/idosoIcon.png';
import idosa from '../../../assets/img/idosaIcon.png';
import homem from '../../../assets/img/homemIcon.png';
import mulher from '../../../assets/img/mulherIcon.png';

function Pessoas() {
    return (
        <section class="main_section">
            <h2 class="main_title -pessoas">PESSOAS</h2>
            <div class="wrapper_pessoafigure">

                <a>
                    <figure class="pessoa_card">
                        <img class="icon" src={menino} alt="Figura de um menino" data-person="MENINOICON 1"/>
                            <figcaption class="title">Menino</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="pessoa_card">
                        <img class="icon" src={menina} alt="Figura de uma menina" data-person="MENINAICON 1"/>
                            <figcaption class="title">Menina</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="pessoa_card">
                        <img class="icon" src={idoso} alt="Figura de um homen de idade avançada" data-person="IDOSOICON 1"/>
                            <figcaption class="title">Vovô</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="pessoa_card">
                        <img class="icon" src={idosa} alt="Figura de uma mulher de idade avançada" data-person="IDOSAICON 1"/>
                            <figcaption class="title">Vovó</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="pessoa_card">
                        <img class="icon" src={homem} alt="Figura de um homen" data-person="HOMEM ICON 1"/>
                            <figcaption class="title">Papai</figcaption>
                    </figure>
                </a>
                <a>
                    <figure class="pessoa_card">
                        <img class="icon" src={mulher} alt="Figura de uma mulher" data-person="mamãeicon 1"/>
                            <figcaption class="title">Mamãe</figcaption>
                    </figure>
                </a>
            </div>

        </section>
    )
}

export default Pessoas