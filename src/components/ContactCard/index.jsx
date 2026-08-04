import './contact-card.styles.css'

export function ContactCard({ contact }) {
    let img = ''

    return (
        <div className='contact-card'>
            <img src="" alt="" />
            <h3>{contact.name}</h3>
            <p>{contact.gender}</p>
            <p>{contact.email}</p>
            <p>{contact.phone}</p>
        </div>
    )
}