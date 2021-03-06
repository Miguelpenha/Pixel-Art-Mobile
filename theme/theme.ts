import { Itheme, ThemeNameType } from '../types'

export const dark: Itheme = {
    name: 'dark',
    backgroundColor: '#121212',
    backgroundColorSecondary: '#262626',
    secondary: '#333333',
    secondaryColor: '#c5c5c5',
    primary: '#0085FF',
    color: '#f2f2f2',
    check: '#2fcc8d',
    likeColor: '#bf2431',
    viewLastColor: '#006acc'
}

export const light: Itheme = {
    name: 'light',
    backgroundColor: '#ffffff',
    backgroundColorSecondary: '#bfbfbf',
    secondary: '#cccccc',
    secondaryColor: '#797979',
    primary: '#0085FF',
    color: '#ffffff',
    check: '#4efdb7',
    likeColor: '#bf2431',
    viewLastColor: '#006acc'
}

export default {
    [ThemeNameType.dark]: dark,
    [ThemeNameType.light]: light
}