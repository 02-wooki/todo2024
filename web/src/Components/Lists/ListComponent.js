import React from "react";
import TodoList from "./TodoList";

export default function ListComponent() {

    const lists = [
        {id: 1, check: false, content: '제육 고기 사기'},
        {id: 2, check: true, content: '화장실 청소하기'},
	    {id: 3, check: false, content: '스프링부트 배우기'}
    ];

    return(
        <>
            {lists.map((list) => <TodoList key={list.id} id={list.id} check={list.check} content={list.content} />)}
        </>
    );
}
