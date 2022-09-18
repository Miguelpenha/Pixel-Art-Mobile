import { IArt } from '../../../types'
import { FC } from 'react'
import { Container, ContainerInfo, LabelInfo, Info } from './style'

interface Iprops {
    art: IArt
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
                <Info>{art.pixelsCont} ({Math.sqrt(art.pixelsCont)}x{Math.sqrt(art.pixelsCont)})</Info>
            </ContainerInfo>
        </Container>
    )
}

export default ModalFooterContent