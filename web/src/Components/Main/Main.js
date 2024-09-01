import './Main.css'
import Input from './Input';
import ListComponent from '../Lists/ListComponent';
import { useEffect, useState } from 'react';
import ToastNotification from './ToastNotification';

import { addlist, checkboxmodify, getlist, recoverylist, removelist } from '../../modules/todoapi';

// api 주소 노출 방지를 위해 모듈화
import apiUrl from '../../apiurl';

export default function Main() {

    // 할일 목록 배열
    const [lists, setLists] = useState([]);
    const [toastState, setToastState] = useState(false);

    // 최초 실행 시 내용 받아오기
    useEffect(() => {
        getlist()
            .then((value) => { setLists(value); });
    }, []);

    // 삭제
    const removeHandler = (id) => {

        setLists(lists.filter((list) => list.bookId != id));
        
        removelist(id);

        setToastState(true);
    };

    // 삭제 취소
    const unRemoveHandler = () => {

        recoverylist()
            .then((value => { setLists(value); }));

        setToastState(false);
    }

    // 멤버의 체크박스 값을 변경하는 함수
    const checkHandler = (id) => {

        setLists(
            lists.map(list => 
                list.bookId === id ? { ...list, checked : !list.checked } : list
        ));

        checkboxmodify(id, lists.find(list => list.bookId === id).checked)

    };

    // 데이터 삽입
    const pushHandler = (newContent) => {

        const newlist = {
            content : newContent
        }
        setLists(lists.concat(newlist));
        
        addlist(newContent)
            .then(value => { setLists(value); });

    }

    // 멤버 수정하는 함수 (빈 내용 요청시 삭제)
    const modifyHandler = (id, newContent) => {
        if (newContent.length !== 0)
            console.log('수정 요청');
        else
            removeHandler(id);
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