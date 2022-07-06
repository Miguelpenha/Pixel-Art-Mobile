import { Dispatch, SetStateAction } from 'react'
import updateApp from '../../utils/updateApp'
import { blue } from '../../utils/colorsLogs'

async function checkUpdate(setCheckUpdating: Dispatch<SetStateAction<boolean>>) {
    setCheckUpdating(true)

    await updateApp()

    console.log(blue('>> Updates Checked'))
    
    setCheckUpdating(false)
}

export default checkUpdate