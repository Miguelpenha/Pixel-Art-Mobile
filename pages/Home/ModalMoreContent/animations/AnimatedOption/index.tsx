import { MaterialIcons } from '@expo/vector-icons'
import { StyleProp, ViewStyle } from 'react-native'
import Animated, { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'
import { FC } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Option, ContainerIconOption, IconOption, TextOption } from './style'

interface Iprops {
    onPress: () => void
    iconName: keyof typeof MaterialIcons.glyphMap
    animation: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
}

const AnimatedOption: FC<Iprops> = ({ animation, onPress, iconName, children }) => {
    const pressed = useSharedValue(1)
    const textAnimation = useSharedValue(RFPercentage(3.2))

    const styleAnimationPressed = useAnimatedStyle(() => ({
        transform: [{ scale: pressed.value }]
    }), [])

    return (
        <Animated.View style={animation}>
            <Option 
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
            </Option>
        </Animated.View>
    )
}

export default AnimatedOption