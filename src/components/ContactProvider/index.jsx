import { useEffect, useRef, useState } from "react"
import ContactContext from "./ContactContext"

export function ContactProvider({ children }) {
    const [contacts, setContacts] = useState(() => {
        const savedContacts = localStorage.getItem('contacts')
        if (savedContacts) {
            return JSON.parse(savedContacts)
        } else {
            return []
        }
    })

    useEffect(() => {
        localStorage.setItem('contacts', JSON.stringify(contacts))
    }, [contacts])

    const handleAddContact = ({ name, gender, email, phone, image}) => {
        
        const newContact = {
            id: crypto.randomUUID(),
            name: name,
            gender: gender,
            email: email,
            phone: phone,
            image: image,
        }

        setContacts(currentContacts => [
            ...currentContacts, newContact
        ])
    }

    const [contactId, setContactId] = useState(null)
    const nameRef = useRef(null)
    const genderMaleRef = useRef(null)
    const genderFemaleRef = useRef(null)
    const phoneRef = useRef(null)
    const emailRef = useRef(null)
    const [isEditing, setIsEditing] = useState(false)
    const imageRef = useRef(null)

    function handleEditContact(id, name, gender, email, phone, image) {
        const updatedContacts = contacts.map((contact) => {
            if (contact.id === id) {
                return {...contact, name: name, gender:gender, phone:phone, email:email, image:image}
            }
            
            return contact
        })
        setContacts(updatedContacts)
        setIsEditing(false)
        setContactId(null)
    }

    const [editingImage, setEditingImage] = useState(null)
    const [editingImageName, setEditingImageName] = useState('Nenhum arquivo selecionado')

    function setInputsToEdit(name, gender, email, phone, image, imageName) {
        nameRef.current.value = name
        if (gender === 'male') {
            genderMaleRef.current.checked = true
        } else {
            genderFemaleRef.current.checked = true
        }
        phoneRef.current.value = phone
        emailRef.current.value = email
        setEditingImage(image)
        setEditingImageName(imageName || (image ? imageName : "Nenhum arquivo selecionado"))
        
        if (imageRef.current) {
            imageRef.current.value = ''
        }
    }

    const [deleteId, setDeleteId] = useState(null)
    const [isDialogOpen, setIsDialogOpen] = useState(false)
    const openDialog = () => setIsDialogOpen(true)
    const closeDialog = () => {
        setIsDialogOpen(false)
        setDeleteId(null)
    }

    function deleteContact(id) {
        setContacts(currentContacts => 
            currentContacts.filter(contact => contact.id !== id)
        )
        setDeleteId(null)
    }

    const [fotoImage, setFotoImage] = useState(null)

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
                imageRef,
                isEditing,
                setIsEditing,
                handleEditContact,
                setInputsToEdit,
                isDialogOpen,
                openDialog,
                closeDialog,
                deleteId,
                setDeleteId,
                deleteContact,
                editingImage,
                setEditingImage,
                fotoImage,
                setFotoImage,
                editingImageName,
                setEditingImageName
            }}>
            {children}
        </ContactContext>
    )
}