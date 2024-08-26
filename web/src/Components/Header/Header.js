import './Header.css'
import { useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";

import mulkong_pigtail from '../../images/mulkong_pigtail.jpg'

export default function Header() {

    const [modalOpen, setmodalOpen] = useState(false);
    const [modalState, setModalState] = useState('');
    
    const modalOpenHandler = (stat) => {
        if(stat) {
            setmodalOpen(true);
            setModalState(' modalOpen');
        } else {
            setmodalOpen(false);
            setModalState('');
        }
    }
    
    return(
        <div className='header'>
            <img
                className={'profile-pic' + modalState}
                src={mulkong_pigtail}
                onMouseEnter={() => modalOpenHandler(true)}
                onClick={() => console.log('profile')}
            />
            <div
                className={'div-modal' + modalState}
                onTouchEnd={() => modalOpenHandler(true)}
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

        </div>
    );
}