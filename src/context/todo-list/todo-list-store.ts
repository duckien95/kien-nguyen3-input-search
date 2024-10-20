import { create } from 'zustand';
import { useShallow } from 'zustand/shallow';

export interface TodoListStateProps {
    editedTodoId: string;
    isCompletedAll: boolean;
    listIdCompletedAll: string[];
}

const initialState: TodoListStateProps = {
    editedTodoId: "",
    isCompletedAll: false,
    listIdCompletedAll: []
}

export const useTodoListStore = create((set) => ({
    ...initialState,
    setEditedTodoId: (todoId: string) => set({ editedTodoId: todoId }),
    setIsCompletedAll: (flag: boolean) => set({ isCompletedAll: flag }),
    setListIdCompletedAll: (listId: string[]) => set({ listIdCompletedAll: listId }),
    reset: () => set(initialState),
}))