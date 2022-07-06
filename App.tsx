import React, { useState, useEffect } from 'react'
import updateApp from './utils/updateApp'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from './theme'
import Routes from './routes'
import 'react-native-gesture-handler'

function App() {
  const [pronto, setPronto] = useState(false)

  useEffect(() => {
    updateApp().then()
    setPronto(true)
  }, [])
  
  if (!pronto) {
    return <AppLoading/>
  } else {
    return (
      <ThemeProvider>
        <Routes/>
      </ThemeProvider>
    )
  }
}

export default App