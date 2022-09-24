import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Title = styled.Text`
    margin-top: 2%;
    margin-bottom: 2%;
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(5)}px;
    color: ${props => props.theme.primary};
`

export const Name = styled.TextInput`
    width: 60%;
    padding: 2%;
    margin-top: 5%;
    align-self: center;
    font-size: ${RFPercentage(3)}px;
    color: ${props => props.theme.color};
    border-radius: ${RFPercentage(1.5)}px;
    background-color: ${props => props.theme.secondary};
`

export const Options = styled.View`
    width: 95%;
    margin-top: 5%;
    margin-bottom: 4%;
    align-self: center;
    flex-direction: row;
`

export const ButtonColor = styled.TouchableOpacity`
    width: 40%;
    padding: 2%;
    margin-right: auto;
    align-self: center;
    flex-direction: row;
    border-radius: ${RFPercentage(1)}px;
    background-color: ${props => props.theme.primary};
`

interface IColorButtonColor {
    color: string
}

export const ColorButtonColor = styled.Text<IColorButtonColor>`
    width: ${RFPercentage(3.2)}px;
    border-radius: ${RFPercentage(0.5)}px;
    background-color: ${props => props.color};
    border: 1px solid ${props => props.theme.color};
`

export const TextButtonColor = styled.Text`
    margin-left: 6.5%;
    font-weight: bold;
    font-size: ${RFPercentage(2.5)}px;
    color: ${props => props.theme.color};
`

export const ButtonClear = styled.TouchableOpacity`
    padding: 2%;
    border-radius: ${RFPercentage(5)}px;
    background-color: ${props => props.theme.primary};
`

export const IconButtonClear = styled(MaterialIcons)`
    color: ${props => props.theme.color};
`