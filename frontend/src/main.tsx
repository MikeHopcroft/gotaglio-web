import React, { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import './index.css'
import App from './components/App.tsx'
import {MockService} from './mocks/service.ts'

const service = new MockService();

createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <App service={service}/>
  // </StrictMode>,
)
