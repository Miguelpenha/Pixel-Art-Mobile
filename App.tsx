import React, { useState, useEffect } from 'react'
import { Inavigation } from './types'
import { createStackNavigator } from '@react-navigation/stack'
import AppLoading from 'expo-app-loading'
import { ThemeProvider } from 'styled-components'
import { dark, light } from './theme'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import Home from './pages/Home'
import Settings from './pages/Settings'
import { getThemeFunction } from './utils/getTheme'
import updateApp from './utils/updateApp'
import 'react-native-gesture-handler'

type IthemeType = 'light' | 'dark'

function App() {
  const [pronto, setPronto] = useState(false)
  const [theme, setTheme] = useState<IthemeType>(null)
  const { Navigator, Screen } = createStackNavigator<Inavigation>()
  
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
        <NavigationContainer theme={theme === 'dark' ? {
          colors: {
            background: dark.backgroundColor,
            border: dark.color,
            card: dark.primary,
            notification: dark.secondary,
            primary: dark.primary,
            text: dark.color
          },
          dark: true
        } : {
          colors: {
            background: light.backgroundColor,
            border: light.color,
            card: light.primary,
            notification: light.secondary,
            primary: light.primary,
            text: light.color
          },
          dark: false
        }}>
          <Navigator screenOptions={{
            headerShown: false
          }} initialRouteName="Home">
            <Screen name="Home" component={Home}/>
            <Screen name="Settings">
              {props => 
                <Settings
                  {...props}
                  setTheme={setTheme}
                  theme={theme}
                />
              }
            </Screen>
          </Navigator>
        </NavigationContainer>
      </ThemeProvider>
    )
  }
}

export default App