import { useRef, useState } from "react"
import ContactContext from "./ContactContext"

export function ContactProvider({ children }) {
    const [contacts, setContacts] = useState([
        {
            id: 1,
            name: 'John Doe',
            gender: 'male',
            email: 'emailbeeeeeemgraaandeeee@gmail.com',
            phone: '123-456-7890'
        }, {
            id: 2,
            name: 'John Doe 2',
            gender: 'female',
            email: 'john.doe@example.com',
            phone: '123-456-7890'
        }, {
            id: 3,
            name: 'John Doe 3',
            gender: 'male',
            email: 'john.doe@example.com',
            phone: '123-456-7890'
        },
    ])

    const handleAddContact = ({ name, gender, email, phone}) => {
        
        const newContact = {
            id: crypto.randomUUID(),
            name: name,
            gender: gender,
            email: email,
            phone: phone
        }

        setContacts(currentContacts => [
            ...currentContacts, newContact
        ])
        console.log(contacts)
        console.log(newContact)
    }

    const [contactId, setContactId] = useState(null)
    const nameRef = useRef(null)
    const genderMaleRef = useRef(null)
    const genderFemaleRef = useRef(null)
    const phoneRef = useRef(null)
    const emailRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)

    function handleEditContact(id, name, gender, email, phone) {
        const updatedContacts = contacts.map((contact) => {
            if (contact.id === id) {
                return {...contact, name: name, gender:gender, phone:phone, email:email}
            }
            
            return contact
        })
        setContacts(updatedContacts)
        setIsEditing(false)
        setContactId(null)
    }

    function setInputsToEdit(name, gender, email, phone) {
        nameRef.current.value = name
        if (gender === 'male') {
            genderMaleRef.current.checked = true
        } else {
            genderFemaleRef.current.checked = true
        }
        phoneRef.current.value = phone
        emailRef.current.value = email
    }


    return (
        <ContactContext
            value={{
                contacts,
                handleAddContact,
                contactId,
                setContactId,
                nameRef,
                genderMaleRef,
                genderFemaleRef,
                phoneRef,
                emailRef,
                isEditing,
                setIsEditing,
                handleEditContact,
                setInputsToEdit,
            }}>
            {children}
        </ContactContext>
    )
}