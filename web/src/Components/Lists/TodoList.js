import React, { useState } from "react";
import { BiCheck, BiPencil, BiTrash } from "react-icons/bi";

export default function TodoList(props) {

    const [modifying, setModifying] = useState(false);
    const [newContent, setNewContent] = useState(props.content);

    const deleteHandler = () => {
        props.removeHandler(props.id);
    }
    
    const toggleCheck = () => {
        props.checkHandler(props.id);
    }

    const toggleModifying = () => {
        if (modifying === true)
            setNewContent(props.content);

        setModifying(!modifying);
    }

    const keyHandler = (e) => {
        if (e.key === 'Escape')
            toggleModifying();
        else if (e.key === 'Enter') {
            modifySubmitHandler();
        }
    }

    const modifySubmitHandler = () => {
            setModifying(false);

            if (props.content !== newContent)
                props.modifyHandler(props.id, newContent);
    }

    return(
        <div className="aList">
            <label>
                {
                    props.check ?
                    <BiCheck className="checked" onClick={toggleCheck} /> :
                    <div className="nonchecked" onClick={toggleCheck} />
                }
                {
                    modifying ? 
                    <input autoFocus
                        className="content"
                        id="modifyingContent"
                        value={newContent} 
                        onChange={(e) => setNewContent(e.target.value)}
                        onKeyUp={keyHandler}
                        onBlur={toggleModifying}
                    /> :
                    <div className="content" onClick={toggleCheck}>{props.content}</div>
                }
            </label>
            <div className="icons">
                {
                    modifying ?
                        <BiCheck
                            className="listIcon"
                            size={27}
                            onClick={modifySubmitHandler}
                        /> :
                        <BiPencil
                            className="listIcon"
                            size={21} 
                            onClick={toggleModifying}
                        />
                }
                <BiTrash className="listIcon" size={21} onClick={deleteHandler}/>
            </div>
        </div>
    );
}