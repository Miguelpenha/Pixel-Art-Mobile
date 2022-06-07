import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Title = styled.Text`
    font-weight: bold;
    align-self: center;
    font-size: ${RFPercentage(4)}px;
    color: ${props => props.theme.primary};
`