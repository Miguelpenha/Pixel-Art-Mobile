import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'
import { Itheme } from '../../../types'

export const Container = styled.View`
    margin-bottom: 5%;
`

export const Header = styled.View`
    padding: 3% 1.5%;
    flex-direction: row;
    align-items: center;
`

export const Name = styled.Text`
    font-size: ${RFPercentage(3)}px;
    color: ${props => props.theme.secondaryColor};
`

export const ContainerIconMore = styled.TouchableOpacity`
    margin-left: auto;
`

export const IconMore = styled(MaterialIcons)`
    color: ${props => props.theme.secondaryColor};
`

export const ImageArt = styled.Image`
    aspect-ratio: 1;
`

export const Footer = styled.View`
    padding: 2%;
    padding-left: 3%;
    flex-direction: row;
`

export const ContainerInfoButton = styled.TouchableOpacity`
    margin-right: 2%;
`

interface IIconInfo {
    select: keyof Itheme
}

export const IconInfoButton = styled(MaterialIcons)<IIconInfo>`
    color: ${props => props.select ? props.theme[props.select] : props.theme.secondaryColor};
`

export const ListContainerInfo = styled.TouchableOpacity`
    margin-left: auto;
    flex-direction: row;
`

export const ContainerInfo = styled.View`
    margin-left: 5%;
    flex-direction: row;
    align-items: center;
`

export const IconInfo = styled(MaterialIcons)`
    padding-right: 2%;
    color: ${props => props.theme.secondaryColor};
`

export const TextInfo = styled.Text`
    font-size: ${RFPercentage(2.6)}px;
    color: ${props => props.theme.secondaryColor};
`