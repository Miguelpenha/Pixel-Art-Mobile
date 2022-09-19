import { IArt } from '../../../types'
import { ViewStyle, TextStyle, ImageStyle, TouchableOpacity } from 'react-native'
import { FC, useState, memo } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import { getCollection, addToCollection, removeFromCollection } from '../../../collection'
import { blue, magenta } from '../../../utils/colorsLogs'
import Toast from 'react-native-toast-message'
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
    const [isAddedInCollection, setIsAddedInCollection] = useState(null)

    const styleAnimationLike = useAnimatedStyle(() => ({
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

    const styleAnimationCollection = useAnimatedStyle(() => ({
        transform: isAddedInCollection!==null ? [
            {
                translateY: withSequence(
                    withTiming(isAddedInCollection ? 5 : -5, {
                        duration: 250
                    }),
                    withTiming(!isAddedInCollection ? 5 : -5, {
                        duration: 250
                    }),
                    withTiming(0, {
                        duration: 250
                    })
                )
            },
            {
                scale: withSequence(
                    withTiming(isAddedInCollection ? 1.2 : 0.6, {
                        duration: 250
                    }),
                    withTiming(1, {
                        duration: 250
                    })
                )
            }
        ] : []
    }), [isAddedInCollection])

    useFocusEffect(() => {
        async function checkIsAddedInCollection() {
            const collection = await getCollection()
    
            if (collection && collection.includes(art._id)) {
                setIsAddedInCollection(true)
            } else {
                setIsAddedInCollection(false)
            }
        }
        
        checkIsAddedInCollection().then()
    })

    if (isAddedInCollection) {
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
                        <Animated.View style={styleAnimationLike}>
                            <IconInfoLike select={like} name={`favorite${like ? '' : '-outline'}`} size={30}/>
                        </Animated.View>
                    </ContainerInfoButton>
                    <ContainerInfoButton onPress={async () => {
                        if (!isAddedInCollection) {
                            await addToCollection(art._id)
    
                            setIsAddedInCollection(true)
    
                            console.log(blue('>> Pixel art added to collection'))
                            console.log(magenta(`   >> ID: ${art._id}`))
                            console.log(magenta(`   >> Name: ${art.name}`))
    
                            Toast.show({
                                type: 'info',
                                text1: 'Arte salva na coleção'
                            })
                        } else {
                            await removeFromCollection(art._id)
    
                            setIsAddedInCollection(false)
                            
                            console.log(blue('>> Pixel art removed from collection'))
                            console.log(magenta(`   >> ID: ${art._id}`))
                            console.log(magenta(`   >> Name: ${art.name}`))
    
                            Toast.show({
                                type: 'error',
                                text1: 'Arte removida da coleção'
                            })
                        }
                    }}>
                        <Animated.View style={styleAnimationCollection}>
                            <IconInfoViewLast select={isAddedInCollection} name={`bookmark${isAddedInCollection ? '' : '-outline'}`} size={30}/>
                        </Animated.View>
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
    } else {
        return null
    }
}

export default memo(Art)