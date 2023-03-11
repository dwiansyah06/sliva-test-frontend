import React, { useState } from 'react'

const FormTodo = ({ form, setForm, resetForm, setIsChanged, activeHeader, indexTodo, isChanged, setShowAlert, showAlert }) => {

    
    const [errorSave, setErrorSave] = useState(false)
    const [message, setMessage] = useState('')

    const handleChangeForm = (e) => {
        let data = { ...form };
        data[e.target.name] = e.target.value;
        setForm(data);
    };

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

    return (
        <section className='addtodo-section landscape-mobile:pb-4'>
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
                    <button onClick={() => resetForm()} className='py-2 px-4 bg-red-700 text-white text-sm rounded-md font-light hover:bg-red-800'>Reset</button>
                    <button onClick={saveTodo} className='py-2 px-4 bg-blue-600 text-white text-sm rounded-md font-light hover:bg-blue-700'>Save</button>
                </div>
            </div>
        </section>
    )
}

export default FormTodo