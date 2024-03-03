import './Header.css'
import { useState } from 'react';
import { Link } from 'react-router-dom';
import { BiPlusCircle, BiLogOut, BiCog } from "react-icons/bi";


export default function Header() {

    const [modalOpen, setmodalOpen] = useState(false);
    const [settingsExplation, setSettingsExplation] = useState(false);
    const [logoutExplation, setLogoutExplation] = useState(false);

    return(
        <div className='header'>
            <img
                className='profile-pic'
                src="https://health.chosun.com/site/data/img_dir/2023/07/17/2023071701753_0.jpg"
                onMouseEnter={() => setmodalOpen(true)}
            />
            {modalOpen === true ?
                <div
                    className='div-modal'
                    id='modalopen-profileback'
                    onMouseLeave={() => setmodalOpen(false)}
                >
                    <BiCog
                        id='settings-icon'
                        size={45}
                        color='#444'
                        onMouseEnter={() => setSettingsExplation(true)}
                    />
                    <BiLogOut
                        id='logout-icon'
                        size={45}
                        color='#444'
                        onMouseEnter={() => setLogoutExplation(true)}
                    />
                </div> :
                <div
                    className='div-modal'
                    id='modalclose-profileback'
                    onMouseEnter={() => setmodalOpen(true)}
                />
            }
            {settingsExplation === true ?
                <div
                    className='icon-oncursor'
                    id='settings-oncursor'
                    onMouseOver={() => setmodalOpen(true)}
                    onMouseOut={() => setSettingsExplation(false)}>
                        설정
                </div> :<></>
            }
            {logoutExplation === true ?
                <div
                    className='icon-oncursor'
                    id='logout-oncursor'
                    onMouseOver={() => setmodalOpen(true)}
                    onMouseOut={() => setLogoutExplation(false)}>
                    로그아웃
                </div> :<></>
            }

        </div>
    );
}