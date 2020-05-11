

import * as d3 from 'd3'

// const api = 'http://127.0.0.1:5000/ML1';

//setting a margin so that the axis is visible

// set the dimensions and margins of the graph
var margin = { top: 10, right: 1, bottom: 50, left: 80 },
    width = 350 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

export default class BoxYear {
    constructor(element) {
        const vis = this
        // append the svg object to the body of the page
        vis.svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")")

        vis.svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .attr("text-anchor", "middle")
            .text("Borough")
        vis.svg.append("text")
            .attr("x", -(height / 2))
            .attr("y", -60)
            .attr("text-anchor", "middle")
            .text("Median Sale Price")
            .attr("transform", "rotate(-90)")

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(0," + height + ")")

        vis.yAxisGroup = vis.svg.append("g")

        // fetching two datasets
        Promise.all([
            d3.json('http://127.0.0.1:5000/box_2019'),
            d3.json('http://127.0.0.1:5000/box_2018'),
            d3.json('http://127.0.0.1:5000/box_2017'),
            d3.json('http://127.0.0.1:5000/box_2016'),
            d3.json('http://127.0.0.1:5000/box_2015')
        ]).then((datasets) => {
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

        const vis = this;
        vis.data = [];
        // vis.data = (year === "2019") ? vis.Data2019 : vis.Data2018

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
                vis.data = vis.Data2016;
                break;
            case '2015':
                vis.data = vis.Data2015;
                break;
            default:
                // vis.data = vis.Data2019;
                vis.data = [];
        }


        // Compute quartiles, median, inter quantile range min and max --> these info are then used to draw the box.
        vis.sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(d => d.index)
            .rollup(function (d) {
                var q1 = d3.quantile(d.map(g => g.sp).sort(d3.ascending), .25)
                var median = d3.quantile(d.map(g => g.sp).sort(d3.ascending), .5)
                var q3 = d3.quantile(d.map(g => g.sp).sort(d3.ascending), .75)
                var interQuantileRange = q3 - q1
                var min = q1 - 1.5 * interQuantileRange
                var max = q3 + 1.5 * interQuantileRange
                return ({ 'q1': q1, 'median': median, 'q3': q3, 'interQuantileRange': interQuantileRange, 'min': min, 'max': max })
            })
            .entries(vis.data);

        // Show the X scale
        var x = d3.scaleBand()
            .range([0, width])
            .domain(["Manhattan", "Bronx", "Brooklyn", "Queens", "Staten Island"])
            .paddingInner(1)
            .paddingOuter(.5)
        // Show the Y scale
        var y = d3.scaleLinear()
            .domain([50000, 6000000])
            .range([height, 0])

        const xAxisCall = d3.axisBottom(x)
        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)






        //this is data join
        // Show the main vertical line
        const lines = vis.svg
            .selectAll(".vertLines")
            .data(vis.sumstat)

        // // rectangle for the main box
        var boxWidth = 30
        const box = vis.svg
            .selectAll(".boxes").data(vis.sumstat)

        // // Show the median
        const medline = vis.svg
            .selectAll(".medianLines").data(vis.sumstat)

        // Show the median labels
        const text = vis.svg
            .selectAll(".numbers").data(vis.sumstat)

        //this is to exit
        lines.exit().transition().duration(500).remove()
        medline.exit().transition().duration(500).remove()
        box.exit().transition().duration(500).remove()
        text.exit().transition().duration(500).remove()


        //update


        lines.transition().duration(500).attr("x1", d => x(d.key))
            .attr("x2", d => x(d.key))
            .attr("y1", d => y(d.value.min))
            .attr("y2", d => y(d.value.max))


        box.transition().duration(500).attr("x", d => x(d.key) - boxWidth / 2)
            .attr("y", d => y(d.value.q3))
            .attr("height", d => y(d.value.q1) - y(d.value.q3))
            .attr("width", boxWidth)


        medline.transition().duration(500).attr("x1", d => x(d.key) - boxWidth / 2)
            .attr("x1", d => x(d.key) - boxWidth / 2)
            .attr("x2", d => x(d.key) + boxWidth / 2)
            .attr("y1", d => y(d.value.median))
            .attr("y2", d => y(d.value.median))


        text.transition().duration(500)
            .attr("x", d => x(d.key))
            .attr("y", d => y(d.value.median))





        lines.enter().append("line")
            .attr("class", "vertLines")
            .attr("x1", d => x(d.key))
            .attr("x2", d => x(d.key))
            .attr("y1", d => y(d.value.min))
            .attr("y2", d => y(d.value.max))
            .attr("stroke", "black")
            .style("width", 40)





        box.enter()

            .append("rect")
            .attr("class", "boxes")
            .attr("x", d => x(d.key) - boxWidth / 2)
            .attr("y", d => y(d.value.q3))
            .attr("height", d => y(d.value.q1) - y(d.value.q3))
            .attr("width", boxWidth)
            .attr("stroke", "black")
            .style("fill", "#69b3a2")




        medline.enter()
            .append("line")
            .attr("class", "medianLines")
            .attr("x1", d => x(d.key) - boxWidth / 2)
            .attr("x1", d => x(d.key) - boxWidth / 2)
            .attr("x2", d => x(d.key) + boxWidth / 2)
            .attr("y1", d => y(d.value.median))
            .attr("y2", d => y(d.value.median))
            .attr("stroke", "black")
            .style("width", 80)


        text.enter()
            .append("text")
            .attr("class", "numbers")
            .text(function (d) {
                return d.value.median;
            })
            .attr("y", function (d) {
                return y(d.value.median) - 5;
            })
            .attr("x", d => x(d.key))
            .style("text-anchor", "middle")
            .style("font-size", "10px");



    }
}

