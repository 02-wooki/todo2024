import React, { useState } from "react";
import { BiCheck, BiPencil, BiTrash } from "react-icons/bi";

export default function TodoList(props) {

    const [modifying, setModifying] = useState(false);

    const deleteHandler = () => {
        props.removeHandler(props.id);
    }
    
    const checkHandler = () => {
        props.checkHandler(props.id);
    }

    const modifyHandler = () => {
        
    }

    return(
        <div className="aList">
            <label onClick={checkHandler}>
                {props.check ?
                    <BiCheck className="checked" /> :
                    <div className="nonchecked" />
                }
                <div>{props.content}</div>
            </label>
            <div className="icons">
                <BiPencil className="listIcon" size={21} onClick={modifyHandler}/>
                <BiTrash className="listIcon" size={21} onClick={deleteHandler}/>
            </div>
        </div>
    );
}