import React from 'react'
import { Todo } from '../models/Todo'
import SingleTodo from './SingleTodo'
import { DragDropContext, Droppable, DropResult } from 'react-beautiful-dnd'

interface Props {
    todos: Array<Todo>,
    setTodos: React.Dispatch<React.SetStateAction<Todo[]>>
}

const TodoList: React.FC<Props> = ({ todos, setTodos }: Props) => {
    
    const removeTodo = (id: number) => {
        let newTodos: Array<Todo> = todos.filter(t => t.id !== id);
        setTodos(newTodos);
    }

    const markDone = (id: number) => {
        let newTodos: Array<Todo> = todos.map(t => {
            if (t.id === id) {
                t.done = !t.done;
            }
            return t;
        });
        setTodos(newTodos);
    }

    const editTodo = (id: number, text: string) => {
        let newTodos: Array<Todo> = todos.map(t => {
            if (t.id === id) {
                t.todo = text;
            }
            return t;
        });
        setTodos(newTodos);

    }

    const dropHandle = (e: DropResult) => {

        console.log(e);

        // if source distination and index is same return
        if((e.destination?.droppableId === e.source.droppableId) && (e.destination.index === e.source.index)) return

        // auto complete function
        if (e.destination?.droppableId !== e.source.droppableId) {

            if (e.destination?.droppableId === "completedlist") {
                let newTodos: Array<Todo> = todos.map(t => {
                    if (t.id === parseInt(e.draggableId)) {
                        t.done = !t.done;
                    }
                    return t;
                });
                setTodos(newTodos);
            }

            if (e.destination?.droppableId === "activelist") {
                let newTodos: Array<Todo> = todos.map(t => {
                    if (t.id === parseInt(e.draggableId)) {
                        t.done = !t.done;
                    }
                    return t;
                });
                setTodos(newTodos);
            }
        }

        // location shift


    }

    return (
        <DragDropContext onDragEnd={dropHandle} >

            <div className='todo-list flex flex-col gap-4 max-w-md mx-auto mt-8'>
                <Droppable droppableId='activelist'>
                    {
                        (provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className={`active_tods bg-teal-800 p-3 rounded flex flex-col gap-4 ${snapshot.isDraggingOver ? 'bg-teal-900' : ''}`}>
                                <span className='font-bold text-white block'>Active Todos</span>
                                {todos.map((todo, i) => {
                                    if (!todo.done) return (<SingleTodo key={i} index={i} todo={todo} editTodo={editTodo} markDone={markDone} removeTodo={removeTodo} />)
                                })}
                                {provided.placeholder}
                            </div>
                        )
                    }

                </Droppable>

                <Droppable droppableId='completedlist'>
                    {
                        (provided, snapshot) => (
                            <div ref={provided.innerRef} {...provided.droppableProps} className={`active_tods bg-teal-800 p-3 rounded flex flex-col gap-4 ${snapshot.isDraggingOver ? 'bg-teal-900' : ''}`}>
                                <span className='font-bold text-white block '>Completed Todos</span>
                                {todos.map((todo, i) => {
                                    if (todo.done) return (<SingleTodo key={todo.id} index={i} todo={todo} editTodo={editTodo} markDone={markDone} removeTodo={removeTodo} />)
                                })}
                                {provided.placeholder}
                            </div>
                        )
                    }
                </Droppable>



            </div>
        </DragDropContext>
    )
}

export default TodoList