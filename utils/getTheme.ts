import { Dispatch, SetStateAction, DependencyList, useCallback } from 'react'
import { useFocusEffect } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Appearance } from 'react-native'

type IthemeType = 'light' | 'dark'

async function getThemeFunction(setTheme?: Dispatch<SetStateAction<IthemeType>>) {
    const data = await AsyncStorage.getItem('@exercise-app:theme') as IthemeType
    const dataFinally = data || Appearance.getColorScheme() || 'light'

    !data && AsyncStorage.setItem('@exercise-app:theme', dataFinally)
    setTheme && setTheme(dataFinally)

    return dataFinally
}

function getTheme(setTheme?: Dispatch<SetStateAction<IthemeType>>, work?: Function, dependencies?: DependencyList) {
    useFocusEffect(
        useCallback(() => {
            getThemeFunction(setTheme).then()
            work && work()
        }, dependencies || [])
    )
}

export {
    getThemeFunction,
    getTheme
}

export default getTheme