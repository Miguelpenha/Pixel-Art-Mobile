import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Arts = styled.FlatList`
    flex-basis: 0;
`

export const ContainerMutateNumber = styled.View`
    margin-top: 5%;
    margin-bottom: 5%;
    align-items: center;
`

export const TitleMutateNumber = styled.Text`
    margin-bottom: 2%;
    font-size: ${RFPercentage(4)}px;
    color: ${props => props.theme.primary};
`

export const DataMutateNumber = styled.View`
    flex-direction: row;  
`

export const ContainerLeftMutateNumber = styled.TouchableOpacity`
    padding: 1%;
    margin-right: 6%;
    align-self: center;
    border-radius: ${RFPercentage(5)}px;
    background-color: ${props => props.theme.primary};
`

export const IconLeftMutateNumber = styled(MaterialIcons)`
    color: ${props => props.theme.color};
`

export const TextMutateNumber = styled.Text`
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(5)}px;
    color: ${props => props.theme.primary};
`

export const ContainerRightMutateNumber = styled.TouchableOpacity`
    padding: 1%;
    margin-left: 6%;
    align-self: center;
    border-radius: ${RFPercentage(5)}px;
    background-color: ${props => props.theme.primary};
`

export const IconRightMutateNumber = styled(MaterialIcons)`
    color: ${props => props.theme.color};
`

export const ButtonCreate = styled.TouchableOpacity`
    width: 45%;
    padding: 3% 0%;
    margin-top: 2%;
    align-self: center;
    margin-bottom: 15%;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.primary};
`

export const TextButtonCreate = styled.Text`
    font-weight: bold;
    margin-left: auto;
    font-size: ${RFPercentage(3.8)}px;
    color: ${props => props.theme.color};
`

export const IconButtonCreate = styled(MaterialIcons)`
    margin-left: 8%;
    align-self: center;
    margin-right: auto;
    color: ${props => props.theme.color};
`

export const Loading = styled.ActivityIndicator`
    margin: auto;
`

export const ContainerColorPicker = styled.View`
    width: 85%;
    align-self: center;
`

export const ButtonSubmitColor = styled.TouchableOpacity`
    width: 50%;
    padding: 4% 0%;
    margin-top: 20%;
    align-self: center;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.primary};
`

export const TextButtonSubmitColor = styled.Text`
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(3)}px;
    color: ${props => props.theme.color};
`