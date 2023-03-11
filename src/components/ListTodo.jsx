import React from 'react'
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";

const ListTodo = ({todo, index, handleChangeCb, setIsChanged, isChanged, listTodos, setIndexTodo, setForm, setShowAlert, setActiveHeader}) => {

    const deleteTodo = (index) => {
        var result = window.confirm("Want to delete?");
        if (result) {
            const todos = JSON.parse(localStorage.getItem('todo'))
            todos.splice(index, 1);

            if(todos.length === 0) {
                localStorage.removeItem('todo')
            } else {
                localStorage.setItem('todo', JSON.stringify(todos))
            }
            
            setIsChanged(!isChanged)
        }
        
    }

    const showTodo = (id, index) => {
        const foundData = listTodos.find((todo) => todo.id === id);

        setIndexTodo(index)
        setForm({
            title: foundData.title,
            date: foundData.date,
            desc: foundData.desc
        });

        setShowAlert(false)
        setActiveHeader('edittodo')
    }

    return (
        <>
            <table>
                <tbody>
                    <tr>
                        <td className='w-[6%] align-top'>
                            <input type="checkbox" value={todo.id} checked={todo?.isChecklist || false} onChange={handleChangeCb} />
                        </td>
                        <td>
                            <div className='todo-content'>
                                <div className='w-full'>
                                    <div className='flex justify-between space-x-4'>
                                        <h4 className={`${todo.isChecklist ? 'line-through' : ''}`}>{todo.title}</h4>
                                        <div className='flex-none'>
                                            <div className='flex space-x-2'>
                                                <button onClick={() => deleteTodo(index)} disabled={todo.isChecklist ? true : false}><HiOutlineTrash className={`text-lg cursor-pointer ${todo.isChecklist ? 'text-[#dddddd]' : ''}`}/></button>
                                                <button onClick={() => showTodo(todo.id, index)} disabled={todo.isChecklist ? true : false}><HiOutlinePencilAlt className={`text-lg cursor-pointer ${todo.isChecklist ? 'text-[#dddddd]' : ''}`}/></button>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <p className={`${todo.isChecklist ? 'line-through' : ''}`}>{todo.desc}</p>
                                </div>
                                <div className={`todo-info ${todo.isChecklist ? 'line-through' : ''}`}>
                                    <div className='flex space-x-2 items-center'>
                                        <BsCalendar3/>
                                        <label className='text-xs font-light'>{todo.date}</label>
                                    </div>
                                    <div className='flex space-x-2 items-center'>
                                        <AiOutlineUser/>
                                        <label className='text-xs font-light'>John Doe</label>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
            <hr className='bg-[#eeecf4] h-[1px] w-full' />
        </>
    )
}

export default ListTodo