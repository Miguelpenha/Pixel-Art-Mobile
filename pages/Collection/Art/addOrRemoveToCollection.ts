import { Dispatch, SetStateAction } from 'react'
import { IArt } from '../../../types'
import { blue, magenta } from '../../../utils/colorsLogs'
import Toast from 'react-native-toast-message'

async function addOrRemoveToCollection(isAddedInCollection: boolean, setIsAddedInCollection: Dispatch<SetStateAction<boolean>>, addArtToCollection: (id: string) => Promise<void>, removeArtToCollection: (id: string) => Promise<void>, art: IArt) {
    if (!isAddedInCollection) {
        await addArtToCollection(art._id)

        setIsAddedInCollection(true)

        console.log(blue('>> Pixel art added to collection'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))

        Toast.show({
            type: 'info',
            text1: 'Arte salva na coleção'
        })
    } else {
        await removeArtToCollection(art._id)

        setIsAddedInCollection(false)
        
        console.log(blue('>> Pixel art removed from collection'))
        console.log(magenta(`   >> ID: ${art._id}`))
        console.log(magenta(`   >> Name: ${art.name}`))

        Toast.show({
            type: 'error',
            text1: 'Arte removida da coleção'
        })
    }
}

export default addOrRemoveToCollection