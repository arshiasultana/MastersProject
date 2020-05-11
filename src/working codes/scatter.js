
import * as d3 from 'd3'

const api = 'https://udemy-react-d3.firebaseio.com/children.json';

//setting a margin so that the axis is visible

const MARGIN = { TOP: 100, BOTTOM: 100, LEFT: 200, RIGHT: 10 }
const WIDTH = 500 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 500 - MARGIN.TOP - MARGIN.BOTTOM;

export default class D3Chart {
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
            console.log(data)
            //setting x and y axis
            const y = d3.scaleLinear()

                //ADDING MINIMUM VALUE TO HEIGHT OF BARD
                .domain([0, d3.max(data, d => Number(d.height))])
                .range([HEIGHT, 0])

            const x = d3.scaleLinear()
                .domain([0, d3.max(data, d => Number(d.age))])
                .range([0, WIDTH])


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



            const circles = svg.selectAll("circle")
                .data(data, d => d.name)
            circles.enter().append("circle")
                .attr("cx", d => x(d.age))
                .attr("cy", d => y(d.height))
                .attr("r", 5)

                .attr("fill", "red")
        })
    }
}
