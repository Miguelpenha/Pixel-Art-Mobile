import * as Updates from 'expo-updates'
import { green } from './colorsLogs'

async function updateApp(response?: boolean): Promise<void | boolean> {
  if (process.env.NODE_ENV === 'production') {
    const { isAvailable } = await Updates.checkForUpdateAsync()

    if (isAvailable) {
      if (Updates.releaseChannel === 'production') {
        console.log(green('>> Update Available'))

        await Updates.fetchUpdateAsync()
        await Updates.reloadAsync()
        
        if (response) {
          return true
        }
      }
    } else {
      if (response) {
        return false
      }
    }
  }
}

export default updateApp