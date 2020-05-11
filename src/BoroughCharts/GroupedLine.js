
import * as d3 from 'd3'

export default class D3Chart1 {
    constructor(element) {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 1000 - margin.left - margin.right,
            height = 1000 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.json("http://127.0.0.1:5000/Staten_line").then(data => {
            console.log(data)

            // Now I can use this dataset:

            const x = d3.scaleBand()
                .domain(data.map(d => d.year))
                .range([0, width])
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            console.log(d3.extent(data, d => d.year))
            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.Rentals)])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));
            console.log(d3.max(data, d => +d.COOPS))
            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => x(d.year))
                    .y(d => y(d.COOPS))
                )
            svg.append("path")
                .datum(data)
                .attr("fill", "none")

                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => x(d.year))
                    .y(d => y(d.Rentals))
                )

            svg.append("text")
                .attr("transform", "translate(" + (width - 5) + "," + y(data[0].COOPS) + ")")
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .style("fill", "red")
                .text("Api");
            // svg.append("text")
            //     .attr("transform", "translate(" + (width - 5) + "," + y(data[0].value) + ")")
            //     .attr("dy", ".35em")
            //     .attr("text-anchor", "start")
            //     .style("fill", "red")
            //     .text("Value");
        })
    }
}