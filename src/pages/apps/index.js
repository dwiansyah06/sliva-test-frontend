import React, { useEffect, useState } from 'react'
import { BsCalendar3 } from "react-icons/bs";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineTrash, HiOutlinePencilAlt } from "react-icons/hi";
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

const LandingPage = () => {

    const [value, setValue] = useState(0)

    const [activeHeader, setActiveHeader] = useState('todo')
    const [todos, setTodos] = useState()
    const [isChanged, setIsChanged] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [errorSave, setErrorSave] = useState(false)
    const [message, setMessage] = useState('')
    const [indexTodo, setIndexTodo] = useState(0)

    const [form, setForm] = useState({
        title: "",
        date: "",
        desc: ""
    });

    const handleChangeForm = (e) => {
        let data = { ...form };
        data[e.target.name] = e.target.value;
        setForm(data);
    };

    const handleChangeCb = (e) => {
        const { value, checked } = e.target;
        
        let tempData = todos.map((todo) => 
            todo.id == value ? {...todo, isChecklist : checked} : todo
        )

        // setTodos(tempData)
        localStorage.setItem('todo', JSON.stringify(tempData))
        setIsChanged(!isChanged)
    }

    const resetForm = () => {
        setForm({
            title: "",
            date: "",
            desc: ""
        });
    };

    const selectHeader = (param) => {
        setActiveHeader(param)
        if(param == 'addtodo') {
            resetForm()
            setShowAlert(false)
        }
    }

    const saveTodo = () => {
        if(form.title === '' || form.date === '') {
            setMessage('Title dan tanggal tidak boleh kosong')
            setErrorSave(true)
            setShowAlert(true)
        } else {
            if(activeHeader == 'addtodo') {
                if(localStorage.getItem('todo') == null) {
                    let todos = []
                    form.id = 1
                    form.isChecklist = false
                    todos.push(form)
                    localStorage.setItem('todo', JSON.stringify(todos))
                } else {
                    const todos = JSON.parse(localStorage.getItem('todo'))
                    form.id = todos.length + 1
                    form.isChecklist = false
                    todos.push(form)
                    localStorage.setItem('todo', JSON.stringify(todos))
                }
                
                resetForm()
                setMessage('Data berhasil disimpan')
                
            } else {
                const todos = JSON.parse(localStorage.getItem('todo'))
                todos[indexTodo].title = form.title
                todos[indexTodo].date = form.date
                todos[indexTodo].desc = form.desc

                localStorage.setItem('todo', JSON.stringify(todos))

                setMessage('Data berhasil diubah')
            }
            
            setIsChanged(!isChanged)
            setErrorSave(false)
            setShowAlert(true)
        }
    }

    const deleteTodo = (index) => {
        const todos = JSON.parse(localStorage.getItem('todo'))
        todos.splice(index, 1);

        localStorage.setItem('todo', JSON.stringify(todos))
        setIsChanged(!isChanged)
    }

    const showTodo = (id, index) => {
        const foundData = todos.find((todo) => todo.id === id);

        setIndexTodo(index)
        setForm({
            title: foundData.title,
            date: foundData.date,
            desc: foundData.desc
        });

        setShowAlert(false)
        setActiveHeader('edittodo')
    }

    useEffect(() => {

        const getTodo = () => {
            if(localStorage.getItem('todo') == null) {
                setTodos([])
            } else {
                setTodos(JSON.parse(localStorage.getItem('todo')))
            }
        }

        const getPercent = () => {
            if(localStorage.getItem('todo') == null) {
                setValue(0)
            } else {
                const todos = JSON.parse(localStorage.getItem('todo'))
                const patokan = 100 / todos.length
                const array = []

                todos.map((todo) => {
                    if(todo.isChecklist) {
                        array.push(todo.id)
                    }
                })

                const finalResult = array.length * patokan
                setValue(finalResult.toFixed(1))
            }
        }

        getTodo()
        getPercent()
    }, [isChanged])

    return (
        <div className='h-screen flex justify-center items-center px-4'>
            <div className='bg-white h-5/6 rounded-md w-5/6 shadow-md'>
                <div className='header-todo px-6 relative h-14 pt-4'>
                    <div className='flex space-x-4 text-sm h-full'>
                        <label onClick={() => selectHeader('todo')} className={`${activeHeader == 'todo' ? 'font-semibold active' : 'font-light'} relative cursor-pointer`}>Todo</label>
                        <label onClick={() => selectHeader('addtodo')} className={`${activeHeader == 'addtodo' ? 'font-semibold active' : 'font-light'} relative cursor-pointer`}>Add Todo</label>
                    </div>
                </div>
                <div className='p-4 h-5/6 items-center'>
                    <div className='grid grid-cols-6 gap-12 h-full'>
                        <div className='col-span-4 overflow-scroll no-scrollbar'>
                            {/* section todo */}
                            {activeHeader == 'todo' && <section className='todo-section'>
                                <div className='grid grid-cols-1 gap-6'>
                                    {
                                        todos === undefined
                                        ?   'Loading...'
                                        :   todos.map((todo, index) => (
                                                <>
                                                    <table key={index}>
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
                                            ))
                                    }
                                    
                                </div>
                            </section>}

                            {
                                (activeHeader == 'addtodo' || activeHeader == 'edittodo') && <section className='addtodo-section'>
                                    {showAlert && <div className={`py-3 px-4 ${errorSave ? 'bg-red-600' : 'bg-blue-600'} text-white text-sm font-light rounded-md`}>{message}</div>}
                                    <div className='flex flex-col space-y-1'>
                                        <label className='text-xs font-semibold'>Title Todo</label>
                                        <input className='py-3 px-4 border-[1px] border-[#eeecf4] rounded-lg text-sm font-light' name='title' value={form.title} onChange={handleChangeForm} placeholder='Enter Title Todo'/>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <label className='text-xs font-semibold'>Due Date</label>
                                        <input type="date" className='py-3 px-4 border-[1px] border-[#eeecf4] rounded-lg text-sm font-light' name='date' value={form.date} onChange={handleChangeForm}/>
                                    </div>
                                    <div className='flex flex-col space-y-1'>
                                        <label className='text-xs font-semibold'>Description</label>
                                        <textarea className='py-3 px-4 border-[1px] border-[#eeecf4] rounded-lg text-sm font-light h-[150px] resize-none' name='desc' value={form.desc} onChange={handleChangeForm}></textarea>
                                    </div>
                                    <div className='flex justify-end'>
                                        <div className='flex space-x-2'>
                                            <button onClick={resetForm} className='py-2 px-4 bg-red-700 text-white text-sm rounded-md font-light hover:bg-red-800'>Reset</button>
                                            <button onClick={saveTodo} className='py-2 px-4 bg-blue-600 text-white text-sm rounded-md font-light hover:bg-blue-700'>Save</button>
                                        </div>
                                    </div>
                                </section>
                            }
                        </div>

                        <div className='col-span-2 flex justify-center items-center'>
                            <div className='w-1/2'>
                                <CircularProgressbar 
                                    value={value}
                                    text={`${value}%`}
                                    strokeWidth={4}
                                    styles={buildStyles({
                                        // This is in units relative to the 100x100px
                                        // SVG viewbox.
                                        textSize: "10px"
                                    })}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default LandingPage