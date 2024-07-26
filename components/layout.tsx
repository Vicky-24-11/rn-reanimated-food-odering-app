import React, { ReactNode } from 'react'
import {
  View,
  StyleSheet,
  Text,
  SafeAreaView,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TouchableWithoutFeedback,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useRouter } from 'expo-router'
import Constants from 'expo-constants'
import HeaderBackIcon2 from '@/assets/icons/headerBackIcon2'
import Colors from '../constants/Colors'
// import fontFamily from '../constants/fontFamily'
import { getResponseSize } from '@/app/utils'
import HeaderCloseIcon from '@/assets/icons/headerCloseIcon'
import { StatusBar } from 'expo-status-bar'

interface LayoutProps {
  title?: string
  isShowHeader?: boolean
  isPaddingOff?: boolean
  children: ReactNode
  isStatusBarShow?: boolean
  isHideBackBtn?: boolean
  isHideScrollView?: boolean
  backBtnCallback?: () => void
  closeBtnCallback?: () => void
  isHideCloseBtn?: boolean
  safeAreaBgColor?: String
}
type Props = LayoutProps & View['props']
export default function Layout({
  title = '',
  isStatusBarShow = true,
  children,
  style,
  isPaddingOff,
  isHideBackBtn,
  isShowHeader = true,
  isHideScrollView = false,
  backBtnCallback,
  closeBtnCallback,
  isHideCloseBtn = false,
  safeAreaBgColor
}: Props) {
  const contentStyles = [styles.content, style, isPaddingOff && { padding: 0 }, !isShowHeader && { paddingTop: 24 }]

  return (
    <SafeAreaView style={[styles.view, isStatusBarShow && styles.statusBarHeight, { backgroundColor: safeAreaBgColor }]}>
      <StatusBar style='dark' />
      {isShowHeader && (
        <View style={styles.header}>
          <HeaderBackButton isHideBackBtn={isHideBackBtn} backBtnCallback={backBtnCallback} />
          <Text style={styles.title}>{title}</Text>
          <HeaderCloseButton isHideCloseBtn={isHideCloseBtn} closeBtnCallback={closeBtnCallback} />
        </View>
      )}
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={'height'}>
        {isHideScrollView ? (
          children
        ) : (
          <ScrollView
            scrollEnabled={true}
            showsVerticalScrollIndicator={true}
            keyboardShouldPersistTaps="always"
            keyboardDismissMode="on-drag"
            contentContainerStyle={{ flexGrow: 1 }}
          >
            <View style={contentStyles}>{children}</View>
          </ScrollView>
        )}
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const HeaderBackButton = ({
  isHideBackBtn,
  backBtnCallback,
}: Pick<LayoutProps, 'isHideBackBtn' | 'backBtnCallback'>) => {
  const router = useRouter()
  const { canGoBack } = useNavigation()

  if (!isHideBackBtn && (backBtnCallback || canGoBack())) {
    return (
      <TouchableWithoutFeedback onPress={backBtnCallback || router.back}>
        <View style={styles.backButtonContainer}>
          <HeaderBackIcon2 />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return <View style={styles.stub} />
}

const HeaderCloseButton = ({
  isHideCloseBtn,
  closeBtnCallback,
}: Pick<LayoutProps, 'isHideCloseBtn' | 'closeBtnCallback'>) => {
  const router = useRouter()
  const { canGoBack } = useNavigation()

  if (isHideCloseBtn && (closeBtnCallback || canGoBack())) {
    return (
      <TouchableWithoutFeedback onPress={closeBtnCallback || router.back}>
        <View style={styles.closeButtonContainer}>
          <HeaderCloseIcon />
        </View>
      </TouchableWithoutFeedback>
    )
  }

  return <View style={styles.stub} />
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingLeft: getResponseSize(16),
    paddingRight: getResponseSize(16),
  },
  statusBarHeight: {
    paddingTop: Platform.OS === 'android' ? Constants.statusBarHeight : 0,
  },
  backButtonContainer: {
    width: getResponseSize(50, false),
    height: getResponseSize(26 + 32),
    justifyContent: 'center',
    alignItems: 'flex-start',
  },
  closeButtonContainer: {
    width: getResponseSize(50, false),
    height: getResponseSize(26 + 32),
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  title: {
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingTop: getResponseSize(16),
    paddingBottom: getResponseSize(16),
    // fontFamily: fontFamily.DMSans700,
    fontSize: getResponseSize(20),
    lineHeight: getResponseSize(28),
    alignSelf: 'center',
  },
  stub: {
    width: getResponseSize(50, false),
    // backgroundColor: 'red',
  },
  content: {
    flex: 1,
    padding: getResponseSize(16),
    paddingTop: 0,
  },
})
