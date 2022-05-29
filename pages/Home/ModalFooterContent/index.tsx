import { Iart } from '../../../types'
import { FC } from 'react'
import { Container, ContainerInfo, LabelInfo, Info } from './style'

interface Iprops {
    art: Iart
}

const ModalFooterContent: FC<Iprops> = ({ art }) => {
    return (
        <Container>
            <ContainerInfo>
                <LabelInfo>Tamanho dos pixels </LabelInfo>
                <Info>{art.sizePixel}</Info>
            </ContainerInfo>
            <ContainerInfo>
                <LabelInfo>Total de pixels da arte </LabelInfo>
                <Info>{art.pixelsCont}</Info>
            </ContainerInfo>
        </Container>
    )
}

export default ModalFooterContent