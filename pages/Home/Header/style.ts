import styled from 'styled-components/native'
import { MaterialIcons } from '@expo/vector-icons'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    margin-top: 2%;
    flex-direction: row;
`

export const ContainerSettings = styled.TouchableOpacity`
    margin-left: 2%;
    margin-right: auto;
    position: absolute;
`

export const Settings = styled(MaterialIcons)`
    color: ${props => props.theme.primary};
`

export const ContainerCollection = styled.TouchableOpacity`
    left: 45.5%;
    position: absolute;
`

export const Collection = styled(MaterialIcons)`
    color: ${props => props.theme.primary};
`

export const Title = styled.Text`
    margin-top: 18%;
    margin-bottom: 2%;
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(5)}px;
    color: ${props => props.theme.primary};
`