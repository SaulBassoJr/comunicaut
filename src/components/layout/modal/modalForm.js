import './main_modal.css';
import { useState, useEffect, useRef } from 'react';
import { IoSaveOutline, IoSyncCircleOutline } from "react-icons/io5";

function Modal({ isOpen, closeOpen, onSaveCard }) {
    const [cardInfo, setCardInfo] = useState({
        imgSrc: "",
        backgroundColor: 'white',
        title: "Título da imagem",
        audioSrc: "",
        audioName: ""
    });

    const imgPreviewRef = useRef(null);
    const colorPickerRef = useRef(null);
    const titleInputRef = useRef(null);
    const audioElementRef = useRef(null);

    const [feedbackMessage, setFeedbackMessage] = useState(null);

    const displayFeedback = (message) => {
        setFeedbackMessage(message);
        // Remover a mensagem após algum tempo (por exemplo, 3 segundos)
        setTimeout(() => {
            setFeedbackMessage(null);
        }, 3000);
    };

    useEffect(() => {
        // Atualize o cardInfo com os valores iniciais dos elementos
        setCardInfo({
            ...cardInfo,
            imgSrc: imgPreviewRef.current?.src,
            backgroundColor: colorPickerRef.current?.value || '#ffffff',
            title: titleInputRef.current?.value,
            audioSrc: audioElementRef.current?.src || ''
        });
    }, [isOpen]); // Execute isso quando o modal é aberto

    const handleInputChange = (event) => {
        const { id, files, value } = event.target;

        if (id === 'fileInput' && files && files[0]) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setCardInfo({
                    ...cardInfo,
                    imgSrc: e.target.result
                });
            };
            reader.readAsDataURL(files[0]);
        } else if (id === 'audioInput' && files && files[0]) {
            // Este bloco é acionado quando o usuário seleciona um arquivo de áudio
            const reader = new FileReader();
            reader.onload = (e) => {
                setCardInfo({
                    ...cardInfo,
                    audioSrc: e.target.result
                });
            };
            reader.readAsDataURL(files[0]);
        } else {
            if (id === 'colorPicker') {
                // Atualize a cor de fundo em tempo real
                const backgroundColor = value;
                setCardInfo({
                    ...cardInfo,
                    backgroundColor
                });
            } else if (id === 'titleInput') {
                // Atualize o título em tempo real
                const title = value || 'Título da imagem';
                setCardInfo({
                    ...cardInfo,
                    title
                });
            } else {
                setCardInfo({
                    ...cardInfo,
                    [id]: value
                });
            }
        }
        localStorage.setItem('savedCardInfo', JSON.stringify(cardInfo));
    };

    const handleSaveCard = () => {
        if (!cardInfo.imgSrc && !cardInfo.title) {
            displayFeedback('Por favor, adicione a imagem e o título antes de salvar o cartão.');
            return;
        }
        if (!cardInfo.imgSrc) {
            displayFeedback('Por favor, adicione a imagem antes de salvar o cartão.');
            return;
        }
        if (!cardInfo.title) {
            displayFeedback('Por favor, preencha o título antes de salvar o cartão.');
            return;
        }
        const newCard = {
            imgSrc: imgPreviewRef.current?.src,
            backgroundColor: colorPickerRef.current?.value || '#ffff',
            title: titleInputRef.current?.value,
            audioSrc: audioElementRef.current?.src || '' || '',
            audioName: ''
        };
        onSaveCard(newCard);
        closeOpen();
    };

    const resetCard = () => {
        setCardInfo({
            imgSrc: "",
            backgroundColor: "#ffffff",
            title: "",
            audioSrc: "",
            audioName: ""
        });

        if (imgPreviewRef.current) imgPreviewRef.current.src = "";
        if (colorPickerRef.current) colorPickerRef.current.value = "#ffffff";
        if (titleInputRef.current) titleInputRef.current.value = "";
        if (audioElementRef.current) {
            audioElementRef.current.src = "";
        }

        if (document.getElementById("fileInput")) {
            document.getElementById("fileInput").value = "";
        }
        if (document.getElementById("audioInput")) {
            document.getElementById("audioInput").value = "";
        }
    };

    if (isOpen) {
        return (
            <div className="main_modal">
                <div className="wrapper_modal">
                    <div>
                        <button
                            className="closeButton"
                            onClick={() => closeOpen()}
                        >
                            &times;
                        </button>
                    </div>
                    <div className="wrapper_insputs">
                        {feedbackMessage && (
                            <div className='feedbackMessage'>
                                <p className='feedbackP'>{feedbackMessage}</p>
                            </div>
                        )}

                        <div>

                            <div className='styleCard' style={{ backgroundColor: cardInfo.backgroundColor }}>
                                <div id="fileInputContainer"></div>
                                <img ref={imgPreviewRef} src={cardInfo.imgSrc} alt="Pré-visualização da imagem" />
                                <h1 className='title'>{cardInfo.title}</h1>
                            </div>
                        </div>

                        <div>
                            <label>*Escolha a Imagem:</label>
                            <input
                                className="inputs"
                                type="file"
                                id="fileInput"
                                accept="image/*"
                                onChange={handleInputChange}
                            />

                        </div>
                        <div>
                            <label>Escolha o áudio:</label>
                            <input
                                className="inputs"
                                type="file"
                                id="audioInput"
                                accept="audio/*"
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label>*Escolha a cor de fundo:</label>
                            <input className="inputs" type="color" id="colorPicker" ref={colorPickerRef} onChange={handleInputChange} value={cardInfo.backgroundColor} />
                        </div>
                        <div>
                            <label>*Título do cartão:</label>
                            <input className="inputs" type="text" id="titleInput" placeholder="Insira o título do cartão" ref={titleInputRef} onChange={handleInputChange} />
                        </div>
                        <div>
                            {cardInfo.audioSrc ? (
                                <div>
                                    <audio className='inputs' controls>
                                        <source ref={audioElementRef} src={cardInfo.audioSrc} type="audio/mp3" />
                                        Seu navegador não suporta o elemento de áudio.
                                    </audio>
                                </div>
                            ) : (
                                <p>Áudio não disponível para reprodução</p>
                            )}
                        </div>
                        <div className='divModalButton'>
                            <button
                                onClick={handleSaveCard}
                                className="styleButton"
                                id="addButton"
                            >
                                <IoSaveOutline /> Salvar Cartão
                            </button>
                            <button
                                className="styleButtonReset"
                                id="resetAllButton"
                                onClick={resetCard}
                            >
                                <IoSyncCircleOutline /> Resetar Cartão
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Modal;
