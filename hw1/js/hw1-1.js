// base data
const data = [
    { month: 'Jan', temp: 12.29 },
    { month: 'Feb', temp: 12.50 },
    { month: 'Mar', temp: 13.11 },
    { month: 'Apr', temp: 14.03 },
    { month: 'May', temp: 15.01 },
    { month: 'Jun', temp: 15.72 },
    { month: 'Jul', temp: 15.99 },
    { month: 'Aug', temp: 15.82 },
    { month: 'Sep', temp: 15.23 },
    { month: 'Oct', temp: 14.30 },
    { month: 'Nov', temp: 13.28 },
    { month: 'Dec', temp: 12.55 }
    ];

// constants
const width = 700;
const height = 500;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

// svg setting
const svg = d3.select('body').append('svg')
       .attr('width', width).attr('height', height);

// xScale setting for discrete months
month = data.map((d)=>d.month)
const xScale = d3.scalePoint()
          .domain(month)
          .range([margin.left, width - margin.right])
          .padding(0.5);

// yScale setting for continuous temperatures
temp = data.map((d)=>d.temp)
const yScale = d3.scaleLinear()
          .domain([d3.min(temp)-0.5,d3.max(temp)+0.5])
          .range([height - margin.bottom, margin.top]);

// create xAxis on svg
const xAxis = svg.append('g').attr('class', 'xAxis')
         .attr('transform', `translate(0, ${height - margin.bottom})`)
         .call(d3.axisBottom(xScale));


// create yAxis on svg
const yAxis = svg.append('g').attr('class', 'yAxis')
         .attr('transform', `translate(${margin.left}, 0)`)
         .call(d3.axisLeft(yScale).tickFormat((d)=>`${d} °C`));     

// port to line
const line = d3.line()
       .x((d)=>xScale(d.month))
       .y((d)=>yScale(d.temp));

// draw lines
svg.append('g').append("path").datum(data).attr('class', 'line').attr("d", line)
.attr('fill', 'none').attr('stroke', 'black').attr('stroke-width', 1);

// draw points
svg.append('g').selectAll("circle").data(data).enter().append("circle")
.attr("r", 5).attr('transform', (d)=>`translate(${xScale(d.month)}, ${yScale(d.temp)})`);

// title of the graph
const title = svg.append('text').attr("x", width / 4).attr("y", margin.top)
          .attr("font-size", 20).text("Average Temperature Between 1951-1980")
