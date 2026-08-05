import { useState } from "react"
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

    const handleAddContact = (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        const name = formData.get('name')
        const gender = formData.get('gender')
        const email = formData.get('email')
        const phone = formData.get('phone')

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


    return (
        <ContactContext
            value={{
                contacts,
                handleAddContact,
            }}>
            {children}
        </ContactContext>
    )
}