import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import Animated from 'react-native-reanimated'

export const Container = styled.View`
    padding: 4%;
    padding-top: 6%;
    padding-bottom: ${RFPercentage(42.8)}px;
`

export const MainOptions = styled(Animated.View)`
    padding-bottom: 6%;
    flex-direction: row;
    justify-content: space-around;
    border-bottom-width: ${RFPercentage(0.4)}px;
    border-bottom-color: ${props => props.theme.secondaryColor};
`

export const Options = styled(Animated.View)`

`

export const Loading = styled.ActivityIndicator`
    margin-top: 60%;
`