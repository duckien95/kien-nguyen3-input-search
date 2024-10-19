import { useState } from "react";
import TodoItem from "./todo-item";
import { TodoStatus } from "../../utils/variables/todo-status";
import { TodoData } from "./inteface/interface-todo-item";

export interface TodoListProps {
    todoList: Array<TodoData>;
}



const TodoList = ({ todoList }: TodoListProps) => {
    console.log('TodoList re-render')

    const [displayType, setDisplayType] = useState(TodoStatus.All);
    const [listCurrentTodo, setListCurrentTodo] = useState<TodoData[]>(todoList);

    const getListDisplayTodo = () => {        
        return listCurrentTodo.filter(item => displayType == TodoStatus.All ||  item.type == displayType);
    }

    const updateTodoList = (listTodo: TodoData[]) => {
        setListCurrentTodo(prevListTodo => [...JSON.parse(JSON.stringify(listTodo))]);
    }

    const clearAllCompleted = () => {
        setListCurrentTodo(prevState => prevState.filter(item => item.type != TodoStatus.Complete));
    }

    const completeAllTodo = () => {

    }

    const addTodoItem = (evt: React.KeyboardEvent<HTMLInputElement>) => {
        const targetEl = evt.target as HTMLInputElement;
        const todoName = targetEl.value;
        if(evt.key === 'Enter' && todoName.trim()) {
            // add new todo to list after user press on enter button
            const newTodo = {
                type: TodoStatus.Active,
                title: todoName.trim(),
                id: new Date().getTime().toString()
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
                <input type="text" onKeyDown={addTodoItem}></input>
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

