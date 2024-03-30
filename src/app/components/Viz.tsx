// @ts-nocheck
'use client'
import React, { useState, useRef, useEffect } from 'react'
import * as d3 from 'd3'

import { generatePoints, generateRandomArray } from '../helpers/generatePoints'

export const Viz = () => {
  const [dataset, setDataset] = useState(generateRandomArray(6, 0, 5))
  console.log({ dataset })

  const ref = useRef()

  useEffect(() => {
    const svgElement = d3.select(ref.current)

    svgElement
      .selectAll('circle')
      .data(dataset, (d) => d)
      .join(
        (enter) =>
          enter
            .append('circle')
            .attr('cx', (d) => d * 15 + 10)
            .attr('cy', 10)
            .attr('r', 0)
            .attr('fill', 'cornflowerblue')
            .call((enter) =>
              enter
                .transition()
                .duration(1200)
                .attr('cy', 10)
                .attr('r', 6)
                .style('opacity', 1)
            ),
        (update) => update.attr('fill', 'lightgrey'),
        (exit) =>
          exit
            .attr('fill', 'tomato')
            .call((exit) =>
              exit
                .transition()
                .duration(2000)
                .attr('r', 0)
                .style('opacity', 0)
                .remove()
            )
      )
  }, [dataset])

  useEffect(() => {
    const interval = setInterval(
      () => setDataset(generateRandomArray(6, 0, 5)),
      1000
    )
    return () => clearInterval(interval)
  })

  return (
    <div className='flex-grow bg-slate-200 p-4'>
      <svg
        ref={ref}
        viewBox='0 0 100 20'
        style={{
          border: '2px solid gold',
        }}
      />
    </div>
  )
}
