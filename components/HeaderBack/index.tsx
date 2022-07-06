import React, { FC, memo } from 'react'
import { ViewStyle, TextStyle } from 'react-native'
import { Container, ButtonBack, ContainerHeader, Title } from './style'

interface Iprops {
    title?: string
    style?: ViewStyle
    onClick: () => void
    buttonBack?: boolean
    styleTitle?: TextStyle
    iconSizeButtonBack?: number
    styleButtonBack?: ViewStyle
    styleButtonBackIcon?: TextStyle
    styleContainerHeader?: ViewStyle
}

const HeaderBack: FC<Iprops> = ({ style, onClick, buttonBack=true, styleButtonBack, iconSizeButtonBack, styleButtonBackIcon, styleContainerHeader, title, styleTitle }) => {
    if (!styleButtonBack) {
        styleButtonBack = {
            alignSelf: 'center'
        }
    }

    return (
        <Container style={style}>
            {buttonBack && (
                <ButtonBack
                    onClick={onClick}
                    style={styleButtonBack}
                    iconSize={iconSizeButtonBack}
                    styleIcon={styleButtonBackIcon}
                />
            )}
            <ContainerHeader style={styleContainerHeader}>
                {title && <Title style={styleTitle}>{title}</Title>}
            </ContainerHeader>
        </Container>
    )
}

export default memo(HeaderBack)