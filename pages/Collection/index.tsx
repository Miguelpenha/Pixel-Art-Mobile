import { useState, useRef, useEffect } from 'react'
import { IArt } from '../../types'
import { Modalize } from 'react-native-modalize'
import { useNavigation, useRoute, useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import { ListRenderItemInfo, FlatList, RefreshControl, Platform } from 'react-native'
import Art from './Art'
import ContainerPd from '../../components/ContainerPd'
import HeaderBack from '../../components/HeaderBack'
import { MessageNotFound, Loading } from './style'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ModalFooterContent from './ModalFooterContent'
import ModalMoreContent from './ModalMoreContent'
import ModalQRCode from './ModalQRCode'
import optionsModalize from '../../components/optionsModalize'
import useCollection from '../../contexts/collectionContext'
import api from '../../api'

interface IParams {
  scrollTo: string
}

export default function Collection() {
  const { data: arts, mutate: mutateArts } = api.get<IArt[]>('/arts/find')
  const [artSelect, setArtSelect] = useState<IArt>(null)
  const modalFooter = useRef<Modalize>(null)
  const modalMore = useRef<Modalize>(null)
  const modalQRCode = useRef<Modalize>(null)
  const [refreshing, setRefreshing] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const navigation = useNavigation()
  const { scrollTo }  = useRoute().params as IParams
  const theme = useTheme()
  const { collection } = useCollection()
  const refArts = useRef<FlatList>(null)

  useEffect(() => {
    mutateArts().then()
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
    mutateArts().then()
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

    mutateArts().then()
    
    setRefreshing(false)
  }
  
  if (arts) {
    return (
      <ContainerPd>
        <FlatList
          data={arts}
          ref={refArts}
          renderItem={RenderArt}
          ListHeaderComponent={() => <>
            <HeaderBack onClick={() => navigation.goBack()} title="Coleção"/>
            {collection.length < 1 && <MessageNotFound>Não há artes na sua coleção &#x1F615;</MessageNotFound>}
          </>}
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
        <Modalize {...optionsModalize(theme, 60, 25)} ref={modalFooter}>
          <ModalFooterContent art={artSelect}/>
        </Modalize>
        <Modalize {...optionsModalize(theme, 90, 64)} ref={modalMore}>
          <ModalMoreContent art={artSelect} modalRef={modalMore} onQRCode={() => {
            modalQRCode.current.open()
            modalMore.current.close()
          }}/>
        </Modalize>
        <Modalize {...optionsModalize(theme, 90, 48)} ref={modalQRCode}>
          <ModalQRCode art={artSelect}/>
        </Modalize>
      </ContainerPd>
    )
  } else {
    return <Loading color={theme.primary} size={Platform.OS === 'android' ? 50 : 'large'}/>
  }
}