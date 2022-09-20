import { createContext, FC, useState, useEffect, useContext } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

interface ICollectionContext {
    collection: string[]
    loadCollection: () => Promise<void>
    setCollection: (arts: string[]) => Promise<void>
    addArtToCollection: (id: string) => Promise<void>
    removeArtToCollection: (id: string) => Promise<void>
}

export const CollectionContext = createContext<ICollectionContext>({} as ICollectionContext)

export const CollectionProvider: FC = ({ children }) => {
    const [collection, setCollection] = useState<string[]>([])
    
    async function loadCollection() {
        const collection: string[] = JSON.parse(await AsyncStorage.getItem('@pixelArt:collection'))
        
        if (collection) {
            setCollectionOnStorage(collection)
        } else {
            setCollection([])
        }
    }

    async function setCollectionOnStorage(collection: string[]) {
        AsyncStorage.setItem('@pixelArt:collection', JSON.stringify(collection))

        setCollection(collection)
    }

    async function addArtToCollection(id: string) {
        const collection: string[] = JSON.parse(await AsyncStorage.getItem('@pixelArt:collection')) || []

        collection.push(id)

        AsyncStorage.setItem('@pixelArt:collection', JSON.stringify(collection))

        setCollection(collection)
    }

    async function removeArtToCollection(id: string) {
        const collection: string[] = JSON.parse(await AsyncStorage.getItem('@pixelArt:collection'))
        const collectionNew: string[] = []

        collection.map(idMap => {
            if (idMap !== id) {
                collectionNew.push(idMap)
            }
        })

        AsyncStorage.setItem('@pixelArt:collection', JSON.stringify(collectionNew))

        setCollection(collectionNew)
    }

    useEffect(() => {
        loadCollection().then()
    }, [])
    
    return (
        <CollectionContext.Provider value={{collection, setCollection: setCollectionOnStorage, loadCollection, addArtToCollection, removeArtToCollection}}>
           {children}
        </CollectionContext.Provider>
    )
}

export function useCollection() {
    return useContext(CollectionContext)
}

export default useCollection