import React, { useState } from 'react'
import { Todo } from '../models/Todo'
import { BsCheckCircle, BsCheckCircleFill, BsTrash } from "react-icons/bs"
import { AiOutlineEdit } from "react-icons/ai"
import { Draggable } from 'react-beautiful-dnd'

interface Props {
    todo: Todo,
    index:number,
    removeTodo: (id: number) => void,
    markDone: (id: number) => void,
    editTodo: (id: number, text: string) => void,
}

const SingleTodo: React.FC<Props> = ({ todo, removeTodo, markDone, editTodo,index }: Props) => {
    const [edit, setEdit] = useState<boolean>(false)

    let classes = "cursor-pointer text-xl hover:text-blue-600";
    if (edit) classes = "cursor-pointer text-xl hover:text-blue-600 text-blue-700";

    return (
        <Draggable key={todo.id} draggableId={todo.id.toString()} index={index} >
            {
                (provided) => (
                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}
                        className='single-todo flex justify-between items-center bg-white rounded-md px-3 py-2 font-bold hover:shadow-xl'>
                        {!edit ?
                            (<span className={todo.done ? 'line-through' : ""}>{todo.todo}</span>)
                            : (<input className='w-full border-b focus:outline-none' onKeyDown={(e) => { if (e.key === "Enter") setEdit(false) }} onBlur={() => setEdit(false)} onChange={(e) => editTodo(todo.id, e.target.value)} type={'text'} value={todo.todo} />)
                        }
                        <div className="actions flex items-center gap-3">
                            <AiOutlineEdit onClick={() => setEdit(!edit)} className={classes} />
                            {todo.done ?
                                (<BsCheckCircleFill onClick={() => markDone(todo.id)} className='cursor-pointer text-teal-600 text-xl hover:text-blue-600' />)
                                :
                                (<BsCheckCircle onClick={() => markDone(todo.id)} className='cursor-pointer text-xl hover:text-blue-600' />)
                            }
                            <BsTrash onClick={() => removeTodo(todo.id)} className='cursor-pointer text-xl hover:text-red-600' />
                        </div>
                    </div>
                )
            }
        </Draggable>
    )
}

export default SingleTodo