export interface Itheme {
  name: string
  color: string
  check: string
  primary: string
  secondary: string
  secondaryColor: string
  backgroundColor: string
}

export type Inavigation = {
  Home: undefined
  Settings: undefined
}

export interface Ipixel {
  id: string
  color: string
}

export interface Iart {
  _id: string
  name: string
  pixelsCont: number
  sizePixel: number
  url: string
  colors: string[]
  pixels: Ipixel[]
}