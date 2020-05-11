import * as d3 from 'd3'

const api = 'http://127.0.0.1:5000/Manhattan_group';

//setting a margin so that the axis is visible

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 20, left: 50 },
    width = 660 - margin.left - margin.right,
    height = 400 - margin.top - margin.bottom;

export default class Grouped {
    constructor(element) {
        const svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");
        //getting the json data 
        d3.json(api).then(data => {
            console.log(data)
            // List of subgroups = header of the csv files = soil condition here
            // var subgroups = data.columns.slice(1)
            // var subgroups = d3.map(data, d => d.group)
            var subgroups = d3.keys(data[0])
            var columns = subgroups.splice(3, 1)
            console.log(subgroups)
            // List of groups = species here = value of the first column called group -> I show them on the X axis
            var groups = d3.map(data, function (d) { return (d.index) }).keys()
            console.log(groups)
            // Add X axis
            var x = d3.scaleBand()
                .domain(groups)
                .range([0, width])
                .padding([0.2])
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).tickSize(0));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([10000, 100000000])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // Another scale for subgroup position?
            var xSubgroup = d3.scaleBand()
                .domain(subgroups)
                .range([0, x.bandwidth()])
                .padding([0.05])

            // color palette = one color per subgroup
            var color = d3.scaleOrdinal()
                .domain(subgroups)
                .range(['#e41a1c', '#377eb8', '#4daf4a'])


            // Show the bars
            svg.append("g")
                .selectAll("g")
                // Enter in data = loop group per group
                .data(data)
                .enter()
                .append("g")
                .attr("transform", d => "translate(" + x(d.index) + ",0)")
                .selectAll("rect")
                .data(d => subgroups.map(key => { return { key: key, value: d[key] }; }))
                .enter().append("rect")
                .attr("x", d => xSubgroup(d.key))
                .attr("y", d => y(d.value))
                .attr("width", xSubgroup.bandwidth())
                .attr("height", d => height - y(d.value))
                .attr("fill", d => color(d.key))

        })
    }
}

