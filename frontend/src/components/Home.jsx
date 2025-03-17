import React from 'react'
import Header from './Header'
import {Plus} from 'lucide-react'
import { Link } from 'react-router-dom'
import ContactList from './ContactList'

function Home() {

  return (
    <div className='w-screen'>
        <div>
            <Header name="Contact Manager" />
        </div>
        <div className='mt-5 ml-2 p-2 rounded-full flex justify-end'>
            <Link className='border-black bg-black rounded-full p-2' to='/add-contact'>
                <Plus className='text-white' />
            </Link>
        </div>
        <div>
            <ContactList />
        </div>
    </div>
  )
}

export default Home