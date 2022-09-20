import { IArt } from '../../../types'
import { FC, useState, memo, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { Container, Header, Name, ContainerIconMore, IconMore, ImageArt, Footer, ContainerInfoButton, IconInfoButton, ListContainerInfo, ContainerInfo, IconInfo, TextInfo } from './style'
import { styleAnimationLike, styleAnimationCollection } from './animations'
import Animated from 'react-native-reanimated'
import useCollection from '../../../contexts/collectionContext'
import addOrRemoveToCollection from './addOrRemoveToCollection'

interface Iprops {
    art: IArt
    onClickMore: () => void
    onClickFooter: () => void
}

const Art: FC<Iprops> = ({ art, onClickMore, onClickFooter, ...props }) => {
    const { collection, addArtToCollection, removeArtToCollection } = useCollection()
    const [like, setLike] = useState<boolean>(null)
    const [isAddedInCollection, setIsAddedInCollection] = useState<boolean>(null)

    useFocusEffect(
        useCallback(() => {
            if (collection && collection.includes(art._id)) {
                setIsAddedInCollection(true)
            } else {
                setIsAddedInCollection(false)
            }
        }, [collection])
    )

    return (
        <Container {...props}>
            <Header>
                <Name>{art.name}</Name>
                <ContainerIconMore onPress={onClickMore}>
                    <IconMore name="more-vert" size={30}/>
                </ContainerIconMore>
            </Header>
            <ImageArt
                source={{
                    uri: art.url
                }}
            />
            <Footer>
                <ContainerInfoButton onPress={() => setLike(!like)}>
                    <Animated.View style={styleAnimationLike(like)}>
                        <IconInfoButton
                            size={30}
                            select={like && 'likeColor'}
                            name={`favorite${like ? '' : '-outline'}`}
                        />
                    </Animated.View>
                </ContainerInfoButton>
                <ContainerInfoButton
                    onPress={async () => (
                        await addOrRemoveToCollection(
                            isAddedInCollection,
                            setIsAddedInCollection,
                            addArtToCollection,
                            removeArtToCollection,
                            art
                        )
                    )}
                >
                    <Animated.View style={styleAnimationCollection(isAddedInCollection)}>
                        <IconInfoButton
                            size={30}
                            select={isAddedInCollection && 'viewLastColor'}
                            name={`bookmark${isAddedInCollection ? '' : '-outline'}`}
                        />
                    </Animated.View>
                </ContainerInfoButton>
                <ListContainerInfo onPress={onClickFooter}>
                    <ContainerInfo>
                        <IconInfo name="straighten" size={28}/>
                        <TextInfo>{art.sizePixel}</TextInfo>
                    </ContainerInfo>
                    <ContainerInfo>
                        <IconInfo name="aspect-ratio" size={28}/>
                        <TextInfo>
                            {art.pixelsCont} ({Math.sqrt(art.pixelsCont)}x{Math.sqrt(art.pixelsCont)})
                        </TextInfo>
                    </ContainerInfo>
                </ListContainerInfo>
            </Footer>
        </Container>
    )
}

export default memo(Art)