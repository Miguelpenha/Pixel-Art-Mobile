import { useAnimatedStyle, withSequence, withTiming } from 'react-native-reanimated'

function styleAnimationCollection(isAddedInCollection: boolean) {
    return useAnimatedStyle(() => ({
        transform: isAddedInCollection!==null ? [
            {
                translateY: withSequence(
                    withTiming(isAddedInCollection ? 5 : -5, {
                        duration: 250
                    }),
                    withTiming(isAddedInCollection ? -5 : 5, {
                        duration: 250
                    }),
                    withTiming(0, {
                        duration: 250
                    })
                )
            },
            {
                scale: withSequence(
                    withTiming(isAddedInCollection ? 1.2 : 0.6, {
                        duration: 250
                    }),
                    withTiming(1, {
                        duration: 250
                    })
                )
            }
        ] : []
    }), [isAddedInCollection])
}

export default styleAnimationCollection