export interface Itheme {
  color: string
  error: string
  success: string
  primary: string
  name: IthemeType
  likeColor: string
  secondary: string
  viewLastColor: string
  secondaryColor: string
  backgroundColor: string
  backgroundColorSecondary: string
}

export enum ThemeNameType {
  dark = 'dark',
  light = 'light'
}

export type IthemeType = keyof typeof ThemeNameType

export type Inavigation = {
  Home: undefined
  Settings: undefined
  CreateArt: undefined
  Collection: undefined
}

export interface Ipixel {
  id: string
  color: string
}

export interface IArt {
  _id?: string
  name: string
  pixelsCont: number
  sizePixel: number
  url: string
  colors: string[]
  pixels: Ipixel[]
}