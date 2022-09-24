import { useNavigation } from '@react-navigation/native'
import Animation, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Container, ContainerSettings, Settings, ContainerCollection, Collection, Title } from './style'
import { memo, useEffect } from 'react'

function Header() {
    const navigation = useNavigation()
    const pressed = useSharedValue(1)
    const show = useSharedValue(0.4)
    const showScale = useSharedValue(0.6)

    const styleAnimationContainerCollection = useAnimatedStyle(() => ({
        transform: [{ scale: pressed.value }]
    }))

    const styleAnimationTitle = useAnimatedStyle(() => ({
        opacity: show.value,
        transform: [{ scale: showScale.value }]
    }))

    useEffect(() => {
        setTimeout(() => {
            show.value = withTiming(1)
            showScale.value = withTiming(1)
        }, 500)
    }, [])

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
        <Title style={styleAnimationTitle}>Pixel Art</Title>
    </>
}

export default memo(Header)