import React, { useEffect, useState } from 'react'

import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import FormTodo from '../../components/FormTodo';
import ListTodo from '../../components/ListTodo';

const LandingPage = () => {

    const [value, setValue] = useState(0)

    const [activeHeader, setActiveHeader] = useState('todo')
    const [todos, setTodos] = useState()
    const [isChanged, setIsChanged] = useState(false)
    const [showAlert, setShowAlert] = useState(false)
    const [indexTodo, setIndexTodo] = useState(0)

    const [form, setForm] = useState({
        title: "",
        date: "",
        desc: ""
    });

    const handleChangeCb = (e) => {
        const { value, checked } = e.target;
        
        let tempData = todos.map((todo) => 
            todo.id == value ? {...todo, isChecklist : checked} : todo
        )

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
            <div className='bg-white h-5/6 rounded-md w-5/6 mobile:w-full shadow-md'>
                <div className='header-todo px-6 relative h-14 pt-4'>
                    <div className='flex space-x-4 text-sm h-full'>
                        <label onClick={() => selectHeader('todo')} className={`${activeHeader == 'todo' ? 'font-semibold active' : 'font-light'} relative cursor-pointer`}>Todo</label>
                        <label onClick={() => selectHeader('addtodo')} className={`${activeHeader == 'addtodo' ? 'font-semibold active' : 'font-light'} relative cursor-pointer`}>Add Todo</label>
                    </div>
                </div>
                <div className='p-4 h-5/6 landscape-mobile:overflow-scroll no-scrollbar items-center'>
                    <div className='grid grid-cols-6 mobile:grid-cols-1 tablet:grid-cols-1 gap-12 h-full'>
                        <div className='col-span-4 mobile:col-span-1 landscape-phone:col-span-3 landscape-mobile:col-span-1 tablet:col-span-1 overflow-scroll landscape-mobile:overflow-visible no-scrollbar'>
                            {/* section todo */}
                            {activeHeader == 'todo' && <section className='todo-section'>
                                <div className='grid grid-cols-1 gap-6'>
                                    {
                                        todos === undefined
                                        ?   'Loading...'
                                        :   todos.map((todo, index) => (
                                                <ListTodo key={index} todo={todo} index={index} handleChangeCb={handleChangeCb} isChanged={isChanged} listTodos={todos} setActiveHeader={setActiveHeader} setForm={setForm} setIndexTodo={setIndexTodo} setIsChanged={setIsChanged} setShowAlert={setShowAlert}/>
                                            ))
                                    }
                                    
                                </div>
                            </section>}
                            
                            {/* section form todo */}
                            {
                                (activeHeader == 'addtodo' || activeHeader == 'edittodo') && <FormTodo form={form} resetForm={resetForm} setForm={setForm} setIsChanged={setIsChanged} activeHeader={activeHeader} indexTodo={indexTodo} isChanged={isChanged} setShowAlert={setShowAlert} showAlert={showAlert} />
                            }
                        </div>

                        <div className={`col-span-2 mobile:col-span-1 landscape-phone:col-span-3 landscape-mobile:col-span-1 tablet:col-span-1 flex justify-center items-center ${activeHeader == 'addtodo' || activeHeader == 'edittodo' ? 'landscape-mobile:hidden mobile:hidden tablet:hidden' : ''}`}>
                            <div className='w-1/2 tablet:w-4/12'>
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