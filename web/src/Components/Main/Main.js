import './Main.css'
import Input from './Input';
import ListComponent from '../Lists/ListComponent';
import { useEffect, useRef, useState } from 'react';
import ToastNotification from './ToastNotification';

export default function Main() {

    // 할일 목록 배열
    const [lists, setLists] = useState([]);

    // 투두 내용 받아오는 함수
    const getList = () => {
        fetch('http://localhost:8080/api/getlist?id=all')
        .then(res => res.json())
        .then(res => {
            setLists(res.body);
        })
    }

    // 최초 실행 시 투두 내용 받아오기
    useEffect(getList, []);

    const [removedMember, setRemovedMember] = useState([]);
    const [toastState, setToastState] = useState(false);

    // 목록에서 멤버를 삭제하는 함수
    const removeHandler = (id) => {
        // id가 매치하는 요소 removedMember로 옮긴 후 삭제
        setRemovedMember(removedMember.concat(lists.filter(list => list.bookId === id)));
        setLists(lists.filter(list => list.bookId !== id));

        setToastState(true);
        console.log('id:' + id + ' 삭제됨');
    };

    // 삭제 취소
    const unRemoveHandler = () => {

        // removedMember.forEach(list => {
        //     pushHandler(list.content);
        //     if (list.check)
        //         checkHandler(nextId.current - 1);
        // });

        setRemovedMember([]);
        setToastState(false);
    }

    // 멤버의 체크박스 값을 변경하는 함수
    const checkHandler = (id) => {
        setLists(
            lists.map(
                list => list.bookId === id ? {... list, check: !list.check} : list
            )
        );
    };

    // 데이터 삽입
    const pushHandler = (newContent) => {
        fetch('http://localhost:8080/api/putlist', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify({ content: newContent })
        })
        .then(res => {
            console.log(res);
        })
    }

    // 멤버 수정하는 함수 (빈 내용 요청시 삭제)
    const modifyHandler = (id, newContent) => {
        if (newContent.length !== 0) {
            setLists(
                lists.map(list => list.bookId === id ? {... list, content: newContent} : list)
            );
            console.log(newContent + '로 수정됨 (id:' + id + ')');
        } else {
            removeHandler(id);
            console.log('길이 0 수정 요청으로 인한 삭제 (id:' + id + ')');
        }
    }

    return (
        <>
            <h1>Todo List</h1>
            <ListComponent
                lists={lists}
                removeHandler={removeHandler}
                checkHandler={checkHandler}
                modifyHandler={modifyHandler}
            />
            <Input pushHandler={pushHandler} />
            { toastState ?
                <ToastNotification
                    setToastState={setToastState}
                    unRemoveHandler={unRemoveHandler}
                /> : null }
        </>
    );
}