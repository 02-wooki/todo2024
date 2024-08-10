import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import './Main.css'

export default function Input(props) {

    const [newListContent, setNewListContent] = useState('');

    const handleEnterKey = (e) => {
        if(e.key === 'Enter') {
            handleSubmit();
        }
    }
    const handleSubmit = () => {
        if (newListContent.length !== 0) {
            props.pushHandler(newListContent);
            setNewListContent('');
        }
    }
            
    return (
        <>
            <input
                className='inputForm'
                placeholder='오늘의 할 일은?'
                value={newListContent}
                onChange={(e) => setNewListContent(e.target.value)}
                onKeyUp={handleEnterKey}
            />
            <BiPlus 
                id='submitIcon'
                color='#fff'
                onMouseDown={(e) => {e.preventDefault()}}
                onClick={handleSubmit}
            />
        </>
    );
}