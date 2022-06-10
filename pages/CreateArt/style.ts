import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Arts = styled.FlatList`
    flex-basis: 0;
`

export const Title = styled.Text`
    font-weight: bold;
    margin-bottom: 5%;
    align-self: center;
    font-size: ${RFPercentage(5)}px;
    color: ${props => props.theme.primary};
`

export const ButtonColorSelectInfo = styled.TouchableOpacity`
    padding: 2%;
    margin-top: 5%;
    align-self: center;
    flex-direction: row;
    border-radius: ${RFPercentage(1)}px;
    background-color: ${props => props.theme.primary};
`

interface IColorSelectInfo {
    color: string
}

export const ColorSelectInfo = styled.Text<IColorSelectInfo>`
    width: 6.5%;
    border-radius: ${RFPercentage(0.5)}px;
    background-color: ${props => props.color};
    border: 1px solid ${props => props.theme.color};
`

export const TextColorSelectInfo = styled.Text`
    margin-left: 2%;
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(2.5)}px;
    color: ${props => props.theme.color};
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
    padding: 4% 0%;
    margin-top: 12%;
    margin-bottom: 15%;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.primary};
`

export const TextButtonCreate = styled.Text`
    padding-left: 5%;
    font-weight: bold;
    font-size: ${RFPercentage(3.5)}px;
    color: ${props => props.theme.color};
`

export const IconButtonCreate = styled(MaterialIcons)`
    margin-left: 10%;
    align-self: center;
    color: ${props => props.theme.color};
`