
import * as d3 from 'd3'

export default class D3Chart1 {
    constructor(element) {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        //Read the data
        d3.json("http://127.0.0.1:5000/data_group").then(data => {
            console.log(data)

            // Now I can use this dataset:

            const x = d3.scaleBand()
                .domain(data.map(d => d.date))
                .range([0, width])
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x));
            console.log(d3.extent(data, d => d.date))
            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.value)])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));
            console.log(d3.max(data, d => +d.value))
            // Add the line
            svg.append("path")
                .datum(data)
                .attr("fill", "none")
                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.value))
                )
            svg.append("path")
                .datum(data)
                .attr("fill", "none")

                .attr("stroke", "steelblue")
                .attr("stroke-width", 1.5)
                .attr("d", d3.line()
                    .x(d => x(d.date))
                    .y(d => y(d.api))
                )

            svg.append("text")
                .attr("transform", "translate(" + (width - 5) + "," + y(data[0].api) + ")")
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .style("fill", "red")
                .text("Api");
            svg.append("text")
                .attr("transform", "translate(" + (width - 5) + "," + y(data[0].value) + ")")
                .attr("dy", ".35em")
                .attr("text-anchor", "start")
                .style("fill", "red")
                .text("Value");
        })
    }
}



import * as d3 from 'd3'

export default class line {
    constructor(element) {
        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

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
            // group the data: I want to draw one line per group
            var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
                .key(d => d.category)
                .entries(data);

            // Add X axis --> it is a date format
            var x = d3.scaleLinear()
                .domain(d3.extent(data, d => d.year))
                .range([0, width]);
            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(5));

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([0, d3.max(data, d => +d.sp)])
                .range([height, 0]);
            svg.append("g")
                .call(d3.axisLeft(y));

            // color palette
            var res = sumstat.map(d => d.key) // list of group names
            var color = d3.scaleOrdinal()
                .domain(res)
                .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
            console.log(res)
            // Draw the line
            svg.selectAll(".line")
                .data(sumstat)
                .enter()
                .append("path")
                .attr("fill", "none")
                .attr("stroke", d => color(d.key))
                .attr("stroke-width", 1.5)
                .attr("d", function (d) {
                    return d3.line()
                        .x(d => x(d.year))
                        .y(d => y(+d.sp))
                        (d.values)
                })

        })
    }
}




import * as d3 from 'd3'

export default class line {
    constructor(element) {
        // 
        const vis = this

        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        vis.svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");



        //step 3
        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(" + 0 + "," + height + ")")

        vis.yAxisGroup = vis.svg.append("g")


        // fetching two datasets
        // Promise.all([
        //     d3.json('http://127.0.0.1:5000/Manhattan_line'),
        //     // d3.json('http://127.0.0.1:5000/Bronx_line'),
        //     // d3.json('http://127.0.0.1:5000/Brooklyn_line'),
        //     // d3.json('http://127.0.0.1:5000/Queens_line'),
        //     // d3.json('http://127.0.0.1:5000/Staten_line')
        // ]).then((datasets) => {
        //     //storing first element of datasets in bronx and second in brooklyn

        //     vis.DataManhattan = datasets[0]
        //     // vis.DataBronx = datasets[1]
        //     // vis.DataBrooklyn = datasets[2]
        //     // vis.DataQueens = datasets[3]
        //     // vis.DataStaten = datasets[4]
        //     vis.update("StatenIsland")

        d3.json('http://127.0.0.1:5000/Manhattan_line').then(data => {
            d3.interval(() => {

            }), 1000
        })

        // })

    }


    update(borough) {

        const vis = this
        // vis.data = (year === "2019") ? vis.Data2019 : vis.Data2018

        switch (borough) {
            case 'Manhattan':
                vis.data = vis.DataManhattan;
                break;
            // case 'Bronx':
            //     vis.data = vis.DataBronx;
            //     break;
            // case 'Brooklyn':
            //     vis.data = vis.DataBrooklyn;
            //     break;
            // case 'Queens':
            //     vis.data = vis.DataQueens;
            //     break;
            // case 'StatenIsland':
            //     vis.data = vis.DataStaten;
            //     break;
            default:
                vis.data = vis.DataManhattan;
        }


        // Now I can use this dataset:
        // group the data: I want to draw one line per group
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(d => d.category)
            .entries(vis.data);

        // color palette
        var res = sumstat.map(d => d.key) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
        console.log(res)

        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
            .domain(d3.extent(vis.data, d => d.year))
            .range([0, 400]);


        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(vis.data, d => +d.sp)])
            .range([400, 0]);



        //setting axis x and y
        const xAxisCall = d3.axisBottom(x)

        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        // const lines = vis.svg.selectAll(".line")
        //     .data(sumstat)

        // Draw the line
        // lines.exit()
        //     .transition().duration(500)
        //     // .attr("height", 0)
        //     // .attr("y", HEIGHT)
        //     .remove()

        // lines.transition().duration(500)
        //     .attr("d", function (d) {
        //         return d3.line()
        //             .x(d => x(d.year))
        //             .y(d => y(+d.sp))
        //             (d.values)


        //     })



        // lines.enter()
        //     .append("path")
        //     .attr("fill", "none")
        //     .attr("stroke", d => color(d.key))
        //     .attr("stroke-width", 1.5)
        //     .attr("d", function (d) {
        //         return d3.line()
        //             .x(d => x(d.year))
        //             .y(d => y(+d.sp))
        //             (d.values)
        //     })
        // console.log(lines)

    }
}



import * as d3 from 'd3'

export default class line {
    constructor(element) {
        // 
        const vis = this

        var margin = { top: 10, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        // append the svg object to the body of the page
        vis.svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");



        //step 3
        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(" + 0 + "," + height + ")")

        vis.yAxisGroup = vis.svg.append("g")


        // fetching two datasets
        Promise.all([
            d3.json('http://127.0.0.1:5000/Manhattan_line'),
            d3.json('http://127.0.0.1:5000/Bronx_line'),
            //     // d3.json('http://127.0.0.1:5000/Brooklyn_line'),
            //     // d3.json('http://127.0.0.1:5000/Queens_line'),
            //     // d3.json('http://127.0.0.1:5000/Staten_line')
        ]).then((datasets) => {
            //storing first element of datasets in bronx and second in brooklyn
            const [men, women] = datasets
            let flag = true
            d3.interval(() => {
                vis.data = flag ? men : women
                vis.update()
                flag = !flag
            }, 1000)
            // vis.DataManhattan = datasets[0]
            // vis.DataBronx = datasets[1]
            //     // vis.DataBrooklyn = datasets[2]
            //     // vis.DataQueens = datasets[3]
            //     // vis.DataStaten = datasets[4]
            //     vis.update("StatenIsland")

            // d3.json('http://127.0.0.1:5000/Manhattan_line').then(data => {
            //     vis.data = data

            // })

        })

    }


    update() {

        const vis = this
        // vis.data = (year === "2019") ? vis.Data2019 : vis.Data2018

        // switch (borough) {
        //     case 'Manhattan':
        //         vis.data = vis.DataManhattan;
        //         break;
        // case 'Bronx':
        //     vis.data = vis.DataBronx;
        //     break;
        // case 'Brooklyn':
        //     vis.data = vis.DataBrooklyn;
        //     break;
        // case 'Queens':
        //     vis.data = vis.DataQueens;
        //     break;
        // case 'StatenIsland':
        //     vis.data = vis.DataStaten;
        //     //     break;
        //     default:
        //         vis.data = vis.DataManhattan;
        // }






        // Add X axis --> it is a date format
        var x = d3.scaleLinear()
            .domain(d3.extent(vis.data, d => d.year))
            .range([0, 400]);


        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, d3.max(vis.data, d => +d.sp)])
            .range([400, 0]);



        //setting axis x and y
        const xAxisCall = d3.axisBottom(x)

        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        //data join
        // Now I can use this dataset:
        // group the data: I want to draw one line per group
        var sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(d => d.category)
            .entries(vis.data);
        const lines = vis.svg.selectAll(".line")
            .data(sumstat)
        // color palette
        var res = sumstat.map(d => d.key) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#999999'])
        console.log(res)



        //exit
        lines.exit().remove()

        //update
        lines.attr("stroke", d => color(d.key))
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => x(d.year))
                    .y(d => y(+d.sp))
                    (d.values)
            })


        //enter
        lines.enter()
            .append("path")
            .attr("fill", "none")
            .attr("stroke", d => color(d.key))
            .attr("stroke-width", 1.5)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => x(d.year))
                    .y(d => y(+d.sp))
                    (d.values)
            })
        console.log(lines)
        // console.log(lines)
        // Draw the line
        // lines.exit()
        //     .transition().duration(500)
        //     // .attr("height", 0)
        //     // .attr("y", HEIGHT)
        //     .remove()

        // lines.transition().duration(500)
        //     .attr("d", function (d) {
        //         return d3.line()
        //             .x(d => x(d.year))
        //             .y(d => y(+d.sp))
        //             (d.values)


        //     })





    }
}