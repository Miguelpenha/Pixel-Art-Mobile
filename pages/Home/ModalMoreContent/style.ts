import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Container = styled.View`
    padding: 4%;
    margin-top: 5%;
    padding-bottom: ${RFPercentage(15)}px;
`

export const MainOptions = styled.View`
    padding-bottom: 2%;
    flex-direction: row;
    justify-content: space-around;
    border-bottom-width: ${RFPercentage(0.4)}px;
    border-bottom-color: ${props => props.theme.secondaryColor};
`

export const ContainerIconOptionMain = styled.View`
    align-self: center;
    border-radius: ${RFPercentage(6)}px;
    border: ${RFPercentage(0.4)}px solid ${props => props.theme.secondaryColor}; 
`

export const IconOptionMain = styled(MaterialIcons)`
    padding: 2%;
    color: ${props => props.theme.secondaryColor};
`

export const TextOptionMain = styled.Text`
    margin-top: 8%;
    margin-bottom: 8%;
    font-weight: bold;
    text-align: center;
    font-size: ${RFPercentage(2.8)}px;
    color: ${props => props.theme.secondaryColor};
`

export const Option = styled.TouchableOpacity`
    padding: 4%;
    margin-top: 8%;
    align-self: center;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.primary};
`

export const IconOption = styled(MaterialIcons)`
    padding-right: 2%;
    margin-right: auto;
    align-self: center;
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