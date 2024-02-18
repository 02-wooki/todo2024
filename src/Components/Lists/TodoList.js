import React, { useState } from "react";

export default function TodoList(props) {

    const [boxChecked, setBoxChecked] = useState(props.check);

    return(
        <>
            <label>
                <input type="checkbox" checked={boxChecked} onChange={() => setBoxChecked(!boxChecked)}/>
                <div>{props.content}</div>
            </label>
        </>
    );
}