import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import { NewContactForm } from './components/NewContactForm'
import { ContactList } from './components/ContactList'
import { FieldContainer } from './components/FieldContainer'

function App() {

  let contacts = [
    {
      id: 1,
      name: 'John Doe',
      gender: 'male',
      email: 'john.doe@example.com',
      phone: '123-456-7890'
    }
  ]

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
        <ContactList />
      </FieldContainer>
    </main>
    </>
  )
}

export default App
