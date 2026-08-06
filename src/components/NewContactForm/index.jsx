import { useContext, useState } from 'react'
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

        if (name === 'phone' && !trimmedValue) {
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
            handleAddContact({ name, gender, email, phone })
            event.currentTarget.reset()
        }
        
        
    }
    

    return (
        <>
            <h2>Novo Contato</h2>
            <form className='new-contact-form' onSubmit={handleSubmit}>
                <div className='text-radio-separator'>
                    <input type="text" placeholder="Nome" name='name' onChange={handleChange}/>
                    {errors.name && <p className='error-message'>{errors.name}</p>}
                    <div className='input-radio-container'>
                        <div className='input-radio'>
                            <input type="radio" name="gender" value="male" id='male'/>
                            <label htmlFor="male">Masculino</label>
                        </div>
                        <div className='input-radio'>
                            <input type="radio" name="gender" value="female" id='female'/>
                            <label htmlFor="female">Feminino</label>
                        </div>
                    </div>
                </div>
                <input type="email" placeholder="Email" name='email'/>
                <input type="tel" placeholder="Telefone" name='phone' />
                <button type="submit" className='new-contact-button'>Adicionar Contato</button>
            </form>
        </>
    )
}