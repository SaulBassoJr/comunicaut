import './main_modal.css';
import { useState, useEffect, useRef } from 'react';

function Modal({ isOpen, closeOpen, onSaveCard }) {
    const [cardInfo, setCardInfo] = useState({
        imgSrc: "",
        backgroundColor: "#ffffff",
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

    // const handleInputChange = (event) => {
    //     const { id, value } = event.target;
    //     setCardInfo({
    //         ...cardInfo,
    //         [id]: value
    //     });
    // };


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
    };  

    const handleSaveCard = () => {
        const newCard = {
            imgSrc: imgPreviewRef.current?.src || '',
            backgroundColor: colorPickerRef.current?.value || '#ffffff',
            title: titleInputRef.current?.value || 'Título da imagem',
            audioSrc: audioElementRef.current?.src || '',
            audioName: '' // Você precisa obter o nome do arquivo de áudio, se necessário
        };
        onSaveCard(newCard);
    };

    if (isOpen) {
        return (
            <div className="main_modal">
                <div className="wrapper_modal">
                    <div>
                        <button className="closeButton" onClick={() => closeOpen()}>X</button>
                    </div>
                    <div className="wrapper_insputs">
                        <div>
                            <div>
                                <div id="fileInputContainer"></div>
                                <img ref={imgPreviewRef} src={cardInfo.imgSrc} style={{ backgroundColor: cardInfo.backgroundColor }} alt="Pré-visualização da imagem" />
                                <h1>{cardInfo.title}</h1>
                            </div>
                        </div>
                        <div>
                            <input className="inputs" type="file" id="fileInput" accept="image/*" onChange={handleInputChange} />
                            <span id="imageNameDisplay"></span>
                        </div>
                        <div>
                            <input className="inputs" type="file" id="audioInput" accept="audio/*" />
                        </div>
                        <div>
                            <label>*Escolher cor de fundo:</label>
                            <input className="inputs" type="color" id="colorPicker" ref={colorPickerRef} onChange={handleInputChange} />
                        </div>
                        <div>
                            <label>*Título do cartão:</label>
                            <input className="inputs" type="text" id="titleInput" placeholder="Insira o título do cartão" ref={titleInputRef} onChange={handleInputChange}/>
                        </div>
                        <div>
                            <button className="styleButton" id="playPauseButton">Reproduzir</button>
                            <audio id="audioElement" ref={audioElementRef}></audio>
                        </div>
                        <button onClick={handleSaveCard} className="styleButton" id="addButton">Salvar Cartão</button>
                        <button className="styleButton" id="resetAllButton">Resetar Cartão</button>
                    </div>
                </div>
            </div>
        );
    }
    return null;
}

export default Modal;
