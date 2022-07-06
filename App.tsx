import React, { useState, useEffect } from 'react'
import AppLoading from 'expo-app-loading'
import ThemeProvider from './themeProvider'
import updateApp from './utils/updateApp'
import 'react-native-gesture-handler'
import Routes from './routes'

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