import { useState, useEffect, useRef } from 'react'
import { Iart } from '../../types'
import getArts from './getArts'
import Art from './Art'
import ContainerPd from '../../components/ContainerPd'
import { FlatList, ListRenderItemInfo } from 'react-native'
import Header from './Header'
import { Modalize } from 'react-native-modalize'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ModalFooterContent from './ModalFooterContent'
import ModalMoreContent from './ModalMoreContent'
import { useTheme } from 'styled-components'

export default function Home() {
  const [arts, setArts] = useState<Iart[]>([])
  const [artSelect, setArtSelect] = useState<Iart>(null)
  const modalFooter = useRef<Modalize>(null)
  const modalMore = useRef<Modalize>(null)
  const theme = useTheme()
  
  useEffect(() => {
    getArts(setArts).then()
  }, [])

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
  
  return (
    <ContainerPd>
      <FlatList
        data={arts}
        renderItem={RenderArt}
        ListHeaderComponent={Header}
        keyExtractor={(item: Iart) => item._id}
      />
      <Modalize ref={modalFooter} modalHeight={RFPercentage(50)} modalStyle={{backgroundColor: theme.backgroundColor}}>
        <ModalFooterContent art={artSelect}/>
      </Modalize>
      <Modalize ref={modalMore} modalHeight={RFPercentage(70)} modalStyle={{backgroundColor: theme.backgroundColor}}>
        <ModalMoreContent art={artSelect} modalRef={modalMore}/>
      </Modalize>
    </ContainerPd>
  )
}