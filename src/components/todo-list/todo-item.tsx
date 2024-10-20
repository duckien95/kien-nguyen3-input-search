import { useRef } from "react";
import "../../styles/todo-list/todo-list.scss";
import { TodoStatus } from "../../utils/variables/todo-status";
import { TodoData } from "./inteface/interface-todo-item";
import { useTodoListStore } from "../../context/todo-list/todo-list-store";

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
    console.log('[Chidren] TodoItem re-render');
    const inputRef = useRef(null);

    // get state from todo list store
    const editedTodoId = useTodoListStore((state) => state.editedTodoId);
    const setEditedTodoId = useTodoListStore((state) => state.setEditedTodoId);

    const onDoubleClick = () => {
        setEditedTodoId(todoData.id); 
        inputRef.current && inputRef.current.click();
    }

    const onBlurInput = (evt: React.FocusEvent<HTMLInputElement>) => {
        evt.target.value = todoData.title;
        setEditedTodoId("");
    }

    const isEditingMode = editedTodoId == todoData.id;

    // Your code start here
    return (
        <li className={`todo__item ${isEditingMode ? 'edit-mode' : ''}`}>
            <input className={isEditingMode ? "todo__item--edit" : "d-none"}
                ref={inputRef}
                type="text" 
                defaultValue={todoData.title} 
                onKeyDown={(evt) => onUpdateItem(evt, todoData.id)} 
                onBlur={onBlurInput}
            ></input>
            <div className={isEditingMode ? "d-none" : "todo__item--infor"} onDoubleClick={onDoubleClick}>
                <input className="todo__item--checkbox" 
                    type="checkbox" 
                    checked={todoData.isCompleted} 
                    onChange={(evt) => onCompleteItem(evt, todoData.id)}
                ></input>
                <div className="todo__item--title">{todoData.title}</div>
                <button className="todo__item--button" onClick={() => onDeleteItem(todoData.id)}>Clear</button>
            </div>
        </li>

    )
    // Your code end here
};

export default TodoItem;

