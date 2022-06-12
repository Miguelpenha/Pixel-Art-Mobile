import { FC, Dispatch, SetStateAction } from 'react'
import { IthemeType } from '../types' 
import { NavigationContainer } from '@react-navigation/native'
import { darkThemeRouter, lightThemeRouter } from './themeRouter'
import StackRouter from './stack.routes'

interface Iprops {
    theme: IthemeType
    setTheme: Dispatch<SetStateAction<IthemeType>>
}

const Routes: FC<Iprops> = ({ theme, setTheme }) => {
    return (
        <NavigationContainer
          theme={theme === 'dark' ? darkThemeRouter : lightThemeRouter}
        >
          <StackRouter theme={theme} setTheme={setTheme}/>
      </NavigationContainer>
    )
}

export default Routes