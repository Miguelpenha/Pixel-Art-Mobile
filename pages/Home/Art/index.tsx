import { FC, memo, useState } from 'react'
import { Iart } from '../../../types'
import { ViewStyle, TextStyle, ImageStyle } from 'react-native'
import { Container, Header, ContainerName, Name, ContainerIconMore, IconMore, ImageArt, Footer, ContainerInfoButton, IconInfoLike, IconInfoViewLast, ListContainerInfo, ContainerInfo, IconInfo, TextInfo } from './style'

interface Iprops {
    art: Iart
    onClickFooter: Function
    onClickMore: Function
    style?: ViewStyle
    nameStyle?: TextStyle
    imageStyle?: ImageStyle
}

const Art: FC<Iprops> = ({ art, onClickFooter, onClickMore, nameStyle, imageStyle, ...props }) => {
    const [like, setLike] = useState(false)
    const [viewLast, setViewLast] = useState(false)

    return (
        <Container {...props}>
            <Header>
                <ContainerName>
                    <Name style={nameStyle}>{art.name}</Name>
                </ContainerName>
                <ContainerIconMore onPress={() => onClickMore()}>
                    <IconMore name="more-vert" size={30}/>
                </ContainerIconMore>
            </Header>
            <ImageArt
                style={imageStyle}
                source={{
                    uri: art.url
                }}
            />
            <Footer>
                <ContainerInfoButton onPress={() => setLike(!like)}>
                    <IconInfoLike select={like} name={`favorite${like ? '' : '-outline'}`} size={30}/>
                </ContainerInfoButton>
                <ContainerInfoButton onPress={() => setViewLast(!viewLast)}>
                    <IconInfoViewLast select={viewLast} name={`bookmark${viewLast ? '' : '-outline'}`} size={30}/>
                </ContainerInfoButton>
                <ListContainerInfo onPress={() => onClickFooter()}>
                    <ContainerInfo>
                        <IconInfo name="straighten" size={28}/>
                        <TextInfo>{art.sizePixel}</TextInfo>
                    </ContainerInfo>
                    <ContainerInfo>
                        <IconInfo name="aspect-ratio" size={28}/>
                        <TextInfo>{art.pixelsCont} ({Math.sqrt(art.pixelsCont)}x{Math.sqrt(art.pixelsCont)})</TextInfo>
                    </ContainerInfo>
                </ListContainerInfo>
            </Footer>
        </Container>
    )
}

export default memo(Art)