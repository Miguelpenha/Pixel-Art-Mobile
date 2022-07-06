import { useState, useRef, useEffect } from 'react'
import { Iart } from '../../types'
import { Modalize } from 'react-native-modalize'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import getArts from './getArts'
import { ListRenderItemInfo, FlatList, RefreshControl, Platform } from 'react-native'
import Art from './Art'
import ContainerPd from '../../components/ContainerPd'
import { ButtonCreate, IconButtonCreate, Loading } from './style'
import Header from './Header'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ModalFooterContent from './ModalFooterContent'
import ModalMoreContent from './ModalMoreContent'

export default function Home() {
  const [arts, setArts] = useState<Iart[]>(null)
  const [artSelect, setArtSelect] = useState<Iart>(null)
  const modalFooter = useRef<Modalize>(null)
  const modalMore = useRef<Modalize>(null)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const theme = useTheme()
  
  useEffect(() => {
    getArts(setArts).then()
  }, [])

  useFocusEffect(() => {
    getArts(setArts).then()
  })

  function RenderArt({ item }: ListRenderItemInfo<Iart>) {
    return (
      <Art
        art={item}
        onClickFooter={() => {
          setArtSelect(item)
          modalFooter.current.open()
        }}
        onClickMore={() => {
          setArtSelect(item)
          modalMore.current.open()
        }}
      />
    )
  }

  async function onRefreshAction() {
    setRefreshing(true)

    await getArts(setArts)

    setRefreshing(false)
  }
  
  if (arts) {
    return (
      <ContainerPd>
        <ButtonCreate onPress={() => navigation.navigate('CreateArt')}>
            <IconButtonCreate name="add" size={35}/>
        </ButtonCreate>
        <FlatList
          data={arts}
          renderItem={RenderArt}
          ListHeaderComponent={Header}
          keyExtractor={(item: Iart) => item._id}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              colors={[theme.primary]}
              onRefresh={onRefreshAction}
              progressViewOffset={RFPercentage(18)}
              progressBackgroundColor={theme.secondary}
            />
          )}
        />
        <Modalize ref={modalFooter} modalHeight={RFPercentage(50)} modalStyle={{backgroundColor: theme.backgroundColor}}>
          <ModalFooterContent art={artSelect}/>
        </Modalize>
        <Modalize ref={modalMore} modalHeight={RFPercentage(70)} modalStyle={{backgroundColor: theme.backgroundColor}}>
          <ModalMoreContent art={artSelect} modalRef={modalMore}/>
        </Modalize>
      </ContainerPd>
    )
  } else {
    return <Loading color={theme.primary} size={Platform.OS === 'android' ? 50 : 'large'}/>
  }
}