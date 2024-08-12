import React, { useEffect } from "react";
import './ToastNotification.css'

export default function ToastNotification(props) {

    useEffect(() => {
        let timer = setTimeout(() => {
            props.setToastState(false);
        }, 10000);
        return() => { clearTimeout(timer) };
    }, []);

    return (
        <div className="toastAlertContainer">
            삭제되었습니다.
            <button>취소</button>
        </div>
    );
}