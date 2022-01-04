import React, { useContext } from 'react'
import { Input, Button } from 'react-native-elements'
import { Context as LocationContext } from '../context/LocationContext'
import Spacer from './Spacer'

const TrackForm = () => {
  const { state, startRecording, stopRecording, changeName } = useContext(LocationContext)
  const { name, recording, locations } = state
  const [saveTrack] = useSaveTrack()

  return (
    <>
      <Spacer>
        <Input value={name} onChangeText={changeName} placeholder="Enter name" />
      </Spacer>
      <Spacer>
        <Button title={recording ? 'Stop' : 'Start Recording'} onPress={recording ? stopRecording : startRecording} />
      </Spacer>
      {!recording && locations.length ? (
        <Spacer>
          <Button title="Save Recording" onPress={saveTrack} />
        </Spacer>
      ) : null}
    </>
  )
}


export default TrackForm
