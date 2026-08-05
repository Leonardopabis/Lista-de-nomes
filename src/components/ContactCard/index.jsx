import './contact-card.styles.css'

export function ContactCard({ contact }) {
    let img = null
    let genero = ''

    if (contact.gender === 'male') {
        img = './src/assets/imagemHomem.png'
        genero = 'Masculino'
    } else {
        img = './src/assets/imagemMulher.png'
        genero = 'Feminino'
    }

    return (
        <div className='contact-card'>
            <div className='top-part'>
                <img src={img} alt={contact.name} />
                <div>
                    <h3>{contact.name}</h3>
                    <p>{genero}</p>
                </div>
                <div className='right-side'>
                    <button><img src="./src/assets/editImage.png" alt="" /></button>
                    <button><img src="./src/assets/deleteImage.png" alt="" /></button>
                </div>
            </div>
            <div>
                <p>{contact.email}</p>
                <p>{contact.phone}</p>
            </div>
        </div>
    )
}