import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import './Main.css'

export default function Input(props) {

    const [newListContent, setNewListContent] = useState('');

    const inputKeyHandler = (e) => {
        if(e.key === 'Enter') {
            submitHandler();
        } else if(e.key === 'Escape') {
            setNewListContent('');
        }
    }
    const submitHandler = () => {
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
                onKeyUp={inputKeyHandler}
            />
            <BiPlus 
                id='submitIcon'
                color='#fff'
                onMouseDown={(e) => {e.preventDefault()}}
                onClick={submitHandler}
            />
        </>
    );
}