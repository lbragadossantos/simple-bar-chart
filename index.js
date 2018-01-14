var margin = {top: 16, right: 16, bottom: 48, left: 48}
var width = 960 - margin.left - margin.right
var height = 720 - margin.top - margin.bottom

var x = d3.scaleBand().padding(0.2).rangeRound([0, width])
var y = d3.scaleLinear().rangeRound([height, 0])

var svg = d3.select('svg')

var group = svg.append('g')
  .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')')

d3.csv('index.csv', function row(d) {
  d.frequency = Number(d.frequency)
  return d
}, onload)

function onload(err, data) {
  if (err) throw err

  x.domain(data.map(function (d) { return d.letter }))
  y.domain([0, d3.max(data, function (d) { return d.frequency })])

  group.append('g')
    .attr('class', 'axis axis-x')
    .call(d3.axisBottom(x)).attr('transform', 'translate(0,' + height + ')')

  group.append('g')
    .attr('class', 'axis axis-y')
    .call(d3.axisLeft(y).ticks(10, '%'))

  group.selectAll('.bar')
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'bar')
    .attr('x', function (d) {
      return x(d.letter)
    })
    .attr('y', function (d) {
      return y(d.frequency)
    })
//     .attr('width', x.bandwidth())
//     .attr('height', function(d) {
//       return height - y(d)
//     })
}
