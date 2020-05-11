import * as d3 from 'd3'

// const api = 'http://127.0.0.1:5000/Manhattan_group';

//setting a margin so that the axis is visible

// set the dimensions and margins of the graph
var margin = { top: 10, right: 30, bottom: 100, left: 100 },
    width = 1000 - margin.left - margin.right,
    height = 300 - margin.top - margin.bottom;

export default class Grouped {
    constructor(element) {

        const vis = this

        vis.svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //setting the x and y label
        vis.svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + 40)
            .attr("text-anchor", "middle")
            .text("Building class Category")

        vis.svg.append("text")
            .attr("x", -(height / 2))
            .attr("y", -80)
            .attr("text-anchor", "middle")
            .text("Sale Price")
            .attr("transform", "rotate(-90)")

        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .attr("class", "labels")


        vis.yAxisGroup = vis.svg.append("g")

        // fetching two datasets
        Promise.all([
            d3.json('http://127.0.0.1:5000/Manhattan_group'),
            d3.json('http://127.0.0.1:5000/Bronx_group'),
            d3.json('http://127.0.0.1:5000/Brooklyn_group'),
            d3.json('http://127.0.0.1:5000/Queens_group'),
            d3.json('http://127.0.0.1:5000/Staten_group')
        ]).then((datasets) => {
            //storing first element of datasets in bronx and second in brooklyn
            vis.DataManhattan = datasets[0]
            console.log(vis.DataManhattan)
            vis.DataBronx = datasets[1]
            // console.log(vis.DataBronx)
            vis.DataBrooklyn = datasets[2]
            vis.DataQueens = datasets[3]
            vis.DataStaten = datasets[4]
            vis.update("Manhattan")

        })

    }
    update(borough) {        //getting the json data 

        const vis = this

        switch (borough) {
            case 'Manhattan':
                vis.data = vis.DataManhattan;
                break;
            case 'Bronx':
                vis.data = vis.DataBronx;
                break;
            case 'Brooklyn':
                vis.data = vis.DataBrooklyn;
                break;
            case 'Queens':
                vis.data = vis.DataQueens;
                break;
            case 'StatenIsland':
                vis.data = vis.DataStaten;
                break;
            default:
                vis.data = vis.DataManhattan;
        }


        // logic to get the axis height

        var y_values = [];

        Object.values(vis.data).forEach(item => {
            Object.values(item).forEach(function (nextItem) {
                if (!isNaN(nextItem)) {
                    y_values.push(nextItem);
                }
            })
        });

        var subgroups = d3.keys(vis.data[0])
        var columns = subgroups.splice(3, 1)
        // console.log(columns)
        // List of groups = species here = value of the first column called group -> I show them on the X axis
        var groups = d3.map(vis.data, function (d) { return (d.index) }).keys()
        // console.log(groups)
        // color palette = one color per subgroup
        var color = d3.scaleOrdinal()
            .domain(subgroups)
            .range(['#e41a1c', '#377eb8', '#4daf4a'])

        // Add X axis
        var x = d3.scaleBand()
            .domain(groups)
            .range([0, width])
            .padding([0.2])


        // Add Y axis
        const y = d3.scaleLinear()
            .domain([0, d3.max(y_values)])
            .range([height, 0]);


        //setting axis x and y
        const xAxisCall = d3.axisBottom(x)

        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        // Another scale for subgroup position?
        var xSubgroup = d3.scaleBand()
            .domain(subgroups)
            .range([0, x.bandwidth()])
            .padding([0.05])

        var v_labels = d3.selectAll("g")

        v_labels
            .selectAll(".labels")
            // .attr("class", "xlabels")
            // .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xSubgroup)
            .selectAll("text")
            .attr("y", 0)
            .attr("x", 9)
            .attr("dy", ".35em")
            .attr("transform", "rotate(-90)")
            .style("text-anchor", "end");


        //data join
        const rects = vis.svg.append("g")
            .selectAll("g")
            // Enter in data = loop group per group
            .data(vis.data)

        //remove the bars that are not used
        // rects.exit().transition().duration(500)
        //     .remove()

        const newRects = vis.svg.selectAll("g.groupedBars");

        newRects.transition().duration(500).remove()

        rects.transition().duration(500)
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))

        rects.enter()
            .append("g")
            .attr("class", "groupedBars")
            .attr("transform", d => "translate(" + x(d.index) + ",0)")
            .selectAll("rect")
            .data(d => subgroups.map(key => { return { key: key, value: d[key] }; }))
            .enter()
            .append("rect")
            .attr("x", d => xSubgroup(d.key))
            .attr("y", d => y(d.value))
            .attr("width", xSubgroup.bandwidth())
            .attr("height", d => height - y(d.value))
            .attr("fill", d => color(d.key))


    }
}


