import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getCollection() {
    const collection: string[] = JSON.parse(await AsyncStorage.getItem('@pixelArt:collection'))

    return collection
}

export async function addToCollection(artID: string) {
    let collection = await getCollection()

    AsyncStorage.setItem('@pixelArt:collection', JSON.stringify(collection ? [...collection, artID] : [artID]))
}

export async function removeFromCollection(artID: string) {
    let collection = await getCollection()
    
    if (collection) {
        const collectionSelect = []

        collectionSelect.map(art => artID !== art && collectionSelect.push(art))
        
        AsyncStorage.setItem('@pixelArt:collection', JSON.stringify(collectionSelect))
    }
}