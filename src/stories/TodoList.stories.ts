import type { Meta, StoryObj } from '@storybook/react';
import TodoList from '../components/Todo/todo-list';

const meta: Meta<typeof TodoList> = {
    title: 'Example/TodoList',
    component: TodoList,
    parameters: {
      // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/configure/story-layout
      layout: 'centered',
    },
    // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
    tags: ['autodocs'],
};
export default meta;

type Story = StoryObj<typeof meta>;
 
export const Primary: Story = {
    args: {
      todoList: [],
      placeholder: "What needs to be done ?"
    },
  };