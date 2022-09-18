import { useState, useRef, useEffect } from 'react'
import { IArt } from '../../types'
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
import optionsModalize from '../../components/optionsModalize'

export default function Home() {
  const [arts, setArts] = useState<IArt[]>(null)
  const [artSelect, setArtSelect] = useState<IArt>(null)
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

  function RenderArt({ item }: ListRenderItemInfo<IArt>) {
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
          keyExtractor={(item: IArt) => item._id}
          refreshControl={(
            <RefreshControl
              refreshing={refreshing}
              colors={[theme.primary]}
              onRefresh={onRefreshAction}
              progressViewOffset={RFPercentage(11.5)}
              progressBackgroundColor={theme.secondary}
            />
          )}
        />
        <Modalize {...optionsModalize(theme, 50)} ref={modalFooter}>
          <ModalFooterContent art={artSelect}/>
        </Modalize>
        <Modalize {...optionsModalize(theme, 90, 50)} ref={modalMore}>
          <ModalMoreContent art={artSelect} modalRef={modalMore}/>
        </Modalize>
      </ContainerPd>
    )
  } else {
    return <Loading color={theme.primary} size={Platform.OS === 'android' ? 50 : 'large'}/>
  }
}