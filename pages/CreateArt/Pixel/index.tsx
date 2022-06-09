import { FC, useState, memo } from 'react'
import { useTheme } from 'styled-components'
import { Container } from './style'
import { Ipixel } from '../../../types'

interface Iprops {
    pixelOrigem: Ipixel
    pixelsCount: number
    colorSelect: string
}

const Pixel: FC<Iprops> = ({ pixelOrigem, pixelsCount, colorSelect }) => {
    const [pixel, setPixel] = useState(pixelOrigem)
    const theme = useTheme()
    const pixelSizes = Math.sqrt(pixelsCount)

    return (
        <Container
            activeOpacity={0.6}
            pixel={pixel}
            pixelSizes={pixelSizes}
            onPress={() => {
                setPixel(pixel => ({
                    ...pixel,
                    color: pixel.color!=colorSelect ? colorSelect : theme.secondary
                }))
            }}
        />
    )
}

export default memo(Pixel)