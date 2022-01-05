import '../_mockLocation'
import React, { useCallback, useContext } from 'react'
import { StyleSheet, StatusBar, Platform } from 'react-native'
import { Text } from 'react-native-elements'
import { NavigationEvents, SafeAreaView, withNavigationFocus } from 'react-navigation'
import Map from '../components/Map'
import { Context as LocationContext } from '../context/LocationContext'
import useLocation from '../hooks/useLocation'
import TrackForm from '../components/TrackForm'


const TrackCreateScreen = ({ isFocused }) => {
  const { state, addLocation } = useContext(LocationContext)
  const callback = useCallback((location) => {
    addLocation(location, state.recording)
  }, [state.recording])
  const [err] = useLocation(isFocused || state.recording, callback)

  return (
    <SafeAreaView forceInset={{ top: 'always' }} style={styles.AndroidSafeArea}>
      <Text h2>Create a Track</Text>
      <Map />
      <NavigationEvents onWillBlur={() => console.log('leaving')} />
      {err ? <Text>Please enable location services.</Text> : null}
      <TrackForm />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  AndroidSafeArea: {
    flex: 1,
    backgroundColor: "white",
    paddingTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
  }
})

export default withNavigationFocus(TrackCreateScreen)
