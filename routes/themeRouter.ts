import { Theme } from '@react-navigation/native'
import { dark, light } from '../theme'

const darkThemeRouter: Theme = {
    colors: {
        background: dark.backgroundColor,
        border: dark.color,
        card: dark.primary,
        notification: dark.secondary,
        primary: dark.primary,
        text: dark.color
    },
    dark: true
}

const lightThemeRouter: Theme = {
    colors: {
        background: light.backgroundColor,
        border: light.color,
        card: light.primary,
        notification: light.secondary,
        primary: light.primary,
        text: light.color
    },
    dark: false
}

export {
    darkThemeRouter,
    lightThemeRouter
}