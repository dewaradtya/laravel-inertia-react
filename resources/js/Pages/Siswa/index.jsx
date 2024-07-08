import Layout from '../../Layouts/Layout'
import React from 'react'
import { Head } from '@inertiajs/react'

export default function Welcome() {
  return (
    <Layout>
      <Head title="Siswa" />
      <h1 className='font-bold text-3xl text-red-600'>Data Siswa</h1>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Suscipit, voluptas.</p>
    </Layout>
  )
}