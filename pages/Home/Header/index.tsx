import { useNavigation } from '@react-navigation/native'
import Animation, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Container, ContainerSettings, Settings, ContainerCollection, Collection, Title } from './style'
import { memo } from 'react'

function Header() {
    const navigation = useNavigation()
    const pressed = useSharedValue(1)

    const styleAnimationContainerCollection = useAnimatedStyle(() => ({
        transform: [{ scale: pressed.value }]
    }))

    return <>
        <Container>
            <ContainerSettings onPress={() => navigation.navigate('Settings')}>
                <Settings name="settings" size={40}/>
            </ContainerSettings>
            <ContainerCollection
                onPress={() => {
                    pressed.value = withTiming(0.8, {
                        duration: 100
                    })
                    
                    setTimeout(() => {
                        navigation.navigate('Collection')

                        pressed.value = withTiming(1, {
                            duration: 100
                        })
                    }, 100)
                }}
                activeOpacity={0.5}
                onPressOut={() => pressed.value = withTiming(1)}
                onPressIn={() => pressed.value = withTiming(0.8)}
            >
                <Animation.View style={styleAnimationContainerCollection}>
                    <Collection name="bookmark" size={40}/>
                </Animation.View>
            </ContainerCollection>
        </Container>
        <Title>Pixel Art</Title>
    </>
}

export default memo(Header)