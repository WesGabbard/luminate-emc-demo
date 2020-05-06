import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import axios from "axios";

import Container from 'constructicon/container'
import Heading from 'constructicon/heading'
import LoginForm from '../components/LoginForm'
import Section from 'constructicon/section'


const Home = props => {
  const [fetchedTitle, setFetchedTitle] = useState({})
  const [loginResults, setLoginResults] = useState(null)
  useEffect(() => {
    Promise.resolve()
      .then(() => axios.get('http://localhost:3000/api/get-title?url=https://fundraising.qa.stjude.org/site/TR/Walk/Walk?fr_id=24014&pg=entry'))
      .then(response => setFetchedTitle(response.data))
      .catch(error => Promise.reject(error))
  }, [])

  return (
    <div className="container">
      <Head>
        <title>EMC Scrapper</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Section borderWidth={10} styles={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '100%', maxWidth: '30rem' }}>

          <Heading>
            Login to the EMC for ... <br />
            {fetchedTitle && <span>{fetchedTitle.data}</span>}
          </Heading>

          <LoginForm />
        </Section>
      </main>
    </div>
  )
}

export default Home
