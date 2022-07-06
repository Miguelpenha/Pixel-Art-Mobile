import React, { useState, useEffect, FC, Dispatch, SetStateAction } from 'react'
import { useNavigation } from '@react-navigation/native'
import ContainerPd from '../../components/ContainerPd'
import HeaderBack from '../../components/HeaderBack'
import { dark as darkTheme, light as lightTheme } from '../../theme'
import { ScrollView } from 'react-native'
import { ContainerSwitch, TextSwitch, Switch, Button, IconButton, IconUpdateButton, TextButton, Version, ContainerPoweredBy, TextPoweredBy, TextPoweredByName } from './style'
import Constants from 'expo-constants'
import checkUpdate from './checkUpdate'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useContext } from 'react'
import { ThemeContext } from '../../themeProvider'

function Settings() {
    const navigation = useNavigation()
    const { themeName, mutateTheme } = useContext(ThemeContext)
    const [dark, setDark] = useState(themeName==='light' ? false : true)
    const [checkUpdating, setCheckUpdating] = useState(false)
    
    return (
        <ContainerPd>
            <HeaderBack onClick={() => navigation.goBack()} title="Configurações"/>
            <ScrollView>
                <ContainerSwitch>
                    <TextSwitch>Tema escuro</TextSwitch>
                    <Switch trackColor={{false: darkTheme.secondary, true: lightTheme.secondary}} thumbColor={dark ? darkTheme.secondary : lightTheme.secondary} value={dark} onChange={() => {
                        dark ? setDark(false) : setDark(true)
                        mutateTheme(dark ? 'light' : 'dark')
                    }}/>
                </ContainerSwitch>
                <Button onPress={async () => {
                    await AsyncStorage.removeItem('@exercise-app:theme')

                    navigation.reset({
                        index: 0,
                        routes: [{ name: 'Home' }]
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