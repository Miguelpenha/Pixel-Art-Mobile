import { Iart } from '../../../types'
import { FC, MutableRefObject } from 'react'
import { Container, Title, Option, IconOption, TextOption } from './style'
import * as FileSystem from 'expo-file-system'
import * as MediaLibrary from 'expo-media-library'
import { Modalize } from 'react-native-modalize'
import * as Sharing from 'expo-sharing'

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
    
    return (
        <Container>
            <Title>Opções</Title>
            <Option onPress={download}>
                <IconOption name="file-download" size={28}/>
                <TextOption>Baixar</TextOption>
            </Option>
            <Option onPress={share}>
                <IconOption name="share" size={28}/>
                <TextOption>Compartilhar</TextOption>
            </Option>
        </Container>
    )
}

export default ModalMoreContent