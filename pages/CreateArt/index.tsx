import { useNavigation } from '@react-navigation/native'
import uuid from 'react-native-uuid'
import ContainerPd from '../../components/ContainerPd'
import HeaderBack from '../../components/HeaderBack'
import { Title } from './style'
import { FlatList } from 'react-native'
import Pixel from './Pixel'

function CreateArt() {
    const navigation = useNavigation()
    const pixels =[]

    for (let cont = 0;cont < 9;cont++) {
        pixels.push({
            id: uuid.v4()
        })
    }

    return (
        <ContainerPd>
            <HeaderBack onClick={() => navigation.goBack()}/>
            <Title>Criar arte</Title>
            <FlatList style={{flexBasis: 0, marginTop: '20%'}} data={pixels} renderItem={() => <Pixel/>} numColumns={Math.sqrt(pixels.length)} keyExtractor={item => item.id}/>
        </ContainerPd>
    )
}

export default CreateArt