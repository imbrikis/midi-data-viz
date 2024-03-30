// @ts-nocheck

import { useState, useEffect } from 'react'

export const useListenForMidi = () => {
  const [midiMessage, setMidiMessage] = useState()
  const [noteIsPlaying, setNoteIsPlaying] = useState(false)

  const midiCommand = midiMessage?.[0]

  const updateDevices = (e: any) => {
    console.log(`${e.port.name} has been ${e.port.state}`)
  }

  type PortStateChangeEvent = {
    e: {
      data: [number, number, number]
    }
  }

  const handlePortStateChange = (e: Event) => {
    console.log(e)
    // @ts-ignore
    setMidiMessage(e.data)
  }

  const accessMidi = async (connection: 'connect' | 'disconnect') => {
    const req = await navigator.requestMIDIAccess()
    if (connection === 'connect') {
      req.addEventListener('statechange', updateDevices)
    } else {
      req.removeEventListener('statechange', updateDevices)
    }

    const inputs = req.inputs.values()
    for (const input of inputs) {
      if (connection === 'connect') {
        input.addEventListener('midimessage', handlePortStateChange)
      } else {
        input.removeEventListener('midimessage', handlePortStateChange)
      }
    }
  }

  useEffect(() => {
    if (midiCommand === 144) {
      setNoteIsPlaying(true)
    } else {
      setNoteIsPlaying(false)
    }
  }, [midiMessage, midiCommand])

  // @ts-ignore
  useEffect(() => {
    accessMidi('connect')

    return () => accessMidi('disconnect')
  }, [])

  return { midiMessage, noteIsPlaying }
}
