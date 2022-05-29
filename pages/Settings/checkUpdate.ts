import { Dispatch, SetStateAction } from 'react'
import updateApp from '../../utils/updateApp'

async function checkUpdate(setCheckUpdating: Dispatch<SetStateAction<boolean>>) {
    setCheckUpdating(true)

    await updateApp()
    
    setCheckUpdating(false)
}

export default checkUpdate