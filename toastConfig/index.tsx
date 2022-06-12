import { ColorValue } from 'react-native'
import { BaseToastProps, ToastConfig } from 'react-native-toast-message'
import { useTheme } from 'styled-components'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { SuccessToast, ErrorToast, BaseToast } from 'react-native-toast-message'

interface Iprops {
    colorBorder: ColorValue
}

function configBase({ colorBorder }: Iprops): BaseToastProps {
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

const toastConfig: ToastConfig = {
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