import './field-container.styles.css'

export function FieldContainer({ children }) {
    return (
        <section className='field-container'>
            {children}
        </section>
    )
}