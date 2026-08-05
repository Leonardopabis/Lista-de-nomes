import { ContactCard } from '../ContactCard'
import './contact-list.styles.css'

export function ContactList({ contacts }) {
    return (
        <div className='contact-list'>
            {contacts.map(contact => {
                return (
                    <ContactCard key={contact.id} contact={contact} />
                )
            })}
        </div>
    )
}