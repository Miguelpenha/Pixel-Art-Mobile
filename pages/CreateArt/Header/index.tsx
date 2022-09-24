import { MutableRefObject, Dispatch, SetStateAction, FC, memo } from 'react'
import { TextInput, View } from 'react-native'
import { IHandles } from 'react-native-modalize/lib/options'
import { useNavigation } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { Title, Name, Options, ButtonColor, ColorButtonColor, TextButtonColor, ButtonClear, IconButtonClear } from './style'
import HeaderBack from '../../../components/HeaderBack'
import Toast from 'react-native-toast-message'

interface Iprops {
    name: string
    clear: () => void
    colorSelect: string
    nameRef: MutableRefObject<TextInput>
    setName: Dispatch<SetStateAction<string>>
    modalColorPicker: MutableRefObject<IHandles>
}

const Header: FC<Iprops> = ({ nameRef, name, setName, modalColorPicker, colorSelect, clear, ...props }) => {
    const navigation = useNavigation()
    const theme = useTheme()

    return (
        <View {...props}>
            <HeaderBack onClick={() => navigation.goBack()} title="Criar arte"/>
            <Title>Criar arte</Title>
            <Name
                autoCorrect
                ref={nameRef}
                defaultValue={name}
                onChangeText={setName}
                autoCapitalize="sentences"
                placeholder="Nome da arte..."
                selectionColor={theme.primary}
                placeholderTextColor={theme.secondaryColor}
            />
            <Options>
                <ButtonColor onPress={() => modalColorPicker.current.open()}>
                    <ColorButtonColor color={colorSelect}/>
                    <TextButtonColor>Mudar cor</TextButtonColor>
                </ButtonColor>
                <ButtonClear onPress={() => {
                    clear()
                    
                    Toast.show({
                        type: 'info',
                        text1: 'Arte limpa',
                        onPress() {
                            Toast.hide()
                        }
                    })
                }}>
                    <IconButtonClear name="cached" size={30}/>
                </ButtonClear>
            </Options>
        </View>
    )
}

export default memo(Header)