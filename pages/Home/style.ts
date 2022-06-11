import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const Loading = styled.ActivityIndicator`
    margin: auto;
`

export const ButtonCreate = styled.TouchableOpacity`
    top: 10%;
    padding: 0.5%;
    z-index: 10;
    margin-right: 5%;
    align-self: flex-end;
    border-radius: ${RFPercentage(5)}px;
    background-color: ${props => props.theme.primary};
`

export const IconButtonCreate = styled(MaterialIcons)`
    color: ${props => props.theme.color};
`