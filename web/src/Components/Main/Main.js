import './Main.css'
import Input from './Input';
import ListComponent from '../Lists/ListComponent';

export default function Main() {
    return (
        <>
            <h1>Todo List</h1>
            <ListComponent />
            <Input />
        </>
    );
}