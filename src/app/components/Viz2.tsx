'use client'
import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

import { enter, update, exit } from './Viz2.helpers'
import { generateRandomArray } from '../helpers/generatePoints'
import { useListenForMidi } from '../hooks/useListenForMidi'

type MidiData = {
  [key: string]: {
    noteStart: number
    noteEnd: number | null
    velocity: number
    value: number
  }
}

export const Viz2 = () => {
  const ref = useRef<SVGSVGElement>(null)

  const [data, setData] = useState(generateRandomArray(6, 0, 50))
  const [midiData, setMidiData] = useState<MidiData>({})

  const { midiMessage, noteIsPlaying } = useListenForMidi()
  // midi "on" = 144
  // midi "off" = 128
  const midiCommand = midiMessage?.[0]
  const midiNote = midiMessage?.[1]
  const midiVelocity = midiMessage?.[2]
  console.log({ midiCommand, midiNote, midiVelocity, noteIsPlaying })
  console.log({ midiData })

  // useEffect(() => {
  //   if (!ref.current) return

  //   const svgElement = d3.select(ref.current)
  //   svgElement.selectAll('circle').data(data).join(enter, update, exit)
  // }, [data])

  useEffect(() => {
    if (midiNote && midiCommand && midiVelocity) {
      const timestamp = Date.now()

      setMidiData((prev) => {
        if (prev[midiNote]) {
          // if this key was previously pressed and released, reset it's data
          // wipe the noteEnd data and populate the rest (minus the value)
          if (prev[midiNote].noteEnd) {
            prev[midiNote].noteEnd = null
            prev[midiNote].noteStart = timestamp
            prev[midiNote].velocity = midiVelocity
            // add a note end and don't modify the velocity
          } else {
            prev[midiNote].noteEnd = timestamp
          }
        } else {
          prev[midiNote] = {
            noteStart: timestamp,
            noteEnd: null,
            velocity: midiVelocity,
            value: midiNote,
          }
        }

        return prev
      })
    }
  }, [midiMessage])

  return (
    <div className='flex-grow bg-slate-200 p-4 text-black'>
      <svg
        ref={ref}
        viewBox='0 0 400 200'
        className='border-2 border-yellow-400 mb-2'
      />
      <div className='flex flex-row'>
        {/* <button
          className='border rounded border-gray-600 p-2 mr-2 hover:bg-sky-100'
          onClick={() => setData(generateRandomArray(6, 0, 50))}
        >
          Update Data
        </button> */}
        <button
          className='border rounded border-gray-600 p-2 hover:bg-sky-100'
          onClick={() => setMidiData({})}
        >
          Delete Data
        </button>
        <div className='ml-auto flex flex-col'>
          <span>Midi Input</span>
          <input
            className='flex-grow accent-green-400 text-green-400'
            type='radio'
            checked={noteIsPlaying}
            onChange={() => undefined}
          />
        </div>
      </div>
    </div>
  )
}
