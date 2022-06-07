import { memo } from 'react'
import { useNavigation } from '@react-navigation/native'
import { Container, ContainerSettings, Settings, Title, ButtonCreate, IconButtonCreate } from './style'

function Header() {
    const navigation = useNavigation()

    return <>
        <Container>
            <ContainerSettings onPress={() => navigation.navigate('Settings')}>
                <Settings name="settings" size={40}/>
            </ContainerSettings>
        </Container>
        <Title>Pixel Art</Title>
        <ButtonCreate onPress={() => navigation.navigate('CreateArt')}>
            <IconButtonCreate name="add" size={35}/>
        </ButtonCreate>
    </>
}

export default memo(Header)