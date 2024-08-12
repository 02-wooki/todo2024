import React, { useEffect } from "react";
import './ToastNotification.css'

export default function ToastNotification(props) {

    useEffect(() => {
        let timer = setTimeout(() => {
            props.setToastState(false);
        }, 7000);
        return() => {
            clearTimeout(timer);
        }
    }, []);

    return (
        <div className='toastAlertContainer openAnimation'>
            삭제되었습니다.
            <button onClick={() => props.unRemoveHandler()}>취소</button>
        </div>
    );
}