import { Theme } from '@react-navigation/native'
import { themes } from '.'

const { dark, light } = themes

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

const themesRoutes = {
    darkThemeRouter,
    lightThemeRouter
}

export default themesRoutes

export {
    darkThemeRouter,
    lightThemeRouter
}