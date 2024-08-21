import './Main.css'
import Input from './Input';
import ListComponent from '../Lists/ListComponent';
import { useRef, useState } from 'react';
import ToastNotification from './ToastNotification';

export default function Main() {

    // 새 멤버의 id를 결정하기 위해 사용
    const nextId = useRef(2);

    // 할일 목록 배열
    const [lists, setLists] = useState([
        {id: 1, check: false, content: '오늘 할 일 적어보기'}
    ]);
    const [removedMember, setRemovedMember] = useState([]);
    const [toastState, setToastState] = useState(false);

    // 목록에서 멤버를 삭제하는 함수
    const removeHandler = (id) => {
        // id가 매치하는 요소 removedMember로 옮긴 후 삭제
        setRemovedMember(removedMember.concat(lists.filter(list => list.id === id)));
        setLists(lists.filter(list => list.id !== id));

        setToastState(true);
        console.log('id:' + id + ' 삭제됨');
    };

    // 삭제 취소
    const unRemoveHandler = () => {

        removedMember.forEach(list => {
            pushHandler(list.content);
            if (list.check)
                checkHandler(nextId.current - 1);
        });

        setRemovedMember([]);
        setToastState(false);
    }

    // 멤버의 체크박스 값을 변경하는 함수
    const checkHandler = (id) => {
        setLists(
            lists.map(
                list => list.id === id ? {... list, check: !list.check} : list
            )
        );
    };

    // 새 멤버를 배열에 추가하는 함수
    const pushHandler = (newContent) => {
        const member = {
            id: nextId.current,
            check: false,
            content: newContent
        }

        setLists(lists.concat(member));
        console.log(newContent + ' 할 일 생성됨 (id:' + nextId.current + ')');

        nextId.current += 1;

        fetch('http://localhost:8080/api/getlist', {
            method : 'POST',
            headers : {
                'Content-Type' : 'application/json'
            },
            body : JSON.stringify(member)
        })
        .then(res => {
            console.log(res);
        })
    }

    // 멤버 수정하는 함수 (빈 내용 요청시 삭제)
    const modifyHandler = (id, newContent) => {
        if (newContent.length !== 0) {
            setLists(
                lists.map(list => list.id === id ? {... list, content: newContent} : list)
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