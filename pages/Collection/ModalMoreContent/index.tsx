import { IArt } from '../../../types'
import { MutableRefObject, FC, useState, useEffect } from 'react'
import { Modalize } from 'react-native-modalize'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import Toast from 'react-native-toast-message'
import * as Sharing from 'expo-sharing'
import * as Clipboard from 'expo-clipboard'
import { Container, MainOptions, ContainerIconOptionMain, IconOptionMain, TextOptionMain, Option, IconOption, TextOption, Loading } from './style'
import { TouchableOpacity, Platform } from 'react-native'
import { blue, green, magenta } from '../../../utils/colorsLogs'
import useCollection from '../../../contexts/collectionContext'
import { useTheme } from 'styled-components'

interface Iprops {
    art: IArt
    modalRef: MutableRefObject<Modalize>
}

const ModalMoreContent: FC<Iprops> = ({ art, modalRef }) => {
    const [status, requestPermission] = MediaLibrary.usePermissions()
    const [IsAddedInCollection, setIsAddedInCollection] = useState<boolean>(null)
    const theme = useTheme()
    const { collection, addArtToCollection, removeArtToCollection } = useCollection()

    useEffect(() => {
        async function checkIsAddedInCollection() {
            if (collection && collection.includes(art._id)) {
                setIsAddedInCollection(true)
            } else {
                setIsAddedInCollection(false)
            }
        }

        checkIsAddedInCollection().then()
    }, [collection])

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

    async function AddToCollection() {
        modalRef.current.close()
        
        await addArtToCollection(art._id)

        setIsAddedInCollection(true)
        
        console.log(blue('>> Pixel art added to collection'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))

        Toast.show({
            type: 'info',
            text1: 'Arte salva na coleção'
        })
    }
    
    async function removeFromCollectionHandle() {
        modalRef.current.close()
        
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

    if (IsAddedInCollection != null) {
        return (
            <Container>
                <MainOptions>
                    <TouchableOpacity onPress={download}>
                        <ContainerIconOptionMain select="success">
                            <IconOptionMain select="success" name="file-download" size={30}/>
                        </ContainerIconOptionMain>
                        <TextOptionMain select="success">Baixar</TextOptionMain>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={copyLink}>
                        <ContainerIconOptionMain>
                            <IconOptionMain name="link" size={30}/>
                        </ContainerIconOptionMain>  
                        <TextOptionMain>Link</TextOptionMain>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={IsAddedInCollection ? removeFromCollectionHandle : AddToCollection}>
                            <ContainerIconOptionMain select={IsAddedInCollection ? 'error' : 'primary'}>
                                <IconOptionMain select={IsAddedInCollection ? 'error' : 'primary'} name={`bookmark${IsAddedInCollection ? '' : '-outline'}`} size={30}/>
                            </ContainerIconOptionMain>
                            <TextOptionMain select={IsAddedInCollection ? 'error' : 'primary'}>{IsAddedInCollection ? 'Remover' : 'Adicionar'}</TextOptionMain>
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
        return <Loading color={theme.primary} size={Platform.OS === 'android' ? 50 : 'large'}/>
    }
}

export default ModalMoreContent