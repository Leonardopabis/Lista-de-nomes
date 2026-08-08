import { useContext, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { NewContactForm } from './components/NewContactForm'
import { ContactList } from './components/ContactList'
import { FieldContainer } from './components/FieldContainer'
import contactContext from './components/ContactProvider/ContactContext'

function App() {
  const {contacts} = useContext(contactContext)

  return (
    <>
    <header>
      <h1>Lista de contatos</h1>
    </header>
    <main>
      <FieldContainer>
        <NewContactForm />
      </FieldContainer>
      <FieldContainer>
        <ContactList contacts={contacts} />
      </FieldContainer>
      <Dialog />
    </main>
    </>
  )
}

export default App
