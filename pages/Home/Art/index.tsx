import { IArt } from '../../../types'
import { FC, useState, memo, useCallback } from 'react'
import { useNavigation } from '@react-navigation/native'
import { useFocusEffect } from '@react-navigation/native'
import { Container, Header, Name, ContainerIconMore, IconMore, ImageArt, Footer, ContainerInfoButton, IconInfoButton, ListContainerInfo, ContainerInfo, IconInfo, TextInfo } from './style'
import { styleAnimationLike, styleAnimationCollection } from './animations'
import Animated, { useAnimatedStyle, useSharedValue, withSequence, withTiming } from 'react-native-reanimated'
import useCollection from '../../../contexts/collectionContext'
import { blue, magenta } from '../../../utils/colorsLogs'
import Toast from 'react-native-toast-message'

interface Iprops {
    art: IArt
    onClickMore: () => void
    onClickFooter: () => void
}

const Art: FC<Iprops> = ({ art, onClickMore, onClickFooter, ...props }) => {
    const navigation = useNavigation()
    const { collection, addArtToCollection, removeArtToCollection } = useCollection()
    const [like, setLike] = useState<boolean>(null)
    const [isAddedInCollection, setIsAddedInCollection] = useState<boolean>(null)
    const pressed = useSharedValue(1)
    const pressedRotation = useSharedValue(0)

    const styleAnimationIconMore = useAnimatedStyle(() => ({
        transform: [
            { scale: pressed.value },
            { rotate: `${pressedRotation.value*20}deg` },
            { translateX: pressedRotation.value/2, translateY: pressedRotation.value/2 }
        ]
    }))

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
                <ContainerIconMore
                    onPress={() => {
                        pressed.value = withTiming(0.8, {
                            duration: 100
                        })

                        pressedRotation.value = withSequence(
                            withTiming(1, {
                                duration: 200
                            }),
                            withTiming(-1, {
                                duration: 200
                            })
                        )
                        
                        setTimeout(() => {
                            onClickMore()

                            pressed.value = withTiming(1, {
                                duration: 100
                            })

                            pressedRotation.value = withTiming(0, {
                                duration: 100
                            })
                        }, 100)
                    }}
                    activeOpacity={0.5}
                    onPressOut={() => {
                        pressed.value = withTiming(1)
                        pressedRotation.value = withTiming(0)
                    }}
                    onPressIn={() => {
                        pressed.value = withTiming(0.8)
                        pressedRotation.value = withSequence(withTiming(1), withTiming(-1))
                    }}
                >
                    <Animated.View style={styleAnimationIconMore}>
                        <IconMore name="more-vert" size={30}/>
                    </Animated.View>
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
                    onPress={async () => {
                        if (!isAddedInCollection) {
                            await addArtToCollection(art._id)

                            setIsAddedInCollection(true)

                            console.log(blue('>> Pixel art added to collection'))
                            console.log(magenta(`   >> ID: ${art._id}`))
                            console.log(magenta(`   >> Name: ${art.name}`))

                            Toast.show({
                                type: 'info',
                                text1: 'Arte salva na coleção',
                                onPress() {
                                    Toast.hide()
                                    
                                    navigation.navigate('Collection', {
                                        scrollTo: art._id
                                    })
                                }
                            })
                        } else {
                            await removeArtToCollection(art._id)

                            setIsAddedInCollection(false)
                            
                            console.log(blue('>> Pixel art removed from collection'))
                            console.log(magenta(`   >> ID: ${art._id}`))
                            console.log(magenta(`   >> Name: ${art.name}`))

                            Toast.show({
                                type: 'error',
                                text1: 'Arte removida da coleção'
                            })
                        }
                    }}
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