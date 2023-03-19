// define constants
const width = 600, height = 600, margin = { top: 50, bottom: 50, left: 50, right: 50 };
const svgData = [{path: './data/PCA.csv', svg: 'svg1'}, 
                 {path: './data/TSNE.csv', svg: 'svg2'}, 
                 {path: './data/MDS.csv', svg: 'svg3'}];

// setting svgs
svgData.forEach(({path, svg}) => {
    d3.select('body').append('svg').attr('width', width).attr('height', height).attr('id', svg);
    plotScatter(path, d3.select(`#${svg}`));
});

// import data and draw circles
function plotScatter(pca_path, svg) {
    d3.csv(pca_path).then(function(data){
        const x = data.map(d => +d.X), y = data.map(d => +d.Y), labels = data.map(d => +d.label);
        const xTolerant = (d3.max(x) - d3.min(x)) / 10, yTolerant = (d3.max(y) - d3.min(y)) / 10;
        const uniqueLabels = labels.filter((d, i) => labels.indexOf(d) == i).sort((a, b) => a - b);
        const xScale = d3.scaleLinear().domain([d3.min(x) - xTolerant, d3.max(x) + xTolerant]).range([margin.left, width - margin.right]);
        const yScale = d3.scaleLinear().domain([d3.min(y) - yTolerant, d3.max(y) + yTolerant]).range([height - margin.bottom, margin.top]);
        const colorScale = d3.scaleOrdinal().domain(uniqueLabels).range(d3.schemeCategory10);
        
        svg.append("g").attr("class", "xAxis")
           .attr("transform", `translate(0, ${height - margin.bottom})`).call(d3.axisBottom(xScale));
        svg.append("g").attr("class", "yAxis")
           .attr("transform", `translate(${margin.left}, 0)`).call(d3.axisLeft(yScale));
        
        svg.append("g").selectAll("circle").data(data).enter().append("circle")
           .attr("cx", d => xScale(d.X)).attr("cy", d => yScale(d.Y)).attr("r", 5)
           .attr("fill", d => colorScale(d.label)).attr("id", (d,i)=> i);
    });
}

// waid load
setTimeout(() => {
    const circles = d3.selectAll("circle").on("mouseover", selected).on("mouseleave", unselected);
}, 3000);

// select circle
const selected = function(){
    d3.selectAll(`circle[id="${d3.select(this).attr('id')}"]`)
      .transition().duration(200).attr("r", 7).attr("stroke", "black").attr("stroke-width", "2px");
}

// unselect circle
const unselected = function(){
    d3.selectAll(`circle[id="${d3.select(this).attr('id')}"]`)
      .transition().duration(200).attr("r", 5).attr("stroke-width", "0px");
}
