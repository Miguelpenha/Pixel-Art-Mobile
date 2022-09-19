import { createStackNavigator } from '@react-navigation/stack'
import { Inavigation } from '../types'
import Home from '../pages/Home'
import Settings from '../pages/Settings'
import CreateArt from '../pages/CreateArt'
import Collection from '../pages/Collection'

function StackRouter() {
    const { Navigator, Screen } = createStackNavigator<Inavigation>()
    
    return (
        <Navigator
            initialRouteName="Home"
            screenOptions={{
                headerShown: false
            }}
        >
            <Screen name="Home" component={Home}/>
            <Screen name="Settings" component={Settings}/>
            <Screen name="CreateArt" component={CreateArt}/>
            <Screen name="Collection" component={Collection}/>
        </Navigator>
    )
}

export default StackRouter