import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { getAuthToken, getContent } from '../lib/api'
import Heading from 'constructicon/heading'
import LoginForm from '../components/LoginForm'
import UpdateContentForm from '../components/UpdateContentForm'
import RichText from 'constructicon/rich-text'
import Section from 'constructicon/section'

const Home = props => {
  const [auth, setAuth] = useState(null)
  const [content, setContent] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    Promise.resolve()
      .then(() => getAuthToken())
      .then(auth => {
        setAuth(auth)
        return getContent(auth, '[[S47:24014:fr_info:6:fr_html]]')
      })
      .then(({ preview }) => setContent(preview))
      .catch(error => Promise.reject(error))
  }, [])

  const refreshContent = data => {
    console.log(data, 'refresh')
    getContent(auth, '[[S47:24014:fr_info:6:fr_html]]').then(({ preview }) => setContent(preview))
  }

  return (
    <div className="container">
      <Head>
        <title>EMC Demo</title>
      </Head>
      <main>
        <Section borderWidth={10} styles={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '40rem' }}>

          {auth && !user && (
            <>
              <RichText children={'<h1>Login as a Event Manager for event 24014 in the qa env to update the website content below.</h1>'} />
              <LoginForm auth={auth} onSuccess={data => setUser(data)} />
            </>
          )}
          {user && (
            <UpdateContentForm onUpdate={data => refreshContent(data)} />
          )}
          {content && (
            <RichText children={content} />
          )}
        </Section>
      </main>
    </div>
  )
}

export default Home
