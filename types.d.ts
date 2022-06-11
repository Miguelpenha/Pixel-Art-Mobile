export interface Itheme {
  name: string
  color: string
  check: string
  primary: string
  likeColor: string
  secondary: string
  viewLastColor: string
  secondaryColor: string
  backgroundColor: string
  backgroundColorSecondary: string
}

export type IthemeType = 'light' | 'dark'

export type Inavigation = {
  Home: undefined
  Settings: undefined
  CreateArt: undefined
}

export interface Ipixel {
  id: string
  color: string
}

export interface Iart {
  _id?: string
  name: string
  pixelsCont: number
  sizePixel: number
  url: string
  colors: string[]
  pixels: Ipixel[]
}