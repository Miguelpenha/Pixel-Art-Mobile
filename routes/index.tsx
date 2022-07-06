import { useTheme } from 'styled-components'
import { StatusBar } from 'expo-status-bar'
import { NavigationContainer } from '@react-navigation/native'
import { darkThemeRouter, lightThemeRouter } from '../theme/routes'
import StackRouter from './stack.routes'
import Toast from 'react-native-toast-message'
import toastConfig from '../toastConfig'

function Routes() {
  const { name } = useTheme()

  return (
    <>
      <StatusBar
        animated={true}
        style={name === 'dark' ? 'light' : 'dark'}
      />
      <NavigationContainer theme={name === 'dark' ? darkThemeRouter : lightThemeRouter}>
        <StackRouter/>
      </NavigationContainer>
      <Toast config={toastConfig}/>
    </>
  )
}

export default Routes