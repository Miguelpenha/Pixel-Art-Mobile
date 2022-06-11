import { FC, Dispatch, SetStateAction } from 'react'
import { IthemeType } from '../types' 
import { NavigationContainer } from '@react-navigation/native'
import { dark, light } from '../theme'
import StackRouter from './stack.routes'

interface Iprops {
    theme: IthemeType
    setTheme: Dispatch<SetStateAction<IthemeType>>
}

const Routes: FC<Iprops> = ({ theme, setTheme }) => {
    return (
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
            <StackRouter theme={theme} setTheme={setTheme}/>
      </NavigationContainer>
    )
}

export default Routes