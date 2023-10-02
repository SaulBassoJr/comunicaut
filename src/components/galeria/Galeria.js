import '../layout/reset.css';
import '../layout/main_section.css';
import '../layout/main_title.css';
import './galeria_card.css';
import './wrapper_galeria.css';
import './prancha_card.css';


import Modal from '../layout/modal/modalForm';
import ConfirmationModal from '../layout/modal/modalIncer';
import { useState } from 'react';

function Galeria() {
    const [cards, setCards] = useState([]);
    const [prancha, setPrancha] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalConf, setOpenModalConf] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);

    const addCard = (card) => {
        setCards([...cards, card]);
    };

    // const moveToPrancha = (index) => {
    //     const cardToMove = cards[index];
    //     setPrancha([...prancha, cardToMove]);
    //     setCards(cards.filter((_, i) => i !== index));
    // };
    const openConfirmationModal = (index) => {
        setSelectedCard(cards[index]);
        setOpenModalConf(true);
    };

    const confirmMoveToPrancha = () => {
        const MAX_PRANCHA_SIZE = 15;
        if (prancha.length < MAX_PRANCHA_SIZE) {
            if (selectedCard) {
                setPrancha([...prancha, selectedCard]);
                setCards(cards.filter((_, i) => i !== cards.indexOf(selectedCard)));
                setSelectedCard(null);
                setOpenModalConf(false);
            }
        } else {
            alert('A prancha está cheia. Não é possível adicionar mais figuras.');
        }
    };


    const removeFromPrancha = (index) => {
        const cardToRemove = prancha[index];
        setCards([...cards, cardToRemove]);
        setPrancha(prancha.filter((_, i) => i !== index));
    };



    return (
        <section className="main_section">
            <div className="wrapper_galeria">
                <div className="div-galeria">
                    <h2 className="main_title">GALERIA</h2>
                    <div className="div-cardg">
                        <ul className='wrapper_card'>
                            {cards.map((card, index) => (
                                <li key={index}>
                                    <div
                                        onClick={() => openConfirmationModal(index)}
                                        id="moveToPranchaBtn"
                                        className='galeria_card'
                                        style={{ backgroundColor: card.backgroundColor }}
                                    >
                                        <img className='img' src={card.imgSrc} alt="Pré-visualização" />
                                        <h2
                                            className='title'
                                            style={{ fontSize: `${Math.min(18, 170 / card.title.length)}px` }}
                                        >
                                            {card.title}
                                        </h2>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <button
                        className='addBtngalery'
                        onClick={() => setOpenModal(true)}
                        id="addCardBtn"
                    >
                        Adicionar Cartão
                    </button>
                </div>
                <div className="div-prancha ">
                    <h2 className="main_title">PRANCHA</h2>
                    <div>
                        <ul className='wrapper_pranchaCard'>
                            {prancha.map((card, index) => (
                                <li key={index}>
                                    <div
                                        onClick={() => removeFromPrancha(index)}
                                        className='prancha_card'
                                        style={{ backgroundColor: card.backgroundColor }}
                                    >
                                        <img className='img' src={card.imgSrc} alt="Pré-visualização" />
                                        <h2
                                            className='title'
                                            style={{ fontSize: `${Math.min(28, 270 / card.title.length)}px` }}
                                        >
                                            {card.title}
                                        </h2>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div>
                <Modal isOpen={openModal} closeOpen={() => setOpenModal(!openModal)} onSaveCard={addCard} />
                <ConfirmationModal
                    isOpen={openModalConf}
                    closeModal={() => setOpenModalConf(false)}
                    onConfirm={confirmMoveToPrancha}
                    cardInfo={selectedCard || {}}
                />
            </div>
        </section>
    );
}

export default Galeria;
