import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'

export const Container = styled.TouchableOpacity`
    background-color: ${props => props.theme.secondary};
    height: ${RFPercentage(14)}px;
    border: 1px solid ${props => props.theme.secondaryColor};
    width: 33.3%;
`