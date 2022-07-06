import { Iart } from '../../../types'
import { MutableRefObject, FC } from 'react'
import { Modalize } from 'react-native-modalize'
import * as MediaLibrary from 'expo-media-library'
import * as FileSystem from 'expo-file-system'
import Toast from 'react-native-toast-message'
import * as Sharing from 'expo-sharing'
import * as Clipboard from 'expo-clipboard'
import { Container, MainOptions, ContainerIconOptionMain, IconOptionMain, TextOptionMain, Option, IconOption, TextOption } from './style'
import { TouchableOpacity } from 'react-native'

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
        
        await Sharing.shareAsync(uri, {
            dialogTitle: art.name,
            mimeType: 'image/png',
            UTI: 'public.png'
        })
    }

    function copyLink() {
        Clipboard.setString(`https://pixel-arte.vercel.app/arts/${art._id}`)
        
        modalRef.current.close()

        Toast.show({
            type: 'info',
            text1: 'Link copiado para a sua área de transferência'
        })
    }

    function copyImageLink() {
        Clipboard.setString(`https://pixel-arte.vercel.app/api/arts/find/${art._id}/image`)
        
        modalRef.current.close()

        Toast.show({
            type: 'info',
            text1: 'Link da foto copiado para a sua área de transferência'
        })
    }

    function favorite() {
        modalRef.current.close()

        Toast.show({
            type: 'info',
            text1: 'Arte salva em favoritas'
        })
    }
    
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
                <TouchableOpacity onPress={favorite}>
                    <ContainerIconOptionMain>
                        <IconOptionMain name="star" size={30}/>
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