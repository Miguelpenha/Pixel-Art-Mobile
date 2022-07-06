import { IthemeType, ThemeNameType, Itheme } from './types'
import { dark, light } from './theme'
import { createContext, FC, useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appearance } from 'react-native'
import { ThemeProvider as ThemeStyledProvider } from 'styled-components'

interface IThemeContext {
    theme: Itheme
    themeName: IthemeType
    mutateTheme: ImutateTheme
}

type ImutateTheme = (mutateTheme?: IthemeType) => void

const themes = {
    [ThemeNameType.dark]: dark,
    [ThemeNameType.light]: light
}

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

const ThemeProvider: FC = ({ children }) => {
    const [themeName, setThemeName] = useState<IthemeType>(ThemeNameType.light)

    useEffect(() => {
        loadTheme()
    }, [themeName])

    async function loadTheme() {
        const themeName = await AsyncStorage.getItem('@pixelArt:theme') as (IthemeType | null)
        
        if (themeName) {
            setThemeName(themeName)
        } else {
            setThemeName(Appearance.getColorScheme() || 'light')
        }
    }

    function mutateTheme(themeName?: IthemeType) {
        let themeNameSelect: IthemeType

        if (themeName) {
            themeNameSelect = themeName
        } else {
            themeNameSelect = themeName === ThemeNameType.light ? ThemeNameType.dark : ThemeNameType.light
        }

        AsyncStorage.setItem('@pixelArt:theme', themeNameSelect)

        setThemeName(themeNameSelect)
    }

    return (
        <ThemeContext.Provider value={{theme: themes[themeName], mutateTheme, themeName}}>
            <ThemeStyledProvider theme={themes[themeName]}>
                {children}
            </ThemeStyledProvider>
        </ThemeContext.Provider>
    )
}

export default ThemeProvider