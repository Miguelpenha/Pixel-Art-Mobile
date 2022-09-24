import { useState, useRef, useEffect } from 'react'
import { IArt } from '../../types'
import { Modalize } from 'react-native-modalize'
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import { useTheme } from 'styled-components'
import getArts from './getArts'
import { ListRenderItemInfo, FlatList, RefreshControl, Platform } from 'react-native'
import Art from './Art'
import ContainerPd from '../../components/ContainerPd'
import { ContainerButtonCreate, ButtonCreate, IconButtonCreate, Loading } from './style'
import Header from './Header'
import { RFPercentage } from 'react-native-responsive-fontsize'
import ModalFooterContent from './ModalFooterContent'
import ModalMoreContent from './ModalMoreContent'
import ModalQRCode from './ModalQRCode'
import optionsModalize from '../../components/optionsModalize'
import Animated, { useSharedValue, useAnimatedStyle, withTiming } from 'react-native-reanimated'

export default function Home() {
  const [arts, setArts] = useState<IArt[]>(null)
  const [artSelect, setArtSelect] = useState<IArt>(null)
  const modalFooter = useRef<Modalize>(null)
  const modalMore = useRef<Modalize>(null)
  const modalQRCode = useRef<Modalize>(null)
  const [refreshing, setRefreshing] = useState(false)
  const navigation = useNavigation()
  const theme = useTheme()
  const pressed = useSharedValue(1)
  const pressedIcon = useSharedValue(1)
  
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

  const styleAnimationOptionMain = useAnimatedStyle(() => ({
      transform: [{ scale: pressed.value }]
  }), [])

  const styleAnimationIconOptionMain = useAnimatedStyle(() => ({
      transform: [{ scale: pressedIcon.value }]
  }), [])
  
  if (arts) {
    return (
      <ContainerPd>
        <Animated.View style={[styleAnimationOptionMain, ContainerButtonCreate]}>
          <ButtonCreate
            onPress={() => {
              pressed.value = withTiming(0.8, {
                duration: 100
              })

              pressedIcon.value = withTiming(0.8, {
                duration: 200
              })
              
              setTimeout(() => {
                navigation.navigate('CreateArt')

                pressed.value = withTiming(1, {
                  duration: 100
                })

                pressedIcon.value = withTiming(1, {
                    duration: 200
                })
              }, 200)
            }}
            activeOpacity={0.5}
            onPressIn={() => {
                pressed.value = withTiming(0.8)

                pressedIcon.value = withTiming(0.8, {
                    duration: 900
                })
            }}
            onPressOut={() => {
                pressed.value = withTiming(1)

                pressedIcon.value = withTiming(1, {
                    duration: 900
                })
            }}
          >
            <Animated.View style={styleAnimationIconOptionMain}>
              <IconButtonCreate name="add" size={35}/>
            </Animated.View>
          </ButtonCreate>
        </Animated.View>
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
              progressViewOffset={RFPercentage(13)}
              progressBackgroundColor={theme.secondary}
            />
          )}
        />
        <Modalize {...optionsModalize(theme, 50, 20)} ref={modalFooter}>
          <ModalFooterContent art={artSelect}/>
        </Modalize>
        <Modalize {...optionsModalize(theme, 90, 60)} ref={modalMore}>
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