import { FC, Dispatch, SetStateAction } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import { IthemeType, Inavigation } from '../types'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import CreateArt from '../pages/CreateArt'

interface Iprops {
    theme: IthemeType
    setTheme: Dispatch<SetStateAction<IthemeType>>
}

const StackRouter: FC<Iprops> = ({ theme, setTheme }) => {
    const { Navigator, Screen } = createStackNavigator<Inavigation>()

    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Home" component={Home}/>
            <Screen name="Settings">
                {props => 
                    <Settings
                        {...props}
                        theme={theme}
                        setTheme={setTheme}
                    />
                }
            </Screen>
            <Screen name="CreateArt" component={CreateArt}/>
        </Navigator>
    )
}

export default StackRouter