import React from 'react';
import './main_modal.css';
import { IoTrashOutline, IoRemoveCircleOutline } from "react-icons/io5";

const ConfirmationModalRemov = ({ isOpen, closeModal, onConfirm, onDelete, cardInfo }) => {
  if (isOpen) {
    return (
      <div className="main_modal" >
        <div className="wrapper_modal">
          <div>
            <button className="closeButton" onClick={closeModal}>&times;</button>
          </div>
          <div className='titleModal'>
            <h1 >Deseja remover o cartão da Prancha?</h1>
          </div>
          <div className="wrapper_insputs -mprancha">
            <div className='styleCard' style={{ backgroundColor: cardInfo.backgroundColor }} >
              <img className='img' src={cardInfo.imgSrc} alt="Pré-visualização" />
              <h2 className='title'
                style={{ fontSize: `${Math.min(28, 270 / cardInfo.title.length)}px` }}
              >
                {cardInfo.title}
              </h2>
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
            <div className='divButton'>
              <button
                className="styleButton -confirm"
                onClick={() => { onConfirm(); closeModal(); }}
              >
                <IoRemoveCircleOutline /> Remover da Prancha
              </button>
              <button
                className="styleButtonReset -excluir"
                onClick={onDelete}
              >
                <IoTrashOutline /> Excluir Cartão
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default ConfirmationModalRemov;
