import React, { useState } from 'react';
import InputField from './components/InputField';
import TodoList from './components/TodoList';
import { Todo } from './models/Todo';

const App: React.FC = () => {

  const [todo, setTodo] = useState<string>("")
  const [todos, setTodos] = useState<Array<Todo>>([])

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();

    if (!todo) return; // do noting if the todo field is empty

    let new_todo: Todo = {
      id: Date.now(),
      todo: todo,
      done: false      
    }

    // sorting
    let sorted_todos: Array<Todo> = [...todos, new_todo].sort((a: Todo, b: Todo) => {
      return a.id < b.id ? 1 : -1;
    })

    setTodos([...todos,new_todo]);
    setTodo("");
  }; 

  return (
    <div className="App font-neucha w-full min-h-screen bg-teal-700 pt-5">
      <span className='uppercase text-4xl text-white block text-center'>Taskify</span>
      <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
      <TodoList todos={todos} setTodos={setTodos} />
    </div>
  );
}

export default App;
