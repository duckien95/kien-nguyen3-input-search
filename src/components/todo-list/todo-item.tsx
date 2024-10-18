import { ChangeEvent, useState } from "react";

export interface TodoItemProps {
    todoData: TodoData;
    key: string;
    /** On click item handler */
    onSelectItem: (item: string) => void;
    /** On complete todo handler */
    onCompleteItem: (evt: ChangeEvent<HTMLInputElement>, itemId: string) => void;
    /** On delete todo handler */
    onDeleteItem: (itemId: string) => void;
}

export interface TodoData {
    type: string;
    title: string;
    id: string;
}

const TodoItem = ({ todoData, key, onCompleteItem, onDeleteItem }: TodoItemProps) => {
    console.log('TodoItem re-render')

    const [editMode, setEditMode] = useState(false);

    // Your code start here
    return (
        <div className="todo__item" key={key}>
            {
                editMode ?
                <input className="todo__edit"></input> :
                (
                    <div onClick={() => setEditMode(true)}>
                        <input type="checkbox " onChange={(evt) => onCompleteItem(evt, todoData.id)}></input>
                        <p>{todoData.title}</p>
                        <p onClick={() => onDeleteItem(todoData.id)}>Clear</p>
                    </div>
                )
            }
        </div>

    )
    // Your code end here
};

export default TodoItem;

