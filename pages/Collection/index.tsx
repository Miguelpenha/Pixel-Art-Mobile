import { useState, useRef, useEffect } from 'react'
import { IArt } from '../../types'
import { Modalize } from 'react-native-modalize'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import getArts from './getArts'
import { ListRenderItemInfo, FlatList, RefreshControl, Platform } from 'react-native'
import Art from './Art'
import ContainerPd from '../../components/ContainerPd'
import HeaderBack from '../../components/HeaderBack'
import { Loading } from './style'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ModalFooterContent from './ModalFooterContent'
import ModalMoreContent from './ModalMoreContent'
import optionsModalize from '../../components/optionsModalize'
import useCollection from '../../contexts/collectionContext'

interface IParams {
  scrollTo: string
}

export default function Collection() {
  const [arts, setArts] = useState<IArt[]>(null)
  const [artSelect, setArtSelect] = useState<IArt>(null)
  const modalFooter = useRef<Modalize>(null)
  const modalMore = useRef<Modalize>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigation = useNavigation()
  const { scrollTo }  = useRoute().params as IParams
  const theme = useTheme()
  const { collection } = useCollection()
  const refArts = useRef<FlatList>(null)

  useEffect(() => {
    getArts(setArts).then()
  }, [])

  useEffect(() => {
    if (!isScrolled && scrollTo && arts && refArts?.current) {
      arts.map((art, index) => {
        if (art._id === scrollTo) {
          setIsScrolled(true)

          refArts?.current.scrollToItem({
            item: arts[index],
            animated: true
          })
        }
      })
    }
  }, [arts, scrollTo])

  useFocusEffect(() => {
    getArts(setArts).then()
  })

  function RenderArt({ item }: ListRenderItemInfo<IArt>) {
    if (collection.includes(item._id)) {
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
  }

  async function onRefreshAction() {
    setRefreshing(true)

    await getArts(setArts)

    setRefreshing(false)
  }
  
  if (arts) {
    return (
      <ContainerPd>
        <FlatList
          data={arts}
          ref={refArts}
          renderItem={RenderArt}
          ListHeaderComponent={() => (
            <HeaderBack onClick={() => navigation.goBack()} title="Coleção"/>
          )}
          getItemLayout={(data, index) => ({length: RFPercentage(65), offset: RFPercentage(65)*index, index})}
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
        <Modalize {...optionsModalize(theme, 50, 20)} ref={modalFooter}>
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