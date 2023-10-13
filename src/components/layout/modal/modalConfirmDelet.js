import React from 'react';
import './main_modal.css';

const ConfirmDelet = ({ isOpen, onCancel, onConfirm }) => {
    if (isOpen) {
        return (
            <div className="main_modal" >
                <div className="wrapper_modal -conf ">
                    <div className='titleModal'>
                        <h1 >Deseja realmente excluir este cartão?</h1>
                    </div>
                    <div className='divButton -conf'>
                        <button
                            className="styleButton"
                            onClick={onConfirm}
                        >
                            Sim
                        </button>
                        <button
                            className="styleButtonReset"
                            onClick={onCancel}
                        >
                            Não
                        </button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
};

export default ConfirmDelet;
