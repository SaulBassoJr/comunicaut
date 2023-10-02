import './main_modal.css';
import { useState, useEffect, useRef } from 'react';

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

    useEffect(() => {
        // Atualize o cardInfo com os valores iniciais dos elementos
        setCardInfo({
            ...cardInfo,
            imgSrc: imgPreviewRef.current?.src || '',
            backgroundColor: colorPickerRef.current?.value || '#ffffff',
            title: titleInputRef.current?.value || 'Título da imagem',
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
        const newCard = {
            imgSrc: imgPreviewRef.current?.src || '',
            backgroundColor: colorPickerRef.current?.value || '#ffff',
            title: titleInputRef.current?.value || 'Título da imagem',
            audioSrc: audioElementRef.current?.src || '' || '',
            audioName: ''
        };
        onSaveCard(newCard);
    };
    const handlePlayPauseAudio = () => {
        const audioElement = audioElementRef.current;

        if (audioElement.paused) {
            audioElement.play();
        } else {
            audioElement.pause();
        }
    };

    const resetCard = () => {
        setCardInfo({
            imgSrc: "",
            backgroundColor: "#ffffff",
            title: "Título da imagem",
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
                            {/* <span id="imageNameDisplay"></span> */}
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
                            {/* <button className="styleButton" id="playPauseButton" onClick={handlePlayPauseAudio}>
                                {audioElementRef.current?.paused ? 'Reproduzir' : 'Pausar'}
                            </button>
                             <audio id="audioElement" ref={audioElementRef} src={cardInfo.audioSrc}></audio>  */}
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
                        <button onClick={() => { handleSaveCard(); closeOpen(); }} className="styleButton" id="addButton">Salvar Cartão</button>
                        <button className="styleButtonReset" id="resetAllButton" onClick={resetCard}>Resetar Cartão</button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Modal;
