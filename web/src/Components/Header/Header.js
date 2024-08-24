import './Header.css'
import { useState } from 'react';
import { BiLogOut, BiCog } from "react-icons/bi";


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
                src="https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"
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