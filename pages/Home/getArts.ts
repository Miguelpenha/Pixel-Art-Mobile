import { Dispatch, SetStateAction } from 'react'
import { Iart } from '../../types'
import api from '../../api'

async function getArts(setArts: Dispatch<SetStateAction<Iart[]>>) {
    const { data } = await api.get('arts/find')

    setArts(data)
}

export default getArts