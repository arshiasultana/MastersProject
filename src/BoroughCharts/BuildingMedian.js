import * as d3 from 'd3'

const api = 'http://127.0.0.1:5000/building_category_median_2019';

//setting a margin so that the axis is visible

const MARGIN = { TOP: 100, BOTTOM: 100, LEFT: 200, RIGHT: 10 }
const WIDTH = 1000 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 1000 - MARGIN.TOP - MARGIN.BOTTOM;

export default class BuildingMedian {
    constructor(element) {
        const svg = d3.select(element)
            .append("svg")
            .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
            .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)

            //MAKING A GROUP TO ALIGN THE GRAPH
            .append("g")
            .attr("transform", "translate(" + MARGIN.LEFT + "," + MARGIN.TOP + ")")

        //getting the json data 
        d3.json(api).then(data => {

            //setting x and y axis
            const y = d3.scaleLinear()

                //ADDING MINIMUM VALUE TO HEIGHT OF BARD
                .domain([d3.min(data, d => d.sp) * 0.95, d3.max(data, d => d.sp)])
                .range([HEIGHT, 0])

            const x = d3.scaleBand()
                .domain(data.map(d => d.index))
                .range([0, WIDTH])
                .padding(0.1)

            //setting axis x and y
            const xAxisCall = d3.axisBottom(x)
            svg.append("g")
                .attr("transform", "translate(" + 0 + "," + HEIGHT + ")")
                .call(xAxisCall)

            const yAxisCall = d3.axisLeft(y)
            svg.append("g").call(yAxisCall)

            //setting the x and y label
            svg.append("text")
                .attr("x", WIDTH / 2)
                .attr("y", HEIGHT + 40)
                .attr("text-anchor", "middle")
                .text("SALE PRICE")

            svg.append("text")
                .attr("x", -(HEIGHT / 2))
                .attr("y", -80)
                .attr("text-anchor", "middle")
                .text("DOLLAR VALUE")
                .attr("transform", "rotate(-90)")



            const rects = svg.selectAll("rect")
                .data(data)
            rects.enter().append("rect")
                .attr("x", d => x(d.index))
                .attr("y", d => y(d.sp))
                .attr("width", x.bandwidth)
                .attr("height", d => HEIGHT - y(d.sp))
                .attr("fill", "red")
        })
    }
}

