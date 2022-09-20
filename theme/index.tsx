import { IthemeType, ThemeNameType, Itheme } from '../types'
import { createContext, FC, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appearance } from 'react-native'
import { ThemeProvider as ThemeStyledProvider } from 'styled-components'
import themesLightAndDark from './theme'

interface IThemeContext {
    theme: Itheme
    themeName: IthemeType
    mutateTheme: IMutateTheme
    loadTheme: () => Promise<void>
}

type IMutateTheme = (mutateTheme?: IthemeType) => void

export const ThemeContext = createContext<IThemeContext>({} as IThemeContext)

export const ThemeProvider: FC = ({ children }) => {
    const [themeName, setThemeName] = useState<IthemeType>(ThemeNameType.light)
    
    useEffect(() => {
        loadTheme().then()
    }, [themeName])
    
    async function loadTheme() {
        const themeName = await AsyncStorage.getItem('@pixelArt:theme') as (IthemeType | null)
        
        if (themeName) {
            setThemeName(themeName)
        } else {
            setThemeName(Appearance.getColorScheme() || 'light')
            AsyncStorage.setItem('@pixelArt:theme', Appearance.getColorScheme() || 'light')
        }
    }

    function mutateTheme(themeNameMutate?: IthemeType) {
        let themeNameSelect: IthemeType

        if (themeNameMutate) {
            themeNameSelect = themeNameMutate
        } else {
            themeNameSelect = themeName === ThemeNameType.light ? ThemeNameType.dark : ThemeNameType.light
        }

        AsyncStorage.setItem('@pixelArt:theme', themeNameSelect)

        setThemeName(themeNameSelect)
    }

    return (
        <ThemeContext.Provider value={{theme: themes[themeName], mutateTheme, themeName, loadTheme}}>
            <ThemeStyledProvider theme={themes[themeName]}>
                {children}
            </ThemeStyledProvider>
        </ThemeContext.Provider>
    )
}

export function useTheme() {
    return useContext(ThemeContext)
}

export const themes = themesLightAndDark

export default useTheme