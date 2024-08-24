import React, { useRef, useState } from "react";
import TodoList from "./TodoList";


export default function ListComponent(props) {
    return(
        <>
            {
                props.lists.map((list) => <TodoList
                    key={list.bookId} 
                    id={list.bookId} 
                    check={list.checked}
                    checkHandler={props.checkHandler} 
                    content={list.content} 
                    modifyHandler={props.modifyHandler}
                    removeHandler={props.removeHandler}/>)
            }
        </>
    );
}