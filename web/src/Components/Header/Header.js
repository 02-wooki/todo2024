import './Header.css'
import { useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";

import mulkong_pigtail from '../../images/mulkong_pigtail.jpg'
import { useNavigate } from 'react-router-dom';

export default function Header() {

    const navigate = useNavigate();

    const [modalOpen, setmodalOpen] = useState(false);
    const [modalState, setModalState] = useState('');

    const [profileOpen, setProfileOpen] = useState(false);
    const [profileState, setProfileState] = useState('');
    
    const modalOpenHandler = (stat) => {
        if(stat || window.innerWidth < 768) {
            setmodalOpen(true);
            setModalState(' modalOpen');
        } else {
            setmodalOpen(false);
            setModalState('');
        }
    }

    const profileViewHandler = (stat) => {
        console.log(profileOpen);
        setProfileOpen(stat);

        stat ? setProfileState(' profileOpen') : setProfileState('');
    }

    const pictureViewClickHandler = () => {
        navigate(process.env.PUBLIC_URL + '/profile/pic');
    }

    const profileSettingClickHandler = () => {

    }
    
    return(
        <div className='header'>
            <img
                className={'profile-pic' + modalState + profileState}
                src={mulkong_pigtail}
                onMouseEnter={() => modalOpenHandler(true)}
                onClick={() => profileViewHandler(true)}
            />
            <div
                className={'div-modal' + modalState}
                onTouchEnd={() => modalOpenHandler(true)}
                onMouseEnter={() => modalOpenHandler(true)}
                onMouseLeave={() => modalOpenHandler(false)}
            />
            { modalOpen === true || window.innerWidth < 768 ?
                <div>
                    <BiCog
                        id='settings-icon'
                        size={45}
                        color='#444'
                        onMouseEnter={() => modalOpenHandler(true)}
                        onClick={() => console.log('setting')}
                    />
                    <BiLogOut
                        id='logout-icon'
                        size={45}
                        color='#444'
                        onMouseEnter={() => modalOpenHandler(true)}
                        onClick={() => console.log('logout')}
                    />
                </div> : null
            }
            { profileOpen === true ?
                <div
                    id='opened-profile-background'
                    onClick={() => profileViewHandler(false)}
                >
                    <div id='opened-profile-buttons-container'>
                        <button
                            className='opened-profile-button bottomGrayBorder'
                            onClick={() => pictureViewClickHandler()}
                        >사진 원본 보기</button>
                        <button
                            className='opened-profile-button'
                        >프로필 설정</button>
                    </div>
                </div> : null
            }
        </div>
    );
}