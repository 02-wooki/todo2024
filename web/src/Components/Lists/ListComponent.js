import React, { useRef, useState } from "react";
import TodoList from "./TodoList";


export default function ListComponent(props) {
    return(
        <>
            {
                props.lists.map((list) => <TodoList
                    key={list.id} 
                    id={list.id} 
                    check={list.check}
                    checkHandler={props.checkHandler} 
                    content={list.content} 
                    modifyHandler={props.modifyHandler}
                    removeHandler={props.removeHandler}/>)
            }
        </>
    );
}