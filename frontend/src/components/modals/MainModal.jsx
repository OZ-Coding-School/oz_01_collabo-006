import React, { useEffect, useRef, useState } from 'react'
import { FiX } from 'react-icons/fi'
import useStore from '../../store/mainModal'
import './MainModal.css'
import dogsData from '/images/dogs.jsx?url'
import logo from '/images/logo.png'

const MainModal = ({ isOpen, onClose }) => {
    const modalRef = useRef()
    const { selectedDog, setSelectedDog } = useStore()
    const [modalVisible, setModalVisible] = useState(false)

    useEffect(() => {
        const showModal = localStorage.getItem('access')

        if (!showModal) {
            setModalVisible(isOpen)
        } else {
            setModalVisible(false)
        }
    }, [isOpen])

    const handleRadioSelect = (event) => {
        const selectedDogId = parseInt(event.target.value)
        const selectedDog = dogsData.find((dog) => dog.id === selectedDogId)
        setSelectedDog(selectedDog)
    }

    const isButtonDisabled = selectedDog === null

    const handleClose = () => {
        localStorage.setItem('access', 'milk')
        onClose()
    }

    const filteredDogsData = dogsData.filter((dog) => dog.id !== 5)

    return (
        <>
            {modalVisible && (
                <div className="main-modal-background">
                    <div className="main-modal" ref={modalRef}>
                        <button
                            className="main-modal-exit"
                            onClick={handleClose}
                        >
                            <FiX />
                        </button>

                        <img
                            className="main-modal-logo"
                            src={logo}
                            alt="logo"
                        />
                        <p className="main-modal-title">
                            내 반려동물을 사전 설정하고, 동반 가능 맞춤 정보를
                            제공받으세요!
                        </p>
                        <div className="dog-wrap">
                            {filteredDogsData.map((dog) => (
                                <label key={dog.id}>
                                    <input
                                        className="main-modal-radio"
                                        type="radio"
                                        name="dogType"
                                        value={dog.id}
                                        onChange={handleRadioSelect}
                                    />
                                    <div className="dog-component">
                                        <img
                                            className="dog-image"
                                            src={
                                                selectedDog === dog
                                                    ? dog.hoverImage
                                                    : dog.image
                                            }
                                            alt={dog.name}
                                        />
                                        <div className="dog-type-wrap">
                                            <p className="dog-title">
                                                {dog.title}
                                            </p>
                                            <p className="dog-detail">
                                                {dog.detail}
                                            </p>
                                        </div>
                                    </div>
                                </label>
                            ))}
                        </div>
                        <button
                            className="main-modal-btn"
                            onClick={handleClose}
                            disabled={isButtonDisabled}
                        >
                            페뜨하기
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default MainModal
