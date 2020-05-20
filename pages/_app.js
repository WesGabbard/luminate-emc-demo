import React from 'react'
import App from 'next/app'
import TraitsProvider from 'constructicon/traits-provider'
import * as traits from '../lib/traits'
import 'minimal.css'

class MyApp extends App {
  render() {
    const { Component } = this.props
    return (
      <div>
        <TraitsProvider traits={traits}>
          <Component />
        </TraitsProvider>
      </div>
    )

  }
}

export default MyApp
