import { useState } from "react";
import "./todo-list.scss";
import { TodoStatus } from "../../utils/variables/todo-status";
import { TodoData } from "./inteface/interface-todo-item";

export interface TodoItemProps {
    todoData: TodoData;
    /** On click item handler */
    onSelectItem?: (item: string) => void;
    /** On complete todo handler */
    onCompleteItem?: (evt: React.ChangeEvent<HTMLInputElement>, itemId: string) => void;
    /** On delete todo handler */
    onDeleteItem: (itemId: string) => void;
    /** On delete todo handler */
    onUpdateItem: (evt: React.KeyboardEvent<HTMLInputElement>, itemId: string) => void;
}

const TodoItem = ({ todoData, onCompleteItem, onDeleteItem, onUpdateItem }: TodoItemProps) => {
    console.log('[Chidren] TodoItem re-render')

    const [editMode, setEditMode] = useState(false);

    const onBlurInput = (evt: React.FocusEvent<HTMLInputElement>) => {
        evt.target.value = todoData.title;
        setEditMode(false);
    }

    // Your code start here
    return (
        <li className={`todo__item ${editMode ? 'edit-mode' : ''}`}>
            {
                editMode ?
                <input className="todo__item--edit" 
                    type="text" 
                    defaultValue={todoData.title} 
                    onKeyDown={(evt) => onUpdateItem(evt, todoData.id)} 
                    onBlur={onBlurInput}
                ></input> :
                (
                    <div className="todo__item--infor" onDoubleClick={() => setEditMode(true)}>
                        <input className="todo__item--checkbox" 
                            type="checkbox" 
                            checked={todoData.type == TodoStatus.Complete} 
                            onChange={(evt) => onCompleteItem(evt, todoData.id)}
                        ></input>
                        <div className="todo__item--title">{todoData.title}</div>
                        <button className="todo__item--button" onClick={() => onDeleteItem(todoData.id)}>Clear</button>
                    </div>
                )
            }
        </li>

    )
    // Your code end here
};

export default TodoItem;

