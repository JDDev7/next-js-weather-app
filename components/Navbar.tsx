"use client"

import Link from 'next/link'
import React from 'react'
import { Bars3BottomRightIcon, XMarkIcon, CloudIcon } from '@heroicons/react/24/solid';
import styles from '@/components/Navbar.module.css'
//TODO: Cambiar estilos por styles

const Navbar = () => {


  const [isOpen, setIsOpen] = React.useState(false)

  const toggleMenu = () => {
    setIsOpen(!isOpen)
  }


  return (
    <nav className={styles.navbar}>
        <div className={styles.navbarLogoContainer}>
          <div className='flex flex-row justify-center items-center'>
          {<CloudIcon className='w-6 h-6'/>}
            <h1>JDWeather</h1></div>
            <p className='px-5'>¡Tu clima en un click!</p>
        </div>
        <div className={styles.navbarMenuButton} onClick={toggleMenu}>
            {isOpen ? <XMarkIcon className='h-6 w-6' /> : <Bars3BottomRightIcon className='h-6 w-6' />}
        </div>
        <div className={`${styles.navbarLinks} ${isOpen ? `${styles.open}` : ''}`}>
            <Link href="/">Inicio</Link>
            <Link href="/about">Sobre nosotros</Link>
            <Link href="https://github.com">Github</Link>
        </div>
    </nav>
  )
}

export default Navbar