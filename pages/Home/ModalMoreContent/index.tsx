import { Iart } from '../../../types'
import { MutableRefObject, FC, useState, useEffect } from 'react'
import { Modalize } from 'react-native-modalize'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import Toast from 'react-native-toast-message'
import * as Sharing from 'expo-sharing'
import * as Clipboard from 'expo-clipboard'
import { Container, MainOptions, ContainerIconOptionMain, IconOptionMain, TextOptionMain, Option, IconOption, TextOption } from './style'
import { TouchableOpacity } from 'react-native'
import { blue, green, magenta } from '../../../utils/colorsLogs'
import { getFavorites, removeFavorite, setFavorite } from '../../../favorites'

interface Iprops {
    art: Iart
    modalRef: MutableRefObject<Modalize>
}

const ModalMoreContent: FC<Iprops> = ({ art, modalRef }) => {
    const [status, requestPermission] = MediaLibrary.usePermissions()
    const [IsFavorite, setIsFavorite] = useState<boolean>(null)

    useEffect(() => {
        async function checkFavorite() {
            const favorites = await getFavorites()
    
            if (favorites && favorites.includes(art._id)) {
                setIsFavorite(true)
            } else {
                setIsFavorite(false)
            }
        }

        checkFavorite().then()
    }, [])

    async function download() {
        !status.granted && await requestPermission()
        
        modalRef.current.close()

        const { uri } = await FileSystem.downloadAsync(
            `https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`,
            FileSystem.documentDirectory+`${art._id}.png`, {}
        )
        
        const { filename, uri: uriAsset } = await MediaLibrary.createAssetAsync(uri)

        console.log(green('>> Pixel art downloaded'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))
        console.log(magenta(`   >> FileName: ${filename}`))
        console.log(magenta(`   >> URI: ${uriAsset}`))
        
        Toast.show({
            type: 'success',
            text1: 'Arte baixada com sucesso'
        })
    }

    async function share() {
        const { uri } = await FileSystem.downloadAsync(
            `https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`,
            FileSystem.documentDirectory+`${art._id}.png`, {}
        )

        modalRef.current.close()

        console.log(blue('>> Pixel art sharing process started'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))
        console.log(magenta(`   >> FileName: ${art._id}.png`))
        console.log(magenta(`   >> URI: ${uri}`))
        
        await Sharing.shareAsync(uri, {
            dialogTitle: art.name,
            mimeType: 'image/png',
            UTI: 'public.png'
        })
    }

    function copyLink() {
        const link = `https://pixel-arte.vercel.app/arts/${art._id}`
        Clipboard.setString(link)
        
        modalRef.current.close()

        console.log(blue('>> Copied pixel art link'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))
        console.log(magenta(`   >> Link: ${link}`))

        Toast.show({
            type: 'info',
            text1: 'Link copiado para a sua área de transferência'
        })
    }

    function copyImageLink() {
        const link = `https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`
        Clipboard.setString(link)
        
        modalRef.current.close()

        console.log(blue('>> Copied pixel art image link'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))
        console.log(magenta(`   >> Link: ${link}`))

        Toast.show({
            type: 'info',
            text1: 'Link da foto copiado para a sua área de transferência'
        })
    }

    async function favorite() {
        modalRef.current.close()
        
        await setFavorite(art._id)

        setIsFavorite(true)
        
        console.log(blue('>> Pixel art added to favorites'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))

        Toast.show({
            type: 'info',
            text1: 'Arte salva em favoritas'
        })
    }
    
    async function deleteFavorite() {
        modalRef.current.close()
        
        await removeFavorite(art._id)

        setIsFavorite(false)
        
        console.log(blue('>> Pixel art removed from favorites'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))

        Toast.show({
            type: 'error',
            text1: 'Arte removida das favoritas'
        })
    }

    if (IsFavorite != null) {
        return (
            <Container>
                <MainOptions>
                    <TouchableOpacity onPress={copyLink}>
                        <ContainerIconOptionMain>
                            <IconOptionMain name="link" size={30}/>
                        </ContainerIconOptionMain>  
                        <TextOptionMain>Link</TextOptionMain>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={download}>
                        <ContainerIconOptionMain>
                            <IconOptionMain name="file-download" size={30}/>
                        </ContainerIconOptionMain>  
                        <TextOptionMain>Baixar</TextOptionMain>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={IsFavorite ? deleteFavorite : favorite}>
                            <ContainerIconOptionMain>
                                <IconOptionMain name="star" size={30}/>
                            </ContainerIconOptionMain>  
                            <TextOptionMain>{IsFavorite ? 'Desfavoritar' : 'Favoritos'}</TextOptionMain>
                        </TouchableOpacity>
                </MainOptions>
                <Option onPress={copyImageLink}>
                    <IconOption name="image" size={28}/>
                    <TextOption>Link da foto</TextOption>
                </Option>
                <Option onPress={share}>
                    <IconOption name="share" size={28}/>
                    <TextOption>Compartilhar</TextOption>
                </Option>
            </Container>
        )
    } else {
        return null
    }
}

export default ModalMoreContent