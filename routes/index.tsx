import { useTheme } from 'styled-components'
import { NavigationContainer } from '@react-navigation/native'
import { darkThemeRouter, lightThemeRouter } from './themeRouter'
import StackRouter from './stack.routes'
import { StatusBar } from 'expo-status-bar'
import Toast from 'react-native-toast-message'
import toastConfig from '../toastConfig'

function Routes() {
  const theme = useTheme()

  return (
    <>
      <StatusBar
        animated={true}
        style={theme.name === 'light' ? 'dark' : 'light'}
      />
      <NavigationContainer
        theme={theme.name === 'dark' ? darkThemeRouter : lightThemeRouter}
      >
        <StackRouter/>
      </NavigationContainer>
      <Toast config={toastConfig}/>
    </>
  )
}

export default Routes