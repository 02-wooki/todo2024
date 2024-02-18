import { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import './Main.css'

export default function Input() {

    const [newList, setNewList] = useState('');

    return (
        <>
            <input
                className='inputForm'
                placeholder='오늘의 할 일은?'
                onChange={(e) => setNewList(e.target.value)}
            />
            <BiPlus 
                id='submitIcon'
                color='#fff'
            />
        </>
    );
}