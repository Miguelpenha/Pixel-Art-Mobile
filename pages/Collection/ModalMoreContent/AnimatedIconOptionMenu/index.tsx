import { Itheme } from '../../../../types'
import { FC, useEffect, memo } from 'react'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { ContainerIconOptionMain, IconOptionMain } from './style'
import { MaterialIcons } from '@expo/vector-icons'

interface Iprops {
    onPress: () => void
    color?: keyof Itheme
    colorIcon?: keyof Itheme
    nameIcon: keyof typeof MaterialIcons.glyphMap
}

const AnimatedIconOptionMenu: FC<Iprops> = ({ color, onPress, colorIcon, nameIcon }) => {
    const pressed = useSharedValue(0.8)
    const pressedIcon = useSharedValue(0.8)

    const styleAnimationOptionMain = useAnimatedStyle(() => ({
        transform: [{ scale: pressed.value }]
    }), [])

    const styleAnimationIconOptionMain = useAnimatedStyle(() => ({
        transform: [{ scale: pressedIcon.value }]
    }), [])

    useEffect(() => {
        pressed.value = withTiming(1, {
            duration: 700
        })

        pressedIcon.value = withTiming(1, {
            duration: 1200
        })
    }, [])

    return (
        <Animated.View style={styleAnimationOptionMain}>
            <ContainerIconOptionMain
                color={color}
                onPress={() => {
                    pressed.value = withTiming(0.8, {
                        duration: 100
                    })

                    pressedIcon.value = withTiming(0.8, {
                        duration: 200
                    })
                    
                    setTimeout(onPress, 150)
                }}
                activeOpacity={0.5}
                onPressIn={() => {
                    pressed.value = withTiming(0.8)

                    pressedIcon.value = withTiming(0.8, {
                        duration: 900
                    })
                }}
                onPressOut={() => {
                    pressed.value = withTiming(1)

                    pressedIcon.value = withTiming(1, {
                        duration: 900
                    })
                }}
            >
                <Animated.View style={styleAnimationIconOptionMain}>
                    <IconOptionMain color={colorIcon} name={nameIcon} size={30}/>
                </Animated.View> 
            </ContainerIconOptionMain>
        </Animated.View>
    )
}

export default memo(AnimatedIconOptionMenu)