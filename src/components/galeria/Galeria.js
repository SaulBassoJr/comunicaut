import '../layout/reset.css';
import '../layout/main_section.css';
import '../layout/main_title.css';
import './galeria_card.css';
import './wrapper_galeria.css';
import './modal_form.css';

function Galeria() {
    return (
        <section class="main_section">
            <div class="wrapper_galeria">
                <div class="div-galeria">
                    <h2 class="main_title">GALERIA</h2>
                    <div class="div-cards-galeria">
                        <ul id="ulElement">
                            <li>
                                <button id="addCardBtn">Adicionar Cartão</button>
                            </li>
                        </ul>
                    </div>


                </div>

                <div class="div-prancha ">
                    <h2 class="main_title">PRANCHA</h2>

                </div>

            </div>

        </section>

    )
}

export default Galeria