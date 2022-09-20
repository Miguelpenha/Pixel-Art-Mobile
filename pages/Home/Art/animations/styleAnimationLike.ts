import { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated'

function styleAnimationLike(like: boolean) {
    return useAnimatedStyle(() => ({
        transform: like!==null ? [{
            scale: withSequence(
                withTiming(like ? 1.2 : 0.6, {
                    duration: 250
                }),
                withTiming(1, {
                    duration: 250
                })
            )
        }] : []
    }), [like])
}

export default styleAnimationLike