import React from 'react'
import ReactDOM from 'react-dom'
import ServiceProvider from '@skilltype/services/components/ServiceProvider'
import App from './components/App/App'

ReactDOM.render(
  <ServiceProvider>
    <App />
  </ServiceProvider>,
  document.getElementById('root')
)
