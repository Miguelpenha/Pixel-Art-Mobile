import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Animated from 'react-native-reanimated'

export const Container = styled.View`
    padding: 4%;
    padding-top: 6%;
    padding-bottom: ${RFPercentage(42.8)}px;
`

export const ContainerQRCode = styled(Animated.View)`
    padding: 5%;
    align-self: center;
    margin-top: ${RFPercentage(4.5)}px;
    border-radius: ${RFPercentage(4)}px;
    background-color: ${props => props.theme.backgroundColorSecondary};
`