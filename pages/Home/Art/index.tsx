import { IArt } from '../../../types'
import { ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from 'react-native'
import { FC, useState, memo } from 'react'
import { Container, Header, Name, ContainerIconMore, IconMore, ImageArt, Footer, ContainerInfoButton, IconInfoLike, IconInfoViewLast, ListContainerInfo, ContainerInfo, IconInfo, TextInfo } from './style'
import Animated, { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated'

interface Iprops {
    art: IArt
    onClickFooter: Function
    onClickMore: Function
    style?: ViewStyle
    nameStyle?: TextStyle
    imageStyle?: ImageStyle
}

const Art: FC<Iprops> = ({ art, onClickFooter, onClickMore, nameStyle, imageStyle, ...props }) => {
    const [like, setLike] = useState(null)
    const [viewLast, setViewLast] = useState(false)

    const styleAnimation = useAnimatedStyle(() => ({
        transform: like!==null ? [{
            scale: withSequence(
                withTiming(like ? 1.2 : 0.6, {
                    duration: 250
                }),
                withTiming(1, {
                    duration: 250
                })
            )
        }] : []
    }), [like])

    return (
        <Container {...props}>
            <Header>
                <TouchableOpacity>
                    <Name style={nameStyle}>{art.name}</Name>
                </TouchableOpacity>
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
                    <Animated.View style={styleAnimation}>
                        <IconInfoLike select={like} name={`favorite${like ? '' : '-outline'}`} size={30}/>
                    </Animated.View>
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