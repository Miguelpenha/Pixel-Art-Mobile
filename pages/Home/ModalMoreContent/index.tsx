import { Iart } from '../../../types'
import { FC, MutableRefObject } from 'react'
import { Container, Title, MainOptions, ContainerIconOptionMain, IconOptionMain, TextOptionMain, Option, IconOption, TextOption } from './style'
import { TouchableOpacity } from 'react-native'
import { Modalize } from 'react-native-modalize'
import * as Sharing from 'expo-sharing'
import * as Clipboard from 'expo-clipboard'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'

interface Iprops {
    art: Iart
    modalRef: MutableRefObject<Modalize>
}

const ModalMoreContent: FC<Iprops> = ({ art, modalRef }) => {
    const [status, requestPermission] = MediaLibrary.usePermissions()

    async function download() {
        !status.granted && await requestPermission()
        
        modalRef.current.close()

        const { uri } = await FileSystem.downloadAsync(
            `https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`,
            FileSystem.documentDirectory+`${art._id}.png`, {}
        )
        
        await MediaLibrary.createAssetAsync(uri)
    }

    async function share() {
        const { uri } = await FileSystem.downloadAsync(
            `https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`,
            FileSystem.documentDirectory+`${art._id}.png`, {}
        )

        modalRef.current.close()
        
        await Sharing.shareAsync(uri, {
            dialogTitle: art.name,
            mimeType: 'image/png',
            UTI: 'public.png'
        })
    }

    function copyLink() {
        Clipboard.setString(`https://pixel-arte.vercel.app/arts/${art._id}`)
        
        modalRef.current.close()
    }

    function copyImageLink() {
        Clipboard.setString(`https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`)
        
        modalRef.current.close()
    }

    function favorite() {
        modalRef.current.close()
    }
    
    return (
        <Container>
            <Title>Opções</Title>
            <MainOptions>
                <TouchableOpacity onPress={copyLink}>
                    <ContainerIconOptionMain>
                        <IconOptionMain name="link" size={32}/>
                    </ContainerIconOptionMain>  
                    <TextOptionMain>Link</TextOptionMain>
                </TouchableOpacity>
                <TouchableOpacity onPress={download}>
                    <ContainerIconOptionMain>
                        <IconOptionMain name="file-download" size={32}/>
                    </ContainerIconOptionMain>  
                    <TextOptionMain>Baixar</TextOptionMain>
                </TouchableOpacity>
                <TouchableOpacity onPress={favorite}>
                    <ContainerIconOptionMain>
                        <IconOptionMain name="star" size={32}/>
                    </ContainerIconOptionMain>  
                    <TextOptionMain>Favoritos</TextOptionMain>
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
}

export default ModalMoreContent