import { Dispatch, SetStateAction } from 'react'
import { IArt } from '../../types'
import api from '../../api'

async function getArts(setArts: Dispatch<SetStateAction<IArt[]>>) {
    const { data } = await api.get('arts/find')

    setArts(data)
}

export default getArts