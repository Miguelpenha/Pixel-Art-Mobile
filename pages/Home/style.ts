import { ViewStyle, Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

export const ContainerButtonCreate: ViewStyle = {
    zIndex: 10,
    marginRight: '5%',
    alignSelf: 'flex-end',
    top: `${Dimensions.get('screen').scale*2.10}%`
}

export const ButtonCreate = styled.TouchableOpacity`
    padding: 0.5%;
    border-radius: ${RFPercentage(5)}px;
    background-color: ${props => props.theme.primary};
`

export const IconButtonCreate = styled(MaterialIcons)`
    color: ${props => props.theme.color};
`

export const Loading = styled.ActivityIndicator`
    margin: auto;
`