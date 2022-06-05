import { SuccessToast, ErrorToast, BaseToast } from 'react-native-toast-message'
import { ViewStyle, TextStyle, ColorValue } from 'react-native'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { useTheme } from 'styled-components'

interface IconfigBase {
    style: ViewStyle
    contentContainerStyle: ViewStyle
    text1Style: TextStyle
}

interface Iprops {
    colorBorder: ColorValue
}

function configBase({ colorBorder }: Iprops): IconfigBase {
    const theme = useTheme()

    return {
        style: {
            width: '95%',
            borderLeftColor: colorBorder,
            backgroundColor: theme.backgroundColorSecondary
        },
        contentContainerStyle: {
            paddingHorizontal: RFPercentage(1)
        },
        text1Style: {
            fontWeight: '400',
            color: theme.secondaryColor,
            fontSize: RFPercentage(2.3)
        }
    }
}

const toastConfig = {
    success: props => (
        <SuccessToast
            {...props}
            {...configBase({
                colorBorder: 'green'
            })}
        />
    ),
    error: props => (
        <ErrorToast
            {...props}
            {...configBase({
                colorBorder: 'red'
            })}
        />
    ),
    info: props => (
        <BaseToast
            {...props}
            {...configBase({
                colorBorder: 'dodgerblue'
            })}
        />
    )
}

export default toastConfig