import React from 'react'
import App from 'next/app'
import getConfig from 'next/config'
import TraitsProvider from 'constructicon/traits-provider'
import * as traits from '../lib/traits'
import 'minimal.css'

const { publicRuntimeConfig } = getConfig()

class MyApp extends App {
  render() {
    const { Component } = this.props
    return (
      <div>
        <TraitsProvider traits={traits}>
          <Component {...publicRuntimeConfig} />
        </TraitsProvider>
      </div>
    )

  }
}

export default MyApp
