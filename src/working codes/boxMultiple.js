

import * as d3 from 'd3'

// const api = 'http://127.0.0.1:5000/ML1';

//setting a margin so that the axis is visible

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 30, left: 40 },
    width = 460 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

export default class D3Chart {
    constructor(element) {
        // append the svg object to the body of the page
        var svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")


        //getting the json data 
        // Read the data and compute summary statistics for each specie
        d3.json("http://127.0.0.1:5000/iris").then(data => {
            console.log(data)
            // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                .key(d => d.species)

                .rollup(function (d) {


                    var q1 = d3.quantile(d.map(g => g.sepalLength).sort(d3.ascending), .25)
                    var median = d3.quantile(d.map(g => g.sepalLength).sort(d3.ascending), .5)
                    var q3 = d3.quantile(d.map(g => g.sepalLength).sort(d3.ascending), .75)
                    var interQuantileRange = q3 - q1
                    var min = q1 - 1.5 * interQuantileRange
                    var max = q3 + 1.5 * interQuantileRange
                    return ({ q1: q1, median: median, q3: q3, interQuantileRange: interQuantileRange, min: min, max: max })
                })
                .entries(data)
            console.log(data.length)
            // Show the X scale
            var x = d3.scaleBand()
                .range([0, width])
                .domain(["setosa", "versicolor", "virginica"])
                .paddingInner(1)
                .paddingOuter(.5)
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x))

            // Show the Y scale
            var y = d3.scaleLinear()
                .domain([3, 9])
                .range([height, 0])
            svg.append("g").call(d3.axisLeft(y))

            // Show the main vertical line
            svg
                .selectAll("vertLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", d => x(d.key))
                .attr("x2", d => x(d.key))
                .attr("y1", d => y(d.value.min))
                .attr("y2", d => y(d.value.max))
                .attr("stroke", "black")
                .style("width", 40)

            // // rectangle for the main box
            var boxWidth = 100
            svg
                .selectAll("boxes")
                .data(sumstat)
                .enter()
                .append("rect")
                .attr("x", d => x(d.key) - boxWidth / 2)
                .attr("y", d => y(d.value.q3))
                .attr("height", d => y(d.value.q1) - y(d.value.q3))

                .attr("width", boxWidth)
                .attr("stroke", "black")
                .style("fill", "#69b3a2")

            // // Show the median
            svg
                .selectAll("medianLines")
                .data(sumstat)
                .enter()
                .append("line")
                .attr("x1", d => x(d.key) - boxWidth / 2)
                .attr("x1", d => x(d.key) - boxWidth / 2)
                .attr("x2", d => x(d.key) + boxWidth / 2)
                .attr("y1", d => y(d.value.median))
                .attr("y2", d => y(d.value.median))
                .attr("stroke", "black")
                .style("width", 80)

        })

    }
}

