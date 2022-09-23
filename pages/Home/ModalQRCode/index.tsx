import { IArt } from '../../../types'
import { FC, useEffect } from 'react'
import { useTheme } from 'styled-components'
import { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'
import { Container, ContainerQRCode } from './style'
import QRCode from 'react-native-qrcode-svg'
import { RFPercentage } from 'react-native-responsive-fontsize'

interface Iprops {
    art: IArt
}

const ModalQRCode: FC<Iprops> = ({ art }) => {
    const theme = useTheme()
    const scaleQRCode = useSharedValue(0.5)

    const styleAnimationContainerQRCode = useAnimatedStyle(() => ({
        opacity: scaleQRCode.value,
        transform: [{ scale: scaleQRCode.value }]
    }), [])

    useEffect(() => {
        scaleQRCode.value = withTiming(1)
    }, [])

    return (
        <Container>
            <ContainerQRCode style={styleAnimationContainerQRCode}>
                <QRCode
                    quietZone={10}
                    size={RFPercentage(30)}
                    backgroundColor={theme.primary}
                    color={theme.backgroundColorSecondary}
                    value={`https://pixel-arte.vercel.app/arts/${art._id}`}
                />
            </ContainerQRCode>
        </Container>
    )
}

export default ModalQRCode