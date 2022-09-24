import { Ipixel } from '../../../types'
import { Dispatch, SetStateAction, FC, useEffect, memo } from 'react'
import { useTheme } from 'styled-components'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withSpring, withTiming } from 'react-native-reanimated'
import { Container } from './style'

interface Iprops {
    pixel: Ipixel
    pixels: Ipixel[]
    pixelsCount: number
    colorSelect: string
    setPixels: Dispatch<SetStateAction<Ipixel[]>>
}

const Pixel: FC<Iprops> = ({ pixel, pixelsCount, colorSelect, pixels, setPixels }) => {
    const theme = useTheme()
    const pixelSizes = Math.sqrt(pixelsCount)
    const scale = useSharedValue(0.85)
    
    const styleAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }), [scale])

    useEffect(() => {
        scale.value = withSequence(
            withSpring(0.85),
            withSpring(1)
        )
    }, [])

    return (
        <Animated.View style={styleAnimation}>
            <Container
                pixel={pixel}
                activeOpacity={0.5}
                pixelSizes={pixelSizes}
                onPressOut={() => scale.value = withTiming(1)}
                onPressIn={() => scale.value = withTiming(0.85)}
                onPress={() => {
                    scale.value = withSequence(
                        withTiming(0.85, {
                            duration: 100
                        }),
                        withTiming(1, {
                            duration: 100
                        })
                    )
                    
                    const pixelsBrutos: Ipixel[] = []
                    
                    pixels.map(pixelBruto => {
                        if (pixelBruto.id === pixel.id) {
                            pixelsBrutos.push({
                                id: pixel.id,
                                color: pixelBruto.color === colorSelect ? theme.secondary : colorSelect
                            })
                        } else {
                            pixelsBrutos.push(pixelBruto)
                        }
                    })
            
                    setPixels(pixelsBrutos)
                }}
            />
        </Animated.View>
    )
}

export default memo(Pixel)