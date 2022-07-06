import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getFavorites() {
    const favorites: string[] = JSON.parse(await AsyncStorage.getItem('@pixelArt:favorites'))

    return favorites
}

export async function setFavorite(artID: string) {
    let favorites = await getFavorites()

    AsyncStorage.setItem('@pixelArt:favorites', JSON.stringify(favorites ? [...favorites, artID] : [artID]))
}

export async function removeFavorite(artID: string) {
    let favorites = await getFavorites()
    
    if (favorites) {
        const favoritesSelect = []

        favorites.map(favorite => artID !== favorite && favoritesSelect.push(favorite))
        
        AsyncStorage.setItem('@pixelArt:favorites', JSON.stringify(favoritesSelect))
    }
}