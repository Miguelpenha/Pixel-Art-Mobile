import { MaterialIcons } from '@expo/vector-icons'
import { ViewStyle, TextStyle, ViewProps, TextProps, TouchableOpacity } from 'react-native'
import { FC, memo } from 'react'
import { Icon } from './style'

interface Iprops {
    onClick: () => void
    iconName?: keyof typeof MaterialIcons.glyphMap
    iconSize?: number
    style?: ViewStyle
    styleIcon?: TextStyle
    containerProps?: ViewProps
    iconProps?: TextProps
}

const ButtonBack: FC<Iprops> = ({ onClick, iconName='arrow-back-ios', iconSize=22, style, styleIcon, containerProps, iconProps, ...rest }) => {
    return (
        <TouchableOpacity style={style} onPress={onClick} {...containerProps} {...rest}>
            <Icon name={iconName} size={iconSize} style={styleIcon} {...iconProps}/>
        </TouchableOpacity>
    )
}

export default memo(ButtonBack)