import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { ViewStyle } from 'react-native'
import { MaterialIcons } from '@expo/vector-icons'
import Animated from 'react-native-reanimated'

export const Container = styled.TouchableOpacity`
    padding: 4%;
    margin-top: 8%;
    align-self: center;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.backgroundColorSecondary};
`

export const ContainerIconOption: ViewStyle = {
    alignSelf: 'center',
    paddingRight: '2%',
    marginRight: 'auto'
}

export const IconOption = styled(MaterialIcons)`
    margin: auto;
    color: ${props => props.theme.primary};
`

export const TextOption = styled(Animated.Text)`
    padding-right: 2%;
    margin-left: auto;
    align-self: center;
    margin-right: auto;
    font-size: ${RFPercentage(3.2)}px;
    color: ${props => props.theme.primary};
`