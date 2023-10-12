import React from 'react';
import './main_modal.css';

const ConfirmationModal = ({ isOpen, closeModal, onConfirm, onDelete, cardInfo }) => {
  if (isOpen) {
    return (
      <div className="main_modal" >
        <div className="wrapper_modal">
          <div>
            <button className="closeButton" onClick={closeModal}>&times;</button>
          </div>
          <div className='titleModal'>
            <h1 >Deseja mover o cartão para a Prancha?</h1>
          </div>
          <div className="wrapper_insputs -mprancha">
            <div className='styleCard' style={{ backgroundColor: cardInfo.backgroundColor }} >
              <img src={cardInfo.imgSrc} alt="Pré-visualização" />
              <h2>{cardInfo.title}</h2>
            </div>
            {cardInfo.audioSrc ? (
              <div>
                <audio className='inputs' controls>
                  <source src={cardInfo.audioSrc} type="audio/mp3" />
                  Seu navegador não suporta o elemento de áudio.
                </audio>
              </div>
            ) : (
              <p>Áudio não disponível</p>
            )}
            <button
              className="styleButton"
              onClick={() => { onConfirm(); closeModal(); }}
            >
              Confirmar
            </button>
            <button
              className="styleButtonReset"
              onClick={() => { onDelete(); closeModal(); }}
            >
              Excluir
            </button>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ConfirmationModal;
