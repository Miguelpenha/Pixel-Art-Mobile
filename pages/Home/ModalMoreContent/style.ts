import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
    padding: 4%;
    padding-bottom: 84.8%;
`

export const Title = styled.Text`
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(4)}px;
    color: ${props => props.theme.primary};
`

export const Option = styled.TouchableOpacity`
    padding: 4%;
    margin-top: 5%;
    align-self: center;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.primary};
`

export const IconOption = styled(MaterialIcons)`
    align-self: center;
    padding-right: 2%;
    margin-right: auto;
    color: ${props => props.theme.color};
`

export const TextOption = styled.Text`
    padding-right: 2%;
    margin-left: auto;
    align-self: center;
    margin-right: auto;
    font-size: ${RFPercentage(3.2)}px;
    color: ${props => props.theme.color};
`