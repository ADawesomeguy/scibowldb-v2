import Head from 'next/head'
import Image from 'next/image'
import { Inter } from '@next/font/google'
import styles from '../styles/Home.module.css'
import SignInButton from '../components/signInButton'
import { useSession } from 'next-auth/react'
import Navbar from "../components/navbar";

const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const { data: session } = useSession()
  let formthing = <></>;
  if (session) {
    formthing = <div className={'flex justify-center'}>
      <form action='/api/uploadPDF' method='post' encType='multipart/form-data'>
        <input id='file' name='file' type='file' />
        <input className={'p-1 rounded'} id='source' type='text' name='source' placeholder='source' />{' '}
        <input className={'bg-slate-600 py-0.5 px-1 rounded'} type='submit' value={'Submit'} />
      </form>
    </div>
  }
  return (
    <>
      <Navbar />
      <main className={'container justify-items-center mx-auto'}>
        {formthing}
      </main>
    </>
  )
}
