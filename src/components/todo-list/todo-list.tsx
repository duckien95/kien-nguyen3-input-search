import TodoItem from "./todo-item";
import { TodoStatus } from "../../utils/variables/todo-status";
import { TodoData } from "./inteface/interface-todo-item";
import { useTodoService } from "../../services/todo-list/useTodo";

export interface TodoListProps {
    todoList: Array<TodoData>;
    placeholder?: string;
    pageTitle?: string;
}

const TodoList: React.FC<TodoListProps> = ({ placeholder, pageTitle = "Todos" }) => {
    console.log('TodoList re-render')

    const { 
        getListDisplayTodo,
        clearAllCompleted,
        completeAllTodo,
        addTodoItem,
        onCompleteItem,
        onUpdateItem,
        onDeleteItem,
        displayType,
        setDisplayType,
        listCurrentTodo
    } = useTodoService([]);

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
            <h1>{pageTitle}</h1>
            <div className="todo__header">
                <input type="text" 
                    placeholder={placeholder}
                    className="todo__header--input-title" 
                    onKeyDown={addTodoItem}
                ></input>
                {
                    !!listCurrentTodo.length &&
                    <div className="todo__header--complete-action">
                        <input id="btn-complete-all-todo" className="todo__header--complete-checkbox d-none" type="checkbox" onChange={completeAllTodo}></input>
                        <label htmlFor="btn-complete-all-todo" className="todo__header--complete-all"></label>
                    </div>
                }
            </div>
            <div className="todo__body">
                <ul className="todo__list">
                    {listCurrentTodo && renderTodoItems()}
                </ul>
            </div>
            {
                !!listCurrentTodo.length && 
                <div className="todo__footer">
                    <div className="">{listCurrentTodo && renderFooter()}</div>
                    <div className="todo__filter">
                        <button className={`todo__filter--item ${displayType == TodoStatus.All ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.All)}>All</button>
                        <button className={`todo__filter--item ${displayType == TodoStatus.Active ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.Active)}>Active</button>
                        <button className={`todo__filter--item ${displayType == TodoStatus.Complete ? 'active' : ''}`} onClick={() => setDisplayType(TodoStatus.Complete)}>Complete</button>
                    </div>
                    <button className="" onClick={clearAllCompleted}>Clear Completed</button>
                </div>
            }
        </div>
    )
    // Your code end here
};

export default TodoList;

