import { useNavigation } from '@react-navigation/native'
import { Container, ContainerSettings, Settings, ContainerCollection, Collection, Title } from './style'
import { memo } from 'react'

function Header() {
    const navigation = useNavigation()

    return <>
        <Container>
            <ContainerSettings onPress={() => navigation.navigate('Settings')}>
                <Settings name="settings" size={40}/>
            </ContainerSettings>
            <ContainerCollection onPress={() => navigation.navigate('Collection')}>
                <Collection name="bookmark" size={40}/>
            </ContainerCollection>
        </Container>
        <Title>Pixel Art</Title>
    </>
}

export default memo(Header)