import { useNavigation } from '@react-navigation/native'
import { useTheme } from '../../theme'
import { useState } from 'react'
import ContainerPd from '../../components/ContainerPd'
import HeaderBack from '../../components/HeaderBack'
import { ScrollView } from 'react-native'
import { ContainerSwitch, TextSwitch, Switch, Button, IconButton, IconUpdateButton, TextButton, Version, ContainerPoweredBy, TextPoweredBy, TextPoweredByName } from './style'
import AsyncStorage from '@react-native-async-storage/async-storage'
import checkUpdate from './checkUpdate'
import Constants from 'expo-constants'
import { blue, red, magenta, yellow } from '../../utils/colorsLogs'
import Toast from 'react-native-toast-message'
import useCollection from '../../contexts/collectionContext'

function Settings() {
    const navigation = useNavigation()
    const { theme, themeName, mutateTheme, loadTheme } = useTheme()
    const [dark, setDark] = useState(themeName==='light' ? false : true)
    const [checkUpdating, setCheckUpdating] = useState(false)
    const { loadCollection } = useCollection()
    
    return (
        <ContainerPd>
            <HeaderBack onClick={() => navigation.goBack()} title="Configurações"/>
            <ScrollView>
                <ContainerSwitch>
                    <TextSwitch>Tema escuro</TextSwitch>
                    <Switch
                        value={dark}
                        thumbColor={dark ? theme.primary : theme.primary}
                        trackColor={{false: theme.secondary, true: theme.secondary}}
                        onChange={() => {
                            dark ? setDark(false) : setDark(true)
                            
                            console.log(blue(`>> Theme changed`))
                            console.log(magenta(`   >> ${dark ? 'light' : 'dark'}`))
                            
                            mutateTheme()
                        }}
                    />
                </ContainerSwitch>
                <Button onPress={async () => {
                    AsyncStorage.removeItem('@pixelArt:theme').then(() => {
                        AsyncStorage.removeItem('@pixelArt:collection').then(async () => {
                            console.log(yellow('>> All data has been deleted'))
                            console.log(red('   >> @pixelArt:theme'))
                            console.log(red('   >> @pixelArt:collection'))

                            Toast.show({
                                type: 'error',
                                text1: 'Dados Apagados'
                            })

                            await loadTheme()
                            await loadCollection()
                            
                            navigation.reset({
                                index: 0,
                                routes: [{
                                    name: 'Home'
                                }]
                            })
                        })
                    })
                }}>
                    <IconButton name="delete" size={30}/>
                    <TextButton>Apagar dados</TextButton>
                </Button>
                <Button disabled={checkUpdating} onPress={async () => checkUpdate(setCheckUpdating)} loading={checkUpdating}>
                    <IconUpdateButton checkUpdating={checkUpdating} name="sync" size={30}/>
                    <TextButton>Verificar atualizações</TextButton>
                </Button>
            </ScrollView>
            <Version>Versão {Constants.manifest.version}</Version>
            <ContainerPoweredBy>
                <TextPoweredBy>Powered by</TextPoweredBy>
                <TextPoweredByName>Miguel da Penha</TextPoweredByName>
            </ContainerPoweredBy>
        </ContainerPd>
    )
}

export default Settings