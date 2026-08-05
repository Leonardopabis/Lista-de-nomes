import { useContext, useState } from 'react'
import './new-contact-form.styles.css'
import contactContext from '../ContactProvider/ContactContext'

export function NewContactForm() {
    const { handleAddContact } = useContext(contactContext)
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        phone: '',
    })

    function handleSubmit(event) {
        event.preventDefault()

        const formData = new FormData(event.currentTarget)
        const name = formData.get('name')?.toString().trim()
        const gender = formData.get('gender')
        const email = formData.get('email')?.toString().trim()
        const phone = formData.get('phone')?.toString().trim()

        const currentErrors = { name: '', email: '', phone: ''}
        let isValid = true

        if (!name) {
            currentErrors.name = 'O nome é obrigatório'
            isValid = false
        }
    }
    

    return (
        <>
            <h2>Novo Contato</h2>
            <form className='new-contact-form' onSubmit={handleAddContact}>
                <div className='text-radio-separator'>
                    <input type="text" placeholder="Nome" name='name' />
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