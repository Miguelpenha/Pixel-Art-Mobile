import styled, { css } from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const ContainerSwitch = styled.View`
    margin-top: 2%;
    margin-bottom: 2%;
    align-items: center;
    flex-direction: row;
    justify-content: center;
`

export const TextSwitch = styled.Text`
    font-size: ${RFPercentage(4)}px;
    color: ${props => props.theme.primary};
`

export const Switch = styled.Switch`
    margin-left: 1%;
`

interface IButton {
    loading?: boolean
}

export const Button = styled.TouchableOpacity<IButton>`
    elevation: 8;
    padding: 3.5%;
    margin-top: 5%;
    margin-bottom: 5%;
    align-self: center;
    align-items: center;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.loading ? '#c7dffe' : props.theme.backgroundColorSecondary};
`

export const IconButton = styled(MaterialIcons)`
    color: ${props => props.theme.primary};
`

interface IIconUpdateButton {
    checkUpdating: boolean
}

export const IconUpdateButton = styled(IconButton)<IIconUpdateButton>`
    ${props => props.checkUpdating ? css`
        transform: rotate(90deg);
    ` : css`
        transform: rotate(0deg);
    `};
`

export const TextButton = styled.Text`
    margin-left: 1%;
    font-weight: bold;
    padding-right: 1%;
    font-size: ${RFPercentage(2.5)}px;
    color: ${props => props.theme.primary};
`

export const Version = styled.Text`
    margin-top: auto;
    margin-bottom: 2%;
    align-self: center;
    font-size: ${RFPercentage(3.2)}px;
    color: ${props => props.theme.secondaryColor};
`

export const ContainerPoweredBy = styled.View`
    margin-bottom: 5%;
    align-items: center;
`

export const TextPoweredBy = styled.Text`
    font-weight: bold;
    font-size: ${RFPercentage(3)}px;
    color: ${props => props.theme.primary};
`

export const TextPoweredByName = styled.Text`
    font-size: ${RFPercentage(3)}px;
    color: ${props => props.theme.primary};
`