export interface TodoData {
    type: string;
    title: string;
    id: string;
    isCompleted: boolean;
}

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

export interface TodoListProps {
    todoList: Array<TodoData>;
    placeholder?: string;
    pageTitle?: string;
}

export interface TodoListStateProps {
    editedTodoId: string;
    isCompletedAll: boolean;
    listIdCompletedAll: string[];
}