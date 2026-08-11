import { useContext } from 'react'
import './contact-card.styles.css'
import contactContext from '../ContactProvider/ContactContext'

export function ContactCard({ contact, isDeleting }) {
    let img = null
    let genero = ''
    if (!contact.image) {
            if (contact.gender === 'male') {
                img = './src/assets/imagemHomem.png'
                genero = 'Masculino'
            } else {
                img = './src/assets/imagemMulher.png'
                genero = 'Feminino'
            }
    } else {
        img = contact.image
    }

    const {setIsEditing, handleEditContact, setContactId, setInputsToEdit, openDialog, setDeleteId} = useContext(contactContext)

    function formatarTelefone(phone) {
        const ddd = phone.slice(0, 2)
        const resto = phone.slice(2)

        if (resto.length === 9) {
            return `(${ddd}) ${resto.slice(0, 5)}-${resto.slice(5)}`
        } else {
            return `(${ddd}) ${resto.slice(0, 4)}-${resto.slice(4)}`
        }
    }

    return (
        <div className='contact-card'>
            <div className='top-part'>
                <img src={img} alt={contact.name} className='foto-contato'/>
                <div>
                    <h3>{contact.name}</h3>
                    <p>{genero}</p>
                </div>
                <div className='right-side'>
                    {!isDeleting && (
                        <>
                            <button onClick={() => {
                                setIsEditing(true)
                                setContactId(contact.id)
                                setInputsToEdit(contact.name, contact.gender, contact.email, contact.phone, contact.image)
                            }}><img src="./src/assets/editImage.png" alt="" /></button>
                            <button onClick={() => {
                                setDeleteId(contact.id)
                                openDialog()
                            }}><img src="./src/assets/deleteImage.png" alt="" /></button>
                        </>
                    )}
                </div>
            </div>
            <div>
                <p>{contact.email}</p>
                <p>{formatarTelefone(contact.phone)}</p>
            </div>
        </div>
    )
}