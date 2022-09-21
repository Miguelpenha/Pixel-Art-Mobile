import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'
import { Itheme } from '../../../types'

export const Container = styled.View`
    padding: 4%;
    padding-top: 6%;
    padding-bottom: ${RFPercentage(42.8)}px;
`

export const MainOptions = styled.View`
    padding-bottom: 6%;
    flex-direction: row;
    justify-content: space-around;
    border-bottom-width: ${RFPercentage(0.4)}px;
    border-bottom-color: ${props => props.theme.secondaryColor};
`

export const Option = styled.TouchableOpacity`
    padding: 4%;
    margin-top: 8%;
    align-self: center;
    flex-direction: row;
    border-radius: ${RFPercentage(2)}px;
    background-color: ${props => props.theme.backgroundColorSecondary};
`

export const IconOption = styled(MaterialIcons)`
    padding-right: 2%;
    margin-right: auto;
    align-self: center;
    color: ${props => props.theme.primary};
`

export const TextOption = styled.Text`
    padding-right: 2%;
    margin-left: auto;
    align-self: center;
    margin-right: auto;
    font-size: ${RFPercentage(3.2)}px;
    color: ${props => props.theme.primary};
`

export const Loading = styled.ActivityIndicator`
    margin-top: 60%;
`