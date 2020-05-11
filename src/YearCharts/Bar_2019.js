import * as d3 from 'd3'

// const api = 'http://127.0.0.1:5000/brooklyn2019';
// const api1 = 'http://127.0.0.1:5000/bronx2019';

//setting a margin so that the axis is visible

const MARGIN = { TOP: 20, BOTTOM: 50, LEFT: 80, RIGHT: 5 }
const WIDTH = 350 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 280 - MARGIN.TOP - MARGIN.BOTTOM;

export default class BarYear {
    constructor(element) {

        //defining this to avoid confusion
        const vis = this

        vis.svg = d3.select(element)
            .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

            //MAKING A GROUP TO ALIGN THE GRAPH
            .append("g")
            .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")


        //setting the x and y label
        vis.svg.append("text")
            .attr("x", WIDTH / 2)
            .attr("y", HEIGHT + 40)
            .attr("text-anchor", "middle")
            .text("Borough")

        vis.svg.append("text")
            .attr("x", -(HEIGHT / 2))
            .attr("y", -60)
            .attr("text-anchor", "middle")
            .text("Median Sale Price")
            .attr("transform", "rotate(-90)")

        //step 3
        vis.xAxisGroup = vis.svg.append("g")
            .attr("transform", "translate(" + 0 + "," + HEIGHT + ")")

        vis.yAxisGroup = vis.svg.append("g")

        // fetching two datasets
        Promise.all([
            d3.json('http://127.0.0.1:5000/median_2019'),
            d3.json('http://127.0.0.1:5000/median_2018'),
            d3.json('http://127.0.0.1:5000/median_2017'),
            d3.json('http://127.0.0.1:5000/median_2016'),
            d3.json('http://127.0.0.1:5000/median_2015')
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
    //step 2 update
    update(year) {

        const vis = this
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



        // vis.data = (year === "2018") ? vis.Data2018 : vis.Data2019;
        // vis.xLabel.text("hello")
        // //setting x and y axis
        const y = d3.scaleLinear()

            //ADDING MINIMUM VALUE TO HEIGHT OF BARD
            .domain([d3.min(vis.data, d => d.sp) * 0.95, d3.max(vis.data, d => d.sp)])
            .range([HEIGHT, 0])

        const x = d3.scaleBand()
            .domain(vis.data.map(d => d.borough))
            .range([0, WIDTH])
            .padding(0.1)

        //setting axis x and y
        const xAxisCall = d3.axisBottom(x)

        vis.xAxisGroup.transition().duration(500).call(xAxisCall)

        const yAxisCall = d3.axisLeft(y)
        vis.yAxisGroup.transition().duration(500).call(yAxisCall)

        //data join 4 taking the data we want to select
        const rects = vis.svg.append("g")
            .selectAll("g")
            .data(vis.data)


        const newRects = vis.svg.selectAll("g")


        newRects.selectAll(".bars").remove()
        newRects.selectAll(".numbers").remove()



        // //update 6
        rects.transition().duration(500)
            .attr("x", d => x(d.borough))
            .attr("y", d => y(d.sp))
            .attr("width", x.bandwidth)
            .attr("height", d => HEIGHT - y(d.sp))

        // enter 7 does exist in the array and does not exist on screen
        rects.enter()
            .append("rect")
            .attr("class", "bars")
            .attr("x", d => x(d.borough))
            .attr("width", x.bandwidth)
            .attr("fill", "orange")
            .attr("y", HEIGHT)
            .transition().duration(500)
            .attr("height", d => HEIGHT - y(d.sp))
            .attr("y", d => y(d.sp))

        rects.enter()
            .append("text")
            .attr("class", "numbers")
            .text(function (d) {
                return d.sp;
            })
            .attr("y", function (d) {
                return y(d.sp) - 5;
            })
            .attr("x", d => x(d.borough) + x.bandwidth() / 2)
            .style("text-anchor", "middle")
            .style("font-size", "12px");

    }
}

