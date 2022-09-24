import { IArt } from '../../../types'
import { FC, useEffect } from 'react'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Container, ContainerInfo, LabelInfo, Info } from './style'
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated'

interface Iprops {
    art: IArt
}

const ModalFooterContent: FC<Iprops> = ({ art }) => {
    const fromBottomAnimation = useSharedValue(RFPercentage(20))
    const opacityAnimation = useSharedValue(0)

    const styleAnimationContainer = useAnimatedStyle(() => ({
        opacity: opacityAnimation.value,
        transform: [{ translateY: fromBottomAnimation.value }]
    }), [])

    useEffect(() => {
        fromBottomAnimation.value = withTiming(0, {
            duration: 700
        })

        opacityAnimation.value = withTiming(1, {
            duration: 700
        })
    }, [])

    return (
        <Container style={styleAnimationContainer}>
            <ContainerInfo>
                <LabelInfo>Tamanho dos pixels </LabelInfo>
                <Info>{art.sizePixel}</Info>
            </ContainerInfo>
            <ContainerInfo>
                <LabelInfo>Total de pixels da arte </LabelInfo>
                <Info>{art.pixelsCont} ({Math.sqrt(art.pixelsCont)}x{Math.sqrt(art.pixelsCont)})</Info>
            </ContainerInfo>
            <ContainerInfo>
                <LabelInfo>Url da arte </LabelInfo>
                <Info>{`https://pixel-arte.vercel.app/arts/${art._id}`}</Info>
            </ContainerInfo>
            <ContainerInfo>
                <LabelInfo>Cores </LabelInfo>
                {art.colors.map((color, index) => <Info key={index} select={color}>{color} </Info>)}
            </ContainerInfo>
            <ContainerInfo>
                <LabelInfo>Nome </LabelInfo>
                <Info>{art.name}</Info>
            </ContainerInfo>
        </Container>
    )
}

export default ModalFooterContent