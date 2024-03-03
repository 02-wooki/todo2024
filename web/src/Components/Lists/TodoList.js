import React, { useState } from "react";
import { BiCheck, BiX } from "react-icons/bi";

export default function TodoList(props) {

    const [boxChecked, setBoxChecked] = useState(props.check);

    const deleteHandler = () => {
        console.log('delete', props.id);
    }
    
    const boxCheckHandler = () => {
        setBoxChecked(!boxChecked);
    }
    
    console.log(props.id, boxChecked);

    return(
        <div className="aList">
            <label onClick={boxCheckHandler}>
                {boxChecked ?
                    <BiCheck className="checked" /> :
                    <div className="nonchecked" />
                }
                <div>{props.content}</div>
            </label>
            <BiX className="listIcon" size={21} onClick={deleteHandler}/>
        </div>
    );
}