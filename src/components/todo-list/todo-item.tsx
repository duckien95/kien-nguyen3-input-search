import { useRef, useEffect } from "react";
import "../../styles/todo-list/todo-list.scss";
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

const TodoItem: React.FC<TodoItemProps> = ({ todoData, onCompleteItem, onDeleteItem, onUpdateItem }) => {
    console.log('[===========CHILDREN===========] TodoItem re-render');
    const inputRef = useRef(null);

    // get state from todo list store
    const editedTodoId = useTodoListStore((state: any) => state.editedTodoId);
    const setEditedTodoId = useTodoListStore((state: any) => state.setEditedTodoId);

    const onDoubleClick = () => {
        setEditedTodoId(todoData.id);
    }

    useEffect(() => {
        inputRef.current && (inputRef.current as HTMLInputElement).focus();
    });

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
            <div className={`${isEditingMode ? "d-none" : "todo__item--infor"} ${todoData.isCompleted ? "todo__item--infor-completed" : ""} `}>
                <input className="todo__item--checkbox d-none"
                    id={`checkbox-${todoData.id}`}
                    type="checkbox" 
                    checked={todoData.isCompleted} 
                    onChange={(evt) => onCompleteItem && onCompleteItem(evt, todoData.id)}
                ></input>
                <label htmlFor={`checkbox-${todoData.id}`} className="todo__item--label"></label>
                <p className="todo__item--title" onDoubleClick={onDoubleClick}>{todoData.title}</p>
                <button className="todo__item--delete-todo d-none" onClick={() => onDeleteItem(todoData.id)}></button>
            </div>
        </li>

    )
    // Your code end here
};

export default TodoItem;

