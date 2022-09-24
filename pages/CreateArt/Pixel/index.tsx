import { Ipixel } from '../../../types'
import { Dispatch, SetStateAction, FC, useEffect, memo } from 'react'
import { useTheme } from 'styled-components'
import Animated, { useAnimatedStyle, useSharedValue, withTiming, withSequence } from 'react-native-reanimated'
import { Container } from './style'

interface Iprops {
    pixel: Ipixel
    pixels: Ipixel[]
    pixelsCount: number
    colorSelect: string
    loadingCreate: boolean
    setPixels: Dispatch<SetStateAction<Ipixel[]>>
}

const Pixel: FC<Iprops> = ({ pixel, pixelsCount, colorSelect, pixels, setPixels, loadingCreate }) => {
    const scale = useSharedValue(0.8)
    const theme = useTheme()
    const pixelSizes = Math.sqrt(pixelsCount)
    
    const styleAnimation = useAnimatedStyle(() => ({
        transform: [{ scale: scale.value }]
    }), [])

    useEffect(() => {
        if (!loadingCreate) {
            scale.value = withTiming(1, {
                duration: 500
            })
        } else {
            scale.value = withSequence(
                withTiming(0.85, {
                    duration: 500
                }),
                withTiming(1, {
                    duration: 500
                })
            )
        }
    }, [loadingCreate])

    return (
        <Animated.View style={styleAnimation}>
            <Container
                pixel={pixel}
                activeOpacity={0.5}
                pixelSizes={pixelSizes}
                disabled={loadingCreate}
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