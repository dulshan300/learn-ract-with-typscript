import React, { useState } from 'react'

interface Props {
    todo: string;
    setTodo: React.Dispatch<React.SetStateAction<string>>;
    handleAdd: (e: React.FormEvent) => void;
}

const InputField: React.FC<Props> = ({ todo, setTodo, handleAdd }: Props) => {

    const [focused, setFocused] = useState<boolean>(false)

    return (
        <>
            {focused ? (<div className="fixed left-0 top-0 w-full h-screen bg-black/60 z-0"></div>) : ""}
            <form
                className='bg-white max-w-md mx-auto mt-8 rounded-3xl overflow-hidden shadow-lg relative'
                onSubmit={handleAdd}
                onFocus={() => setFocused(true)}
                onBlur={() => setFocused(false)}
            >
                <div className="flex items-center gap-1 z-10 relative">
                    <input value={todo} onChange={(e) => setTodo(e.target.value)} type={'text'} className="w-full text-xl py-2 px-4 focus:outline-none" placeholder='Enter a Todo' />
                    <button className='bg-teal-800 text-white rounded-full w-[35px] h-[35px] mr-1 transition-all hover:bg-teal-600'>Go</button>
                </div>
            </form>
        </>
    )
}

export default InputField