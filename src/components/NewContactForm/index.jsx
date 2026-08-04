import './new-contact-form.styles.css'

export function NewContactForm() {
    return (
        <>
            <h2>Novo Contato</h2>
            <form className='new-contact-form'>
                <div className='text-radio-separator'>
                    <input type="text" placeholder="Nome" />
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
                <input type="email" placeholder="Email" />
                <input type="tel" placeholder="Telefone" />
                <button type="submit" className='new-contact-button'>Adicionar Contato</button>
            </form>
        </>
    )
}