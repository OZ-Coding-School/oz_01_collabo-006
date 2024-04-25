import React, { useEffect, useRef } from 'react'
import { FiX } from 'react-icons/fi'
import useStore from '../../store/mainModal' // store import 추가
import './MainModal.css'
import dogsData from '/images/dogs.jsx?url'
import logo from '/images/logo.png'

const MainModal = ({ isOpen, onClose }) => {
    const modalRef = useRef()
    const { selectedDog, setSelectedDog } = useStore() // 상태 및 액션 가져오기

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = 'auto'
        }
        return () => {
            document.body.style.overflow = 'auto'
        }
    }, [isOpen])

    const handleRadioSelect = (event) => {
        const selectedDogId = parseInt(event.target.value)
        const selectedDog = dogsData.find((dog) => dog.id === selectedDogId)
        setSelectedDog(selectedDog) // 액션 호출
    }

    const isButtonDisabled = selectedDog === null

    return (
        <>
            {isOpen && (
                <div className="main-modal-background">
                    <div className="main-modal" ref={modalRef}>
                        <button className="main-modal-exit" onClick={onClose}>
                            <FiX />
                        </button>

                        <img className="main-modal-logo" src={logo} />
                        <p className="main-modal-title">
                            내 반려동물을 사전 설정하고, 동반 가능 맞춤 정보를
                            제공받으세요!
                        </p>
                        <div className="dog-wrap">
                            {dogsData.map((dog) => (
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
                            onClick={onClose}
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

// import React, { useEffect, useRef, useState } from 'react'
// import { FiX } from 'react-icons/fi'
// import './MainModal.css'
// import dogsData from '/images/dogs.jsx?url'
// import logo from '/images/logo.png'

// const MainModal = () => {
//     const [open, setOpen] = useState(false)
//     const modalRef = useRef()
//     const [selectedDog, setSelectedDog] = useState(null)

//     // 페이지가 처음 로드될 때 모달 열기
//     useEffect(() => {
//         setOpen(true)
//     }, [])

//     // 외부 클릭 시 모달 닫기 -> 사용자가 잘못 클릭 할 수 있으니 뺄까요
//     // const handleOutsideClick = (event) => {
//     //     if (modalRef.current && !modalRef.current.contains(event.target)) {
//     //         setOpen(false)
//     //     }
//     // }

//     // useEffect(() => {
//     //     document.addEventListener('mousedown', handleOutsideClick)
//     //     return () => {
//     //         document.removeEventListener('mousedown', handleOutsideClick)
//     //     }
//     // }, [])

//     //모달 띄워져있는 상태에서 스크롤 막기
//     useEffect(() => {
//         if (open) {
//             document.body.style.overflow = 'hidden'
//         } else {
//             document.body.style.overflow = 'auto'
//         }
//         return () => {
//             document.body.style.overflow = 'auto'
//         }
//     }, [open])

//     const handleClose = () => setOpen(false)

//     // 선택된 개를 설정하는 함수
//     const handleDogSelect = (dog) => {
//         setSelectedDog(dog)
//     }

//     const isButtonDisabled = selectedDog === null

//     return (
//         <>
//             {open && (
//                 <div className="main-modal-background">
//                     <div className="main-modal" ref={modalRef}>
//                         <button
//                             className="main-modal-exit"
//                             onClick={handleClose}
//                         >
//                             <FiX />
//                         </button>

//                         <img className="main-modal-logo" src={logo} />
//                         <p className="main-modal-title">
//                             내 반려동물을 사전 설정하고, 동반 가능 맞춤 정보를
//                             제공받으세요!
//                         </p>
//                         <div className="dog-wrap">
//                             {dogsData.map((dog) => (
//                                 <label key={dog.id}>
//                                     <input
//                                         className="main-modal-radio"
//                                         type="radio"
//                                         name="dogType"
//                                         value={dog.image}
//                                         onChange={() => handleDogSelect(dog)}
//                                     />
//                                     <div className="dog-component">
//                                         <img
//                                             className="dog-image"
//                                             src={
//                                                 selectedDog === dog
//                                                     ? dog.hoverImage
//                                                     : dog.image
//                                             }
//                                             alt={dog.name}
//                                         />
//                                         <div className="dog-type-wrap">
//                                             <p className="dog-title">
//                                                 {dog.title}
//                                             </p>
//                                             <p className="dog-detail">
//                                                 {dog.detail}
//                                             </p>
//                                         </div>
//                                     </div>
//                                 </label>
//                             ))}
//                         </div>
//                         <button
//                             className="main-modal-btn"
//                             onClick={handleClose}
//                             disabled={isButtonDisabled}
//                         >
//                             페뜨하기
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </>
//     )
// }

// export default MainModal
