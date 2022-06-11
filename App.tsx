import React, { useState, useEffect } from 'react'
import { IthemeType } from './types'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components'
import { dark, light } from './theme'
import { StatusBar } from 'expo-status-bar'
import { getThemeFunction } from './utils/getTheme'
import updateApp from './utils/updateApp'
import 'react-native-gesture-handler'
import Toast from 'react-native-toast-message'
import toastConfig from './toastConfig'
import Routes from './routes'

function App() {
  const [pronto, setPronto] = useState(false)
  const [theme, setTheme] = useState<IthemeType>(null)
  
  useEffect(() => {
    getThemeFunction(setTheme).then()
  }, [theme])

  useEffect(() => {
    getThemeFunction(setTheme).then()
    updateApp().then()
    setPronto(true)
  }, [])
  
  if (!pronto) {
    return <AppLoading/>
  } else {
    return (
      <ThemeProvider theme={theme === 'dark' ? dark : light}>
        <StatusBar
          animated={true}
          style={theme === 'dark' ? 'light' : 'dark'}
        />
        <Routes theme={theme} setTheme={setTheme}/>
        <Toast config={toastConfig}/>
      </ThemeProvider>
    )
  }
}

export default App