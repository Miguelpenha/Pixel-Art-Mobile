import { Itheme } from '../types'
import { ModalizeProps } from 'react-native-modalize'
import { RFPercentage } from 'react-native-responsive-fontsize'

function optionsModalize(theme: Itheme, height: number=0, snapPoint?: number): ModalizeProps {
    return {
        modalHeight: RFPercentage(height || 0),
        modalStyle: { backgroundColor: theme.backgroundColor },
        handleStyle: {
            width: RFPercentage(10),
            backgroundColor: theme.primary
        },
        snapPoint: snapPoint && RFPercentage(snapPoint)
    }
}

export default optionsModalize