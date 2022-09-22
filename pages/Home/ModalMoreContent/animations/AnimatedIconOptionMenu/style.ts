import { Itheme } from '../../../../../types'
import styled from 'styled-components/native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { MaterialIcons } from '@expo/vector-icons'

interface IContainerIconOptionMain {
    color?: (keyof Itheme) | null
}

export const ContainerIconOptionMain = styled.TouchableOpacity<IContainerIconOptionMain>`
    align-self: center;
    border-radius: ${RFPercentage(6)}px;
    border: ${RFPercentage(0.4)}px solid ${props => props.color ? props.theme[props.color] : props.theme.secondaryColor}; 
`

interface IIconOptionMain {
    color?: (keyof Itheme) | null
}

export const IconOptionMain = styled(MaterialIcons)<IIconOptionMain>`
    padding: 2%;
    color: ${props => props.color ? props.theme[props.color] : props.theme.secondaryColor};
`