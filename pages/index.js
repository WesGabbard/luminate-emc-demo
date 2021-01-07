import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import { getAuthToken, getContent, logout } from '../lib/api'
import Button from 'constructicon/button'
import ButtonGroup from 'constructicon/button-group'
import LoginForm from '../components/LoginForm'
import UpdateContentForm from '../components/UpdateContentForm'
import RichText from 'constructicon/rich-text'
import Section from 'constructicon/section'

const Home = props => {
  const [token, setToken] = useState(null)
  const [auth, setAuth] = useState(false)
  const [content, setContent] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    Promise.resolve()
      .then(() => getAuthToken())
      .then(response => {
        setToken(response)
        return getContent(response, '[[S47:24014:fr_info:6:fr_html]]')
      })
      .then(({ preview }) => setContent(preview))
      .catch(error => Promise.reject(error))
  }, [])

  const refreshContent = () => getContent(token, '[[S47:24014:fr_info:6:fr_html]]').then(({ preview }) => setContent(preview))

  const openAuthWindow = () => {
    let authWindow = window.open('https://fundraising.qa.stjude.org/site/TREM?tr.emgmt=em_event_website&mfc_pref=T&fr_id=24014', 'EMC Authenticiation', 'width=100,height=100,status=1')
    setTimeout(() => {
      authWindow.close()
      setAuth(true)
    }, 2000)
  }

  return (
    <div className="container">
      <Head>
        <title>EMC Demo</title>
      </Head>
      <main>
        <Section borderWidth={10} styles={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '40rem' }}>
          <ButtonGroup styles={{ marginBottom: '1rem' }}>
            {user && (
              <Button
                onClick={() => logout(auth).then(() => setUser(null))}
                children='Log me out'
              />
            )}
            {user && !auth && (
              <Button
                onClick={() => openAuthWindow()}
                children='Edit content'
              />
            )}
          </ButtonGroup>
          {token && !user && (
            <>
              <RichText children={'<p>Login as a Event Manager for event 24014 in the qa env.</p>'} />
              <LoginForm auth={token} onSuccess={data => setUser(data)} />
            </>
          )}
          {user && auth && (
            <UpdateContentForm onUpdate={() => refreshContent()} />
          )}
          {content && (
            <Section borderWidth={4} borderColor='primary'>
              <Heading children='Website Content' />
              <RichText children={content} />
            </Section>
          )}
        </Section>
      </main>
    </div>
  )
}

export default Home
