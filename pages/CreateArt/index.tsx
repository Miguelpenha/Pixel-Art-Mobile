import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { useRef, useState, useEffect } from 'react'
import { Modalize } from 'react-native-modalize'
import { Ipixel } from '../../types'
import { TextInput, ListRenderItemInfo, Platform } from 'react-native'
import uuid from 'react-native-uuid'
import {
    Arts,
    ContainerMutateNumber,
    TitleMutateNumber,
    DataMutateNumber,
    ContainerLeftMutateNumber,
    IconLeftMutateNumber,
    TextMutateNumber,
    ContainerRightMutateNumber,
    IconRightMutateNumber,
    ButtonCreate,
    TextButtonCreate,
    IconButtonCreate,
    ContainerColorPicker,
    ButtonSubmitColor,
    TextButtonSubmitColor,
    Loading
} from './style'
import Toast from 'react-native-toast-message'
import ContainerPd from '../../components/ContainerPd'
import Pixel from './Pixel'
import api from '../../api/base'
import { IArt } from '../../types'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ColorPicker from 'react-native-wheel-color-picker'
import { blue, magenta } from '../../utils/colorsLogs'
import limitText from '../../utils/limitText'
import Header from './Header'

function CreateArt() {
    const navigation = useNavigation()
    const theme = useTheme()
    const modalColorPicker = useRef<Modalize>(null)
    const [pixels, setPixels] = useState<Ipixel[]>([])
    const [pixelsCount, setPixelsCount] = useState(25)
    const [loadingCreate, setLoadingCreate] = useState(false)
    const [colorSelect, setColorSelect] = useState(theme.primary)
    const [name, setName] = useState('')
    const nameRef = useRef<TextInput>(null)

    function makePixels() {
        setPixels([])

        for (let cont = 0;cont < pixelsCount;cont++) {
            setPixels(pixels => [
                ...pixels,
                {
                    id: String(uuid.v4()),
                    color: theme.secondary
                }
            ])
        }
    }

    useEffect(() => makePixels(), [pixelsCount])

    function HeaderFunction() {
        return (
            <Header
                name={name}
                nameRef={nameRef}
                setName={setName}
                clear={makePixels}
                colorSelect={colorSelect}
                modalColorPicker={modalColorPicker}
            />
        )
    }
    
    return (
        <ContainerPd>
            <Arts
                data={pixels}
                key={Math.sqrt(pixelsCount)}
                numColumns={Math.sqrt(pixelsCount)}
                ListHeaderComponent={HeaderFunction()}
                contentContainerStyle={{alignItems: 'center'}}
                renderItem={({ item }: ListRenderItemInfo<Ipixel>) => (
                    <Pixel pixels={pixels} setPixels={setPixels} pixel={item} pixelsCount={pixelsCount} colorSelect={colorSelect}/>
                )}
                keyExtractor={(item: Ipixel) => item.id}
                ListFooterComponent={() => <>
                    <ContainerMutateNumber>
                        <TitleMutateNumber>Tamanho da arte</TitleMutateNumber>
                        <DataMutateNumber>
                            <ContainerLeftMutateNumber onPress={() => setPixelsCount((Math.sqrt(pixelsCount)-1)*(Math.sqrt(pixelsCount)-1))}>
                                <IconLeftMutateNumber name="remove" size={30}/>
                            </ContainerLeftMutateNumber>
                            <TextMutateNumber>{Math.sqrt(pixelsCount)}</TextMutateNumber>
                            <ContainerRightMutateNumber onPress={() => setPixelsCount((Math.sqrt(pixelsCount)+1)*(Math.sqrt(pixelsCount)+1))}>
                                <IconRightMutateNumber name="add" size={30}/>
                            </ContainerRightMutateNumber>
                        </DataMutateNumber>
                    </ContainerMutateNumber>
                    <ButtonCreate onPress={async () => {
                        if (name) {
                            setLoadingCreate(true)
                            
                            const { download: urlDownload } = (await api.post('/arts/makeImage', {
                                pixels: pixels,
                                pixelsCont: pixelsCount
                            })).data
                            
                            const { data: art } = await api.post<IArt>('/arts/create', {
                                name: name,
                                pixelsCont: pixelsCount,
                                sizePixel: 80,
                                pixels,
                                url: urlDownload
                            })

                            console.log(blue('>> Pixel art created'))
                            console.log(magenta(`  >> ID: ${art._id}`))
                            console.log(magenta(`  >> Name: ${art.name}`))
                            console.log(magenta(`  >> Pixels Count: ${art.pixelsCont}`))
                            console.log(magenta(`  >> Size Pixel: ${art.sizePixel}`))
                            console.log(magenta(`  >> URL: ${limitText(art.url, 50)}`))
                            console.log(magenta(`  >> Colors: ${art.colors.map((color, index) => `${index === 0 ? '' : ' '}${color}`)}`))
                            
                            setLoadingCreate(false)
    
                            navigation.navigate('Home')
                            
                            Toast.show({
                                type: 'success',
                                text1: `Arte ${name} criada com sucesso!`
                            })
                        } else {
                            nameRef.current.focus()

                            Toast.show({
                                type: 'error',
                                text1: 'É preciso fornecer um nome para a arte'
                            })
                        }
                    }}>
                        {!loadingCreate ? <>
                            <TextButtonCreate>Criar</TextButtonCreate>
                            <IconButtonCreate name="design-services" size={35}/>
                        </> : (
                            <Loading color={theme.color} size={Platform.OS === 'android' ? 40 : 'small'}/>
                        )}
                    </ButtonCreate>
                </>}
            />
            <Modalize ref={modalColorPicker} modalHeight={RFPercentage(75)} modalStyle={{backgroundColor: theme.backgroundColor}}>
                <ContainerColorPicker>
                    <ColorPicker
                        color={colorSelect}
                        onColorChangeComplete={setColorSelect}
                    />
                </ContainerColorPicker>
                <ButtonSubmitColor onPress={() => modalColorPicker.current.close()}>
                    <TextButtonSubmitColor>Mudar cor</TextButtonSubmitColor>
                </ButtonSubmitColor>
            </Modalize>
        </ContainerPd>
    )
}

export default CreateArt