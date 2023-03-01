 // average temperature
 const avg_data = [
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
 
 // extract data
 abbr_month = avg_data.map((d)=>d.month)
 avg_temp = avg_data.map((d)=>d.temp)

 // constants
 const width = 1000;
 const height = 800;
 const margin = { top: 50, bottom: 50, left: 50, right: 50 };
 const url = "../data/temperature.csv"

 // svg setting
 const svg = d3.select('body').append('svg')
       .attr('width', width).attr('height', height);

 const yearBox = d3.select('body').append('yearBox')

 // mouse over event
 const mouseOver = function(event, d) {
    yearBox.style('opacity', 1).html(d.Year)
           .style("position", "absolute")
           .style("left", `${margin.left/2-5}px`)
           .style("top", `${event.y}px`)
    d3.select(this).style('stroke','black')
 }

 // mouse leave event
 const mouseLeave = function(){
    yearBox.style('opacity', 0)
    d3.select(this).style('stroke','none')
 }

 //read data
 d3.csv(url).then(function(data) {
    // get months
    month = data.map((d)=>d.Month)
    uniqueMonth = month.filter((d,i)=>month.indexOf(d)==i)

    // get years
    year = data.map((d)=>d.Year)
    uniqueYear = year.filter((d,i)=>year.indexOf(d)==i).reverse()

    // get anomaly
    anomaly = data.map((d)=>d.Anomaly)

    // xScale setting for discrete months
    const xScale = d3.scaleBand()
             .domain(month).range([margin.left, width-margin.right])
             .padding(0.1)
    
    // create xAxis on svg
    const xAxis = svg.append("g").attr("class", "xAxis")
                      .attr("transform", `translate(0, ${height-margin.bottom})`)
                      .call(d3.axisBottom(xScale).tickFormat((i)=>abbr_month[i-1]).tickSize(0))
                      .select(".domain").remove()
    
    // yScale setting for discrete years
    // no need to display yAxis
    const yScale = d3.scaleBand()
                     .domain(uniqueYear).range([height-margin.bottom, margin.top])
                     .padding(0.01)
              
    // calculate max temp and min temp
    max_temp = d3.max(avg_temp) + parseFloat(anomaly.reduce((a,b)=>parseFloat(a)>parseFloat(b) ? a:b));
    min_temp = d3.min(avg_temp) + parseFloat(anomaly.reduce((a,b)=>parseFloat(a)<parseFloat(b) ? a:b));
    interval = max_temp - min_temp

    // add rectangles
    svg.append("g").selectAll("rect").data(data).enter().append("rect")
       .attr("x", (d)=>xScale(d.Month)).attr("y", (d)=>yScale(d.Year))
       .attr("width", xScale.bandwidth()).attr("height", yScale.bandwidth())
       .style("fill", function(d) { 
          return d3.interpolateRdBu(1 - (avg_temp[d.Month-1] + parseFloat(d.Anomaly) - min_temp) / interval)})
       .on("mouseover", mouseOver)
       .on("mouseleave", mouseLeave)
    
    // legendScale setting for temperatures
    const legendScale = d3.scaleLinear()
                          .domain([1,0])
                          .range([width/2-margin.left*4, width/2+margin.right*4])
    
    // create legendAxis on svg
    const legendAxis = svg.append("g").attr("class","legendAxis")
                          .attr("transform",`translate(0,${height-margin.top/3})`)
                          .call(d3.axisBottom(legendScale).tickFormat((d)=>`${d*interval+min_temp}°C`).ticks(2))
    
    // add lengend rectangles
    legendAxis.append("g").selectAll("rect").data(d3.range(1,0,-0.01)).enter().append("rect")
              .style("fill", (d)=>d3.interpolateRdBu(1-d))
              .attr('height',3).attr('width', 4)
              .attr("x", (d)=>legendScale(d))
 });
      