import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.View`
    padding: 4%;
    padding-bottom: 60.2%;
`

export const ContainerInfo = styled.View`
    flex-direction: row;
`

export const LabelInfo = styled.Text`
    font-size: ${RFPercentage(3.6)}px;
    color: ${props => props.theme.secondaryColor};
`

export const Info = styled.Text`
    font-weight: bold;
    font-size: ${RFPercentage(3.6)}px;
    color: ${props => props.theme.primary};
`