import { memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, ContainerSettings, Settings, Title } from './style'

function Header() {
    const navigation = useNavigation()

    return <>
        <Container>
            <ContainerSettings onPress={() => navigation.navigate('Settings')}>
                <Settings name="settings" size={40}/>
            </ContainerSettings>
        </Container>
        <Title>Pixel Art</Title>
    </>
}

export default memo(Header)