import '../layout/reset.css';
import '../layout/main_section.css';
import '../layout/main_title.css';
import './galeria_card.css';
import './wrapper_galeria.css';
import './prancha_card.css';
import { IoPrintOutline, IoCloudUploadOutline } from "react-icons/io5";

import ReactToPrint from 'react-to-print';


import Modal from '../layout/modal/modalForm';
import ConfirmationModal from '../layout/modal/modalIncer';
import ConfirmationModalRemov from '../layout/modal/modalRemov';
import ConfirmDelet from '../layout/modal/modalConfirmDelet';
import { useState, useRef } from 'react';

function Galeria() {
    const [cards, setCards] = useState([]);
    const [prancha, setPrancha] = useState([]);
    const [openModal, setOpenModal] = useState(false);
    const [openModalConf, setOpenModalConf] = useState(false);
    const [openModalConfRemov, setOpenModalConfRemov] = useState(false);
    const [selectedCard, setSelectedCard] = useState(null);
    const printRef = useRef();
    const [confirmDeleteCard, setConfirmDeleteCard] = useState(false);  // Estado para confirmar exclusão do card
    const [confirmDeletePrancha, setConfirmDeletePrancha] = useState(false);


    const addCard = (card) => {
        setCards([...cards, card]);
    };


    const openConfirmationModal = (index) => {
        setSelectedCard(cards[index]);
        setOpenModalConf(true);
    };

    const openConfirmationModalRemov = (index) => {
        setSelectedCard(prancha[index]);
        setOpenModalConfRemov(true);
    };

    const removeCard = () => {
        // if (selectedCard) {
        //     setCards(cards.filter((_, i) => i !== cards.indexOf(selectedCard)));
        //     setSelectedCard(null);
        //     setOpenModalConf(false);
        // }
        if (selectedCard) {
            setConfirmDeleteCard(true); // Exibe a confirmação
        }
    };

   const confirmDeleteCardd = () => {
        setCards(cards.filter((_, i) => i !== cards.indexOf(selectedCard)));
        setSelectedCard(null);
        setOpenModalConf(false);
        setConfirmDeleteCard(false); // Fecha a confirmação
    };


    const removeCardPrancha = () => {
        if (selectedCard) {
            // setPrancha(prancha.filter((_, i) => i !== prancha.indexOf(selectedCard)));
            // setSelectedCard(null);
            // setOpenModalConfRemov(false);
            setConfirmDeletePrancha(true); // Exibe a confirmação
        }
    };

    const confirmDeletePranchaa = () => {
        setPrancha(prancha.filter((_, i) => i !== prancha.indexOf(selectedCard)));
        setSelectedCard(null);
        setOpenModalConfRemov(false);
        setConfirmDeletePrancha(false); // Fecha a confirmação
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

    const confirmRemoveFromPrancha = () => {
        if (selectedCard) {
            setPrancha(prancha.filter((_, i) => i !== prancha.indexOf(selectedCard))); // Atualiza o estado da prancha
            setCards([...cards, selectedCard]); // Adiciona o cartão removido de volta à galeria
            setSelectedCard(null);
            setOpenModalConfRemov(false);
        }
    }

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
                        <IoCloudUploadOutline /> Adicionar Cartão
                    </button>
                </div>
                <div className="div-prancha ">
                    <div className='div_title'>
                        <h2 className="main_title">PRANCHA</h2>
                        <ReactToPrint
                            trigger={() => <button className="imprimeButton"> <IoPrintOutline /> Imprimir Prancha</button>}
                            content={() => printRef.current}
                        />
                    </div>
                    <div ref={printRef}>
                        <ul className='wrapper_pranchaCard'>
                            {prancha.map((card, index) => (
                                <li key={index}>
                                    <div
                                        onClick={() => openConfirmationModalRemov(index)}
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
                    onDelete={removeCard}
                    cardInfo={selectedCard || {}}
                />
                <ConfirmationModalRemov
                    isOpen={openModalConfRemov}
                    closeModal={() => setOpenModalConfRemov(false)}
                    onConfirm={confirmRemoveFromPrancha}
                    onDelete={removeCardPrancha}
                    cardInfo={selectedCard || {}}
                />
                <ConfirmDelet
                    isOpen={confirmDeleteCard}
                    onCancel={() => setConfirmDeleteCard(false)}
                    onConfirm={confirmDeleteCardd}
                />

                {/* Componente ConfirmDelet para exclusão da prancha */}
                <ConfirmDelet
                    isOpen={confirmDeletePrancha}
                    onCancel={() => setConfirmDeletePrancha(false)}
                    onConfirm={confirmDeletePranchaa}
                />
            </div>
        </section>
    );
}

export default Galeria;