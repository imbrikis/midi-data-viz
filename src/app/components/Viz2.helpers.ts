import * as d3 from 'd3'

export const enter = (
  enter: d3.Selection<d3.EnterElement, number, SVGSVGElement, unknown>
) =>
  enter
    .append('circle')
    .attr('class', 'new')
    .attr('fill-opacity', '0.35')
    .attr('fill', 'black')
    .attr('cx', (d) => d * 5)
    .attr('cy', 100)
    .attr('r', 10)
    .attr('stroke', 'blue')

export const update = (
  update: d3.Selection<d3.BaseType, number, SVGSVGElement, unknown>
) =>
  update
    .transition()
    .duration(1000)
    .attr('class', 'updated')
    .attr('cx', (d) => d * 5)
    .attr('r', 10)
    .attr('stroke', 'orange')

export const exit = (
  exit: d3.Selection<d3.BaseType, number, SVGSVGElement, unknown>
) =>
  exit.transition().duration(1000).attr('r', 5).attr('stroke', 'red').remove()
