import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import './Main.css'

export default function Input() {

    const [newList, setNewList] = useState('');

    const handleSubmit = () => {
        console.log(newList);
        setNewList('');
    }
    const handleEnterKey = (e) => {
        if(e.key === 'Enter') {
            handleSubmit();
        }
    }

    return (
        <>
            <input
                className='inputForm'
                placeholder='오늘의 할 일은?'
                value={newList}
                onChange={(e) => setNewList(e.target.value)}
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