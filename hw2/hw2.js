// 常量
const width = 600;
const height = 600;
const margin = { top: 50, bottom: 50, left: 50, right: 50 };

// 设置画布
const svg1 = d3.select('body').append('svg')
       .attr('width', width).attr('height', height);

const svg2 = d3.select('body').append('svg')
       .attr('width', width).attr('height', height);

const svg3 = d3.select('body').append('svg')
       .attr('width', width).attr('height', height);

pca_path = "./data/PCA.csv"
tsne_path = "./data/TSNE.csv"
mds_path = "./data/MDS.csv"



// 创建颜色比例尺
const colorScale = d3.scaleOrdinal()
                    .domain(Array.from({length: 51}, (_, i) => i))
                    .range(d3.schemeCategory10);


function plotScatter(pca_path, svg) {

    // 加载数据
    d3.csv(pca_path).then(function(data){

      // 从数据中提取x、y和label
      const x = data.map((d) => parseFloat(d.X));
      const y = data.map((d) => parseFloat(d.Y));
      const labels = data.map((d) => parseFloat(d.label));
      const xTolerant = (d3.max(x) - d3.min(x)) / 10
      const yTolerant = (d3.max(y) - d3.min(y)) / 10
  
      // 计算唯一的标签值，并按升序排列
      const uniqueLabels = labels.filter((d, i) => labels.indexOf(d) == i)
                                 .sort((a, b) => a - b);
  
      // 创建横轴和纵轴比例尺
      const xScale = d3.scaleLinear()
                       .domain([d3.min(x) - xTolerant, d3.max(x) + xTolerant])
                       .range([margin.left, width - margin.right]);
      const yScale = d3.scaleLinear()
                       .domain([d3.min(y) - yTolerant, d3.max(y) + yTolerant])
                       .range([height - margin.bottom, margin.top]);
  
      // 创建横轴和纵轴对象，并添加到SVG画布中
      svg.append("g").attr("class", "xAxis")
         .attr("transform", `translate(0, ${height - margin.bottom})`)
         .call(d3.axisBottom(xScale));
      svg.append("g").attr("class", "yAxis")
         .attr("transform", `translate(${margin.left}, 0)`)
         .call(d3.axisLeft(yScale));
  
      // 创建颜色比例尺
      const colorScale = d3.scaleOrdinal()
                           .domain(uniqueLabels)
                           .range(d3.schemeCategory10);

      // 绘制散点图
      svg.append("g").selectAll("circle").data(data).enter().append("circle")
         .attr("cx", (d) => xScale(d.X)).attr("cy", (d) => yScale(d.Y)).attr("r", 5)
         .attr("fill", (d) => colorScale(d.label))
         .attr("id", (d,i)=> i)
    });

}

// 绘制三种降维方法的图
plotScatter(pca_path, svg1);
plotScatter(tsne_path, svg2);
plotScatter(mds_path, svg3);

// selected
var selected = function(d){
    d3.selectAll(`circle[id="${d3.select(this).attr('id')}"]`)
    .transition().duration(200)
    .attr("r", 7).attr("stroke", "black").attr("stroke-width", "2px")
}

// unselected
var unselected = function(d){
    d3.selectAll(`circle[id="${d3.select(this).attr('id')}"]`)
        .transition().duration(200)
        .attr("r", 5).attr("stroke-width", "0px")
}

setTimeout(function() {
    const circles = d3.selectAll("circle")
        .on("mouseover", selected)
        .on("mouseleave", unselected);
    console.log(circles)
}, 1000);
