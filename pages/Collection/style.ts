import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const MessageNotFound = styled.Text`
    width: 55%;
    margin-top: 15%;
    font-weight: bold;
    align-self: center;
    text-align: center;
    font-size: ${RFPercentage(4.5)}px;
    line-height: ${RFPercentage(6)}px;
    color: ${props => props.theme.primary};
`

export const Loading = styled.ActivityIndicator`
    margin: auto;
`