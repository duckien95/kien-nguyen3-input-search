import { useCallback, useEffect, useState } from "react";
import TodoItem from "./todo-item";

enum Status {
    Active = 'ACTIVE',
    Complete = 'COMPLETE',
    All = 'ALL',
  }

export interface TodoListProps {
    todoList: Array<TodoData>;
    /** On change display type handler */
    onChangeDisplayType: (item: string) => void;
    /** On complete all handler */
    onCompleteAllItem: (item: string) => void;
}

export interface TodoData {
    type: string;
    title: string;
    id: string
}

const TodoList = ({ todoList, onChangeDisplayType, onCompleteAllItem }: TodoListProps) => {
    console.log('TodoList re-render')

    const [displayType, setDisplayType] = useState("all");
    const [listCurrentItem, setListCurrentItem] = useState<TodoData[]>(todoList);

    const getListCurrentItem = useCallback(() => {
        setListCurrentItem(todoList.filter(item => item.type == displayType));
    }, [displayType])

    useEffect(() => {
        setListCurrentItem( todoList.filter(item => item.type == displayType));
    }, [displayType])

    const clearAllCompleted = () => {

    }

    const completeAllTodo = () => {

    }

    const onCompleteItem = (evt: React.ChangeEvent<HTMLInputElement>, todoId: string) => {
        let index = todoList.findIndex(item => {return item.id == todoId});
        if(index > -1 && evt.target.checked) {
            todoList[index].type = Status.Complete;
            getListCurrentItem();
        }
    }

    const onDeleteItem = (todoId: string) => {
        let index = todoList.findIndex(item => {return item.id == todoId});
        if(index > -1) {
            todoList.splice(index, 1);
            getListCurrentItem();
        }
    }

    // Your code start here
    return (
        <div className="todo">
            <div className="todo__header">
                <input onClick={() => {}}></input>
            </div>
            <div className="todo__body">
                {listCurrentItem.map((item) => {
                    return <TodoItem todoData={item} key={item.id} onDeleteItem={onDeleteItem} onCompleteItem={onCompleteItem} onSelectItem={() => {}}></TodoItem>
                })}
            </div>
            <div className="todo__footer">
                <div className="todo__change_type" onClick={clearAllCompleted}>{listCurrentItem.length} {listCurrentItem.length == 1 ? 'item' : 'items'} left!!!</div>
                <div className="todo__change-type" onClick={() => setDisplayType(Status.All)}>All</div>
                <div className="todo__change-type" onClick={() => setDisplayType(Status.Active)}>Active</div>
                <div className="todo__change-type" onClick={() => setDisplayType(Status.Complete)}>Complete</div>
                <div className="todo__change_type" onClick={clearAllCompleted}></div>
            </div>
        </div>
    )
    // Your code end here
};

export default TodoList;

