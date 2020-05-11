
import * as d3 from 'd3'

var margin = { top: 30, right: 10, bottom: 50, left: 80 },
    width = 1000 - margin.left - margin.right,
    height = 200 - margin.top - margin.bottom;

export default class line {
    constructor(element) {
        // 
        const vis = this

        // append the svg object to the body of the page
        vis.svg = d3.select(element)
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // text label for the x axis
        vis.svg.append("text")
            .attr("transform",
                "translate(" + (width / 2) + " ," +
                (height + margin.top + 20) + ")")
            .style("text-anchor", "middle")
            .text("Year");
        // text label for the y axis
        vis.svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .text("Sale Price");

        //step 3
        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(" + 0 + "," + height + ")")

        vis.yAxisGroup = vis.svg.append("g")


        // fetching two datasets
        Promise.all([
            d3.json('http://127.0.0.1:5000/Manhattan_line'),
            d3.json('http://127.0.0.1:5000/Bronx_line'),
            d3.json('http://127.0.0.1:5000/Brooklyn_line'),
            d3.json('http://127.0.0.1:5000/Queens_line'),
            d3.json('http://127.0.0.1:5000/Staten_line')
        ]).then((datasets) => {
            vis.DataManhattan = datasets[0]
            vis.DataBronx = datasets[1]
            vis.DataBrooklyn = datasets[2]
            vis.DataQueens = datasets[3]
            vis.DataStaten = datasets[4]
            vis.update("Manhattan")
        })

    }


    update(borough) {

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






        // Add X axis --> it is a date format
        // var x = d3.scaleLinear()
        //     .domain(d3.extent(vis.data, d => d.year))
        //     .range([0, 400]);

        var x = d3.scaleBand()
            .domain(vis.data.map(d => d.year))
            .range([0, width])
            .padding(0.1)

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([d3.min(vis.data, d => +d.sp), d3.max(vis.data, d => +d.sp)])
            .range([height, 0]);



        //setting axis x and y
        const xAxisCall = d3.axisBottom(x)

        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        //data join
        // Now I can use this dataset:
        // group the data: I want to draw one line per group
        vis.sumstat = d3.nest() // nest function allows to group the calculation per level of a factor
            .key(d => d.category)
            .entries(vis.data);
        const lines = vis.svg.selectAll("path")
            .data(vis.sumstat)

        // console.log(lines)
        // color palette
        var res = vis.sumstat.map(d => d.key) // list of group names
        var color = d3.scaleOrdinal()
            .domain(res)
            .range(['#e41a1c', '#377eb8', '#4daf4a', '#984ea3', '#ff7f00', '#ffff33', '#a65628', '#f781bf', '#6B4C9A', '#922428', '#948B3D'])
        // console.log(res)

        // vis.svg.select(".lines").selectAll("*").remove();

        // Adding manual Lengend 
        vis.svg.append("circle").attr("cx", 680).attr("cy", 5).attr("r", 4.5).style("fill", '#e41a1c')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 15).attr("r", 4.5).style("fill", '#377eb8')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 25).attr("r", 4.5).style("fill", '#4daf4a')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 35).attr("r", 4.5).style("fill", '#984ea3')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 45).attr("r", 4.5).style("fill", '#ff7f00')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 55).attr("r", 4.5).style("fill", '#ffff33')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 65).attr("r", 4.5).style("fill", '#a65628')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 75).attr("r", 4.5).style("fill", '#f781bf')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 85).attr("r", 4.5).style("fill", '#6B4C9A')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 95).attr("r", 4.5).style("fill", '#922428')
        vis.svg.append("circle").attr("cx", 680).attr("cy", 105).attr("r", 4.5).style("fill", '#948B3D')

        vis.svg.append("text").attr("x", 690).attr("y", 5).text("COOPS").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 15).text("Condos").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 25).text("Educational Facilities").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 35).text("Factories").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 45).text("Hospitals and Health Facilities").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 55).text("Office Buildings").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 65).text("Religious Facilities").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 75).text("Rentals").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 85).text("Residential House").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 95).text("Store Buildings").style("font-size", "10px").attr("alignment-baseline", "middle")
        vis.svg.append("text").attr("x", 690).attr("y", 105).text("Hotels").style("font-size", "10px").attr("alignment-baseline", "middle")




        lines.exit()
            .transition().duration(500)
            // .attr("height", 0)
            // .attr("y", HEIGHT)
            .remove()

        lines.transition().duration(500)
            .attr("d", function (d) {
                return d3.line()
                    .x(d => x(d.year))
                    .y(d => y(+d.sp))
                    (d.values)

            })

        lines.enter()
            // .append(".lines")
            .append("path")
            .attr("fill", "none")
            .attr("stroke", d => color(d.key))
            .attr("stroke-width", 2.5)
            .attr("stroke-linejoin", "round")
            .attr("stroke-linecap", "round")
            .attr("d", d => {
                return d3.line()
                    .x(d => x(d.year))
                    .y(d => y(+d.sp))
                    (d.values)
            })




    }
}