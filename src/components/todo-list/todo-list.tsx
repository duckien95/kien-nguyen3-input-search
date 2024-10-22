import { useState } from "react";
import TodoItem from "./todo-item";
import { TodoStatus } from "../../utils/variables/todo-status";
import { TodoData } from "./inteface/interface-todo-item";
import { useTodoListStore } from "../../context/todo-list/todo-list-store";
import { TodoListStateProps } from "../../context/todo-list/todo-list-store";

export interface TodoListProps {
    todoList: Array<TodoData>;
}

const TodoList = ({ todoList }: TodoListProps) => {
    console.log('TodoList re-render')

    const [displayType, setDisplayType] = useState(TodoStatus.All);
    const [listCurrentTodo, setListCurrentTodo] = useState<TodoData[]>(todoList);
    // get state from todo list store
    const setEditedTodoId = useTodoListStore((state: any) => state.setEditedTodoId);

    const getListDisplayTodo = () => {           
        return listCurrentTodo.filter(item => {
            return  displayType == TodoStatus.All 
                || (displayType == TodoStatus.Active && item.type == displayType && !item.isCompleted)
                || (displayType == TodoStatus.Complete && item.isCompleted);   
            }
        )
    };

    const updateTodoList = (listTodo: TodoData[]) => {
        setListCurrentTodo(prevListTodo => [...JSON.parse(JSON.stringify(listTodo))]);
    }

    const clearAllCompleted = () => {
        setListCurrentTodo(prevState => prevState.filter(item => {    
            return !item.isCompleted;
        }));
    }

    const completeAllTodo = () => {
        const listCompleted = listCurrentTodo.filter(item => item.isCompleted);
        const flagComplete = listCompleted.length != listCurrentTodo.length;
        listCurrentTodo.forEach(item => item.isCompleted = flagComplete);
        updateTodoList(listCurrentTodo);
    }

    const addTodoItem = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const targetEl = evt.target as HTMLInputElement;
        const todoName = targetEl.value;
        if(evt.key === 'Enter' && todoName.trim()) {
            // add new todo to list after user press on enter button
            const newTodo = {
                type: TodoStatus.Active,
                title: todoName.trim(),
                id: new Date().getTime().toString(),
                isCompleted: false
            };
            setListCurrentTodo(prev => [...prev, newTodo]);
            // reset input value
            targetEl.value = "";
        }
    }

    const onCompleteItem = (evt: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        let index = listCurrentTodo.findIndex(item => {return item.id == todoId});
        if(index > -1) {
            // update new status for todo item
            listCurrentTodo[index].type = evt.target.checked ? TodoStatus.Complete : TodoStatus.Active;
            listCurrentTodo[index].isCompleted = evt.target.checked;
            updateTodoList(listCurrentTodo);
        }
    }

    const onUpdateItem = (evt: React.KeyboardEvent<HTMLInputElement>, todoId: string) => {
        const index = listCurrentTodo.findIndex(item => {return item.id == todoId});
        const newTitle = (evt.target as HTMLInputElement).value.trim();
        if(evt.key === 'Enter' && index > -1 && newTitle) {
            // update new title for todo item after user press on enter button
            listCurrentTodo[index].title = newTitle;
            updateTodoList(listCurrentTodo);
            setEditedTodoId("");
        }
    }

    const onDeleteItem = (todoId: string) => {
        let index = listCurrentTodo.findIndex(item => {return item.id == todoId});
        if(index > -1) {
            // remove todo item from list
            listCurrentTodo.splice(index, 1);
            updateTodoList(listCurrentTodo);
        }
    }

    const renderTodoItems = () => {
        return (
            getListDisplayTodo()
                .map((item) => {
                    return <TodoItem 
                                todoData={item} 
                                key={item.id}
                                onDeleteItem={onDeleteItem} 
                                onCompleteItem={onCompleteItem} 
                                onUpdateItem={onUpdateItem}
                            ></TodoItem>
                })
        );
    }
    
    const renderFooter = () =>  {
        const listDisplayTodo = getListDisplayTodo();
        return `${listDisplayTodo.length} ${listDisplayTodo.length == 1 ? 'item' : 'items'} left!!!`;
    }

    // Your code start here
    return (
        <div className="todo">
            <div className="todo__header">
                <input type="text" 
                    placeholder="What needs to be done ?"
                    className="todo__header--input-title" 
                    onKeyDown={addTodoItem}
                ></input>
                <label className="todo__header--complete-action">
                    <input className="todo__header--complete-checkbox d-none" type="checkbox" onChange={completeAllTodo}></input>
                    <div className="todo__header--complete-text">Complete</div>
                </label>
            </div>
            <div className="todo__body">
                <ul className="todo__list">
                    {listCurrentTodo && renderTodoItems()}
                </ul>
            </div>
            <div className="todo__footer">
                <div className="">{listCurrentTodo && renderFooter()}</div>
                <div className="todo__filter">
                    <button className={`todo__filter--item ${displayType == TodoStatus.All ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.All)}>All</button>
                    <button className={`todo__filter--item ${displayType == TodoStatus.Active ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.Active)}>Active</button>
                    <button className={`todo__filter--item ${displayType == TodoStatus.Complete ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.Complete)}>Complete</button>
                </div>
                <button className="" onClick={clearAllCompleted}>Clear Completed</button>
            </div>
        </div>
    )
    // Your code end here
};

export default TodoList;

