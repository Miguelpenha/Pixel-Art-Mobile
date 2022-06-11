import { Dispatch, SetStateAction, FC, useState, memo } from 'react'
import { useTheme } from 'styled-components'
import { Container } from './style'
import { Ipixel } from '../../../types'

interface Iprops {
    pixel: Ipixel
    pixelsCount: number
    colorSelect: string
    pixels: Ipixel[]
    setPixels: Dispatch<SetStateAction<Ipixel[]>>
}

const Pixel: FC<Iprops> = ({ pixel, pixelsCount, colorSelect, pixels, setPixels }) => {
    const theme = useTheme()
    const pixelSizes = Math.sqrt(pixelsCount)

    return (
        <Container
            activeOpacity={0.6}
            pixel={pixel}
            pixelSizes={pixelSizes}
            onPress={() => {
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
    )
}

export default memo(Pixel)