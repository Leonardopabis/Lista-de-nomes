import { ContactCard } from '../ContactCard'
import './contact-list.styles.css'

export function ContactList({ contacts }) {
    return (
        <div className='contact-list'>
            {contacts.map(contact => {
                if (!contact) return null
                console.log(contact.imageName)
                return (
                    <ContactCard key={contact.id} contact={contact} isDeleting={false}/>
                )
            })}
        </div>
    )
}