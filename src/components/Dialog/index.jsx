import { useContext, useEffect, useRef } from 'react'
import './dialog.styles.css'
import contactContext from '../ContactProvider/ContactContext'
import { ContactCard } from '../ContactCard'

export function Dialog() {
    const { isDialogOpen, closeDialog, deleteId } = useContext(contactContext)
    const dialogRef = useRef(null)

    useEffect(() => {
        const dialog = dialogRef.current
        if (!dialog) return

        if (isDialogOpen) {
            if (!dialog.open) dialog.showModal()
        } else {
            if (dialog.open) dialog.close()
        }
    }, [isDialogOpen])

    if (!isDialogOpen) return null

    const contacts = JSON.parse(localStorage.getItem('contacts')) || []
    const deleteContact = contacts.find(contact => contact.id === deleteId)
    
    return (
        <dialog ref={dialogRef} className='deleteDialog' onClose={closeDialog}>
            <h2>Deseja deletar esse contato?</h2>
            <div>
                <ContactCard key={deleteContact.id} contact={deleteContact} isDeleting={true}/>
            </div>
            <div className='delete-btn-container'>
                <button onClick={closeDialog} className='no-button delete-button'>Não</button>
                <button className='yes-button delete-button' onClick={() => {
                    //deletar
                    closeDialog()
                }}>Sim</button>
            </div>
        </dialog>
    )
}