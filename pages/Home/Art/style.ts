import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
    width: 100%;
    margin-bottom: 5%;
`

export const Header = styled.View`
    padding-bottom: 3%;
    padding-left: 1.5%;
    padding-right: 1.5%;
    flex-direction: row;
    align-items: center;
`

export const ContainerName = styled.TouchableOpacity`
    
`

export const Name = styled.Text`
    font-size: ${RFPercentage(3)}px;
    color: ${props => props.theme.secondaryColor};
`

export const ContainerIconMore = styled.TouchableOpacity`
    margin-left: auto;
    border-radius: ${RFPercentage(5)}px;
`

export const IconMore = styled(MaterialIcons)`
    color: ${props => props.theme.secondaryColor};
`

export const ImageArt = styled.Image`
    aspect-ratio: 1;
`

export const Footer = styled.View`
    padding-bottom: 2%;
    padding-left: 1.5%;
    padding-right: 1.5%;
    flex-direction: row;
`

export const ContainerInfoButton = styled.TouchableOpacity`
    margin-top: 2%;
    margin-right: 2%;
    flex-direction: row;
    align-items: center;
`

interface IIconInfoLike {
    select: boolean
    mainColor: string
    secondaryColor: string
}

export const IconInfoLike = styled(MaterialIcons)<IIconInfoLike>`
    color: ${props => {
        if (props.select) {
            return props.mainColor
        } else {
            return props.secondaryColor
        }
    }};
`

export const ListContainerInfo = styled.TouchableOpacity`
    margin-left: auto;
    flex-direction: row;
`

export const ContainerInfo = styled.View`
    margin-top: 2%;
    margin-right: 5%;
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