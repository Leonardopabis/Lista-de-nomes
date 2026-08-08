import { useContext, useEffect, useState } from 'react'
import './new-contact-form.styles.css'
import contactContext from '../ContactProvider/ContactContext'

export function NewContactForm() {
    const { handleAddContact } = useContext(contactContext)
    const [errors, setErrors] = useState({
        name: '',
        gender: '',
        email: '',
        phone: '',
    })

    const validateField = (name, value) => {
        let error = ''
        const trimmedValue = value?.toString().trim()
        
        if (name === 'name' && !trimmedValue) {
            error = 'O nome é obrigatório'
        }

        if (name === 'gender' && !value) {
            error = 'O gênero é obrigatório'
        }

        if (name === 'email') {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
            if (!trimmedValue) {
                error = 'O email é obrigatório'
            } else if (!emailRegex.test(trimmedValue)) {
                error = 'Insira um email válido'
            }
        }
        
        const onlyNumbers = /^\d+$/.test(trimmedValue)
        if (name === 'phone' && (!trimmedValue || !onlyNumbers)) {
            if (!Number.isNaN(trimmedValue)){
                phoneRef.current.value = phoneRef.current.value.replace(/[^\d]/g, '')
            }
            error = 'O telefone é obrigatório'
        }

        return error
    }

    function handleChange(event) {
        const {name, value} = event.target
        const fieldError = validateField(name, value)

        setErrors((prev) => ({
            ...prev, [name]: fieldError
        }))
    }

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')?.toString().trim()
        const gender = formData.get('gender')
        const email = formData.get('email')?.toString().trim()
        const phone = formData.get('phone')?.toString().trim()

        
        const currentErrors = {
            name: validateField('name', name),
            gender: validateField('gender', gender),
            email: validateField('email', email),
            phone: validateField('phone', phone),
        }

        const isValid = !Object.values(currentErrors).some(error => error !== '')

        setErrors(currentErrors)

        if (isValid) {
            if (isEditing) {
                handleEditContact(contactId, name, gender, email, phone)
                event.currentTarget.reset()
            } else {

                handleAddContact({ name, gender, email, phone })
                event.currentTarget.reset()
            }
        }
        
        
    }
    
    const {nameRef, genderMaleRef, genderFemaleRef, emailRef, phoneRef, isEditing, setIsEditing, handleEditContact, contactId, setContactId} = useContext(contactContext)

    useEffect(() => {
        if (isEditing === true) {
            setErrors({
                name: '',
                gender: '',
                email: '',
                gender: ''
            })
        }
    }, [isEditing])

    return (
        <>
            <h2>Novo Contato</h2>
            <form className='new-contact-form' onSubmit={(event) => {
                    handleSubmit(event)
            }}>
            <div className="text-radio-separator">
                    <div className="input-field-container">
                        <input type="text" placeholder="Nome" name='name' onChange={handleChange} className={errors.name ? 'input-error-state' : ''} ref={nameRef}/>
                        {errors.name && <p className='error-message'>{errors.name}</p>}
                    </div>

                    <div className="input-field-container">
                        <div className={`input-radio-container ${errors.gender} ? 'input-error-state-radio : ''`}>
                            <div className='input-radio'>
                                <input type="radio" name="gender" value="male" id='male' onChange={handleChange} ref={genderMaleRef}/>
                                <label htmlFor="male">Masculino</label>
                            </div>
                            <div className='input-radio'>
                                <input type="radio" name="gender" value="female" id='female' onCanPlay={handleChange} ref={genderFemaleRef}/>
                                <label htmlFor="female">Feminino</label>
                            </div>
                        </div>
                        {errors.gender && <span className='error-message'>{errors.gender}</span>}
                    </div>
                </div>

                <div className="input-field-container">
                    <input type="email" placeholder="Email" name='email' onChange={handleChange} className={errors.email ? 'input-error-state' : ''} ref={emailRef}/>
                    {errors.email && <span className='error-message'>{errors.email}</span>}
                </div>

                <div className="input-field-container">
                    <input type="tel" placeholder="Telefone" name='phone' onChange={handleChange} className={errors.phone ? 'input-error-state' : ''} ref={phoneRef}/>
                    {errors.phone && <span className='error-message'>{errors.phone}</span>}
                </div>

                <button type="submit" className='new-contact-button'>{isEditing ? 'Editar Contato' : 'Adicionar Contato'}</button>
            </form>
        </>
    )
}