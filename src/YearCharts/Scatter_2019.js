
import * as d3 from 'd3'


//setting a margin so that the axis is visible

var margin = { top: 20, right: 5, bottom: 20, left: 60 },
    width = 350 - margin.left - margin.right,
    height = 240 - margin.top - margin.bottom;

export default class ScatterYear {
    constructor(element) {


        const vis = this
        // append the svg object to the body of the page
        vis.svg = d3.select(element)
            // append the svg object to the body of the page
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(" + 0 + "," + height + ")")

        vis.yAxisGroup = vis.svg.append("g")

        //Read the data
        Promise.all([
            d3.json('http://127.0.0.1:5000/scatter_2019'),
            d3.json('http://127.0.0.1:5000/scatter_2018'),
            d3.json('http://127.0.0.1:5000/scatter_2017'),
            // d3.json('http://127.0.0.1:5000/scatter_2016'),
            // d3.json('http://127.0.0.1:5000/scatter_2015')
        ]).then((datasets) => {
            console.log(datasets)
            //storing first element of datasets in bronx and second in brooklyn
            vis.Data2019 = datasets[0]
            vis.Data2018 = datasets[1]
            vis.Data2017 = datasets[2]
            vis.Data2016 = datasets[3]
            vis.Data2015 = datasets[4]
            vis.update("2019")

        })

    }
    update(year) {
        const vis = this
        vis.data = [];
        switch (year) {
            case '2019':
                vis.data = vis.Data2019;
                break;
            case '2018':
                vis.data = vis.Data2018;
                break;
            case '2017':
                vis.data = vis.Data2017;
                break;
            case '2016':
                vis.data = vis.Data2019;
                break;
            case '2015':
                vis.data = vis.Data2017;
                break;
            default:
                // vis.data = vis.Data2019;
                vis.data = [];
        }

        // Add X axis
        var x = d3.scaleLinear()
            .domain([0, 1000])
            .range([0, width]);
        // Add Y axis
        var y = d3.scaleLinear()
            .domain([1000, 1000000])
            .range([height, 0]);

        const xAxisCall = d3.axisBottom(x)
        // vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        vis.xAxisGroup.call(xAxisCall)
        const yAxisCall = d3.axisLeft(y)
        // vis.yAxisGroup.transition().duration(500).call(yAxisCall)
        vis.yAxisGroup.call(yAxisCall)
        const dots = vis.svg
            .selectAll("circle")
            .data(vis.data)

        //this is to exit
        dots.exit().remove()



        dots
            .attr("class", d => "dot " + d.index)
            .attr("cx", d => x(d.lsf))
            .attr("cy", d => y(d.sp))
            .attr("r", 2.5)
        // .style("fill", d => color(d.index))


        // Color scale: give me a specie name, I return a color
        var color = d3.scaleOrdinal()
            .domain(["Manhattan", "Bronx", "Brooklyn", "Queens", "Staten Island"])
            .range(["#440154ff", "#21908dff", "#fde725ff", "#984ea3", "#a65628"])

        // Highlight the specie that is hovered
        var highlight = d => {

            var selected_specie = d.index
            console.log(selected_specie)
            d3.selectAll(".dot")
                .transition()
                .duration(200)
                .style("fill", "lightgrey")
                .attr("r", 2)

            d3.selectAll("." + selected_specie)
                .transition()
                .duration(200)
                .style("fill", color(selected_specie))
                .attr("r", 3)
        }

        // Highlight the specie that is hovered
        var doNotHighlight = () => {
            d3.selectAll(".dot")
                .transition()
                .duration(200)
                .style("fill", "lightgrey")
                .attr("r", 5)
        }

        // Manual Legend
        vis.svg.append("circle").attr("cx", 220).attr("cy", 5).attr("r", 3).style("fill", '#440154ff')
        vis.svg.append("circle").attr("cx", 220).attr("cy", 15).attr("r", 3).style("fill", '#21908dff')
        vis.svg.append("circle").attr("cx", 220).attr("cy", 25).attr("r", 3).style("fill", '#fde725ff')
        vis.svg.append("circle").attr("cx", 220).attr("cy", 35).attr("r", 3).style("fill", '#984ea3')
        vis.svg.append("circle").attr("cx", 220).attr("cy", 45).attr("r", 3).style("fill", '#a65628')

        vis.svg.append("text").attr("x", 225).attr("y", 5).text("Manhattan").style("font-size", "12px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 225).attr("y", 15).text("Bronx").style("font-size", "12px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 225).attr("y", 25).text("Brooklyn").style("font-size", "12px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 225).attr("y", 35).text("Queens").style("font-size", "12px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 225).attr("y", 45).text("Staten Island").style("font-size", "12px").attr("alignment-baseline", "middle")

        // Add dots

        dots.enter()
            .append("circle")
            .attr("class", d => "dot " + d.index)
            .attr("cx", d => x(d.lsf))
            .attr("cy", d => y(d.sp))
            .attr("r", 2.5)
            .style("fill", d => color(d.index))
            .on("mouseover", highlight)
        // .on("mouseleave", doNotHighlight)

    }
}

