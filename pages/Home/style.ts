import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Dimensions } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'

export const Loading = styled.ActivityIndicator`
    margin: auto;
`

export const ButtonCreate = styled.TouchableOpacity`
    z-index: 10;
    padding: 0.5%;
    margin-right: 5%;
    align-self: flex-end;
    border-radius: ${RFPercentage(5)}px;
    top: ${Dimensions.get('screen').scale*2.65}%;
    background-color: ${props => props.theme.primary};
`

export const IconButtonCreate = styled(MaterialIcons)`
    color: ${props => props.theme.color};
`