import styled from 'styled-components/native'
import Animated from 'react-native-reanimated'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled(Animated.View)`
    padding: 4%;
    padding-bottom: 20%;
`

export const ContainerInfo = styled.View`
    width: 100%;
    margin-top: 2%;
    flex-wrap: wrap;
    flex-direction: row;
`

export const LabelInfo = styled.Text`
    font-size: ${RFPercentage(3.5)}px;
    color: ${props => props.theme.secondaryColor};
`

interface IInfo {
    select?: string
}

export const Info = styled.Text<IInfo>`
    font-weight: bold;
    font-size: ${RFPercentage(3.5)}px;
    color: ${props => props.select || props.theme.primary};
`