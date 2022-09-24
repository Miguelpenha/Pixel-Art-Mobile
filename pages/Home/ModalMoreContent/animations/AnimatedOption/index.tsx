import { MaterialIcons } from '@expo/vector-icons'
import { FC } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Container, ContainerIconOption, IconOption, TextOption } from './style'

interface Iprops {
    onPress: () => void
    iconName: keyof typeof MaterialIcons.glyphMap
}

const AnimatedOption: FC<Iprops> = ({ onPress, iconName, children }) => {
    const pressed = useSharedValue(1)

    const styleAnimationPressed = useAnimatedStyle(() => ({
        transform: [{ scale: pressed.value }]
    }), [])

    return (
        <Container 
            onPress={() => {
                pressed.value = withTiming(0.8, {
                    duration: 100
                })
                
                setTimeout(onPress, 150)
            }}
            activeOpacity={0.5}
            onPressIn={() => {
                pressed.value = withTiming(0.8)
            }}
            onPressOut={() => {
                pressed.value = withTiming(1)
            }}
        >
            <Animated.View style={[ContainerIconOption, styleAnimationPressed]}>
                <IconOption name={iconName} size={28}/>
            </Animated.View>
            <TextOption style={styleAnimationPressed}>{children}</TextOption>
        </Container>
    )
}

export default AnimatedOption