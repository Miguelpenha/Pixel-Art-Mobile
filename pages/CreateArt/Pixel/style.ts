import styled from 'styled-components/native'
import { Dimensions } from 'react-native'
import { Ipixel } from '../../../types'

const widthWindow = Dimensions.get('window').width-20

interface IContainer {
    pixel: Ipixel
    pixelSizes: number
}

export const Container = styled.TouchableOpacity<IContainer>`
    background-color: ${props => props.pixel.color};
    height: ${props => widthWindow/props.pixelSizes}px;
    width: ${props => (widthWindow/props.pixelSizes)}px;
    border: 1px solid ${props => props.theme.secondaryColor};
`