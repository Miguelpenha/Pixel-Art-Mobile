import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Ipixel } from '../../types'
import uuid from 'react-native-uuid'
import ContainerPd from '../../components/ContainerPd'
import HeaderBack from '../../components/HeaderBack'
import {
    Arts,
    Title,
    ButtonColorSelectInfo,
    ColorSelectInfo,
    TextColorSelectInfo,
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
    IconButtonCreate
} from './style'
import Pixel from './Pixel'
import { useState, useRef, useEffect } from 'react'
import { ListRenderItemInfo } from 'react-native'
import Toast from 'react-native-toast-message'
import { RFPercentage } from 'react-native-responsive-fontsize'
import { Modalize } from 'react-native-modalize'
import { ColorPicker, IHoloPicker } from 'react-native-color-picker'
import Slider from '@react-native-community/slider'

function CreateArt() {
    const navigation = useNavigation()
    const theme = useTheme()
    const modalColorPicker = useRef<Modalize>(null)
    const [pixels, setPixels] = useState<Ipixel[]>([])
    const [pixelsCount, setPixelsCount] = useState(16)
    const [colorSelect, setColorSelect] = useState(theme.primary)

    useEffect(() => {
        function makePixels() {
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

        makePixels()
    }, [])
    
    return (
        <ContainerPd>
            <Arts
                ListHeaderComponent={() => <>
                    <HeaderBack onClick={() => navigation.goBack()}/>
                    <Title>Criar arte</Title>
                    <ButtonColorSelectInfo onPress={() => modalColorPicker.current.open()}>
                        <ColorSelectInfo color={colorSelect}/>
                        <TextColorSelectInfo>Mudar cor</TextColorSelectInfo>
                    </ButtonColorSelectInfo>
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
                </>}
                ListHeaderComponentStyle={{width: '100%'}}
                data={pixels}
                key={Math.sqrt(pixelsCount)}
                numColumns={Math.sqrt(pixelsCount)}
                contentContainerStyle={{alignItems: 'center'}}
                renderItem={({ item }: ListRenderItemInfo<Ipixel>) => (
                    <Pixel pixelOrigem={item} pixelsCount={pixelsCount} colorSelect={colorSelect}/>
                )}
                keyExtractor={(item: Ipixel) => item.id}
                ListFooterComponent={() => (
                    <ButtonCreate onPress={() => {
                        navigation.navigate('Home')
                        
                        Toast.show({
                            type: 'success',
                            text1: 'Arte criada com sucesso!'
                        })
                    }}>
                        <TextButtonCreate>Criar</TextButtonCreate>
                        <IconButtonCreate name="design-services" size={30}/>
                    </ButtonCreate>
                )}
            />
            <Modalize ref={modalColorPicker} modalHeight={RFPercentage(92)} modalStyle={{backgroundColor: theme.backgroundColor}}>
                <ColorPicker
                    style={{flex: 1, height: RFPercentage(89)}}
                    defaultColor={colorSelect}
                    onColorSelected={color => {
                        setColorSelect(color)
                        modalColorPicker.current.close()
                    }}
                    sliderComponent={Slider as unknown as IHoloPicker["sliderComponent"]}
                />
            </Modalize>
        </ContainerPd>
    )
}

export default CreateArt