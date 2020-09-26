let sampleData = [{
    "Maharashtra": 34761,
    "Andhra Pradesh": 5606,
    "Tamil Nadu": 9148,
    "Karnataka": 8417,
    "Uttar Pradesh": 5450,
    "Delhi": 5147,
    "West Bengal": 4665,
    "Odisha": 836,
    "Telangana": 1091,
    "Bihar": 881,
    "Assam": 625,
    "Kerala": 636,
    "Gujarat": 3394,
    "Rajasthan": 1412,
    "Haryana": 1273,
    "Madhya Pradesh": 2152,
    "Punjab": 3134,
    "Chhattisgarh": 777,
    "Jharkhand": 661,
    "Jammu and Kashmir": 1105,
    "Uttarakhand": 555,
    "Goa": 386,
    "Puducherry": 494,
    "Tripura": 265,
    "Himachal Pradesh": 152,
    "Chandigarh": 145,
    "Manipur": 63,
    "Arunachal Pradesh": 14,
    "Nagaland": 11,
    "Meghalaya": 43,
    "Ladakh": 56,
    "Andaman and Nicobar Islands": 52,
    "Dadra and Nagar Haveli and Daman and Diu": 2,
    "Sikkim": 31,
    "Mizoram": 0,
    "Lakshadweep": 0
    },
    {
    "Ahmadnagar": 8054,
    "Akola": 2319,
    "Amravati": 2667,
    "Aurangabad": 8955,
    "Beed": 3061,
    "Bhandara": 2096,
    "Buldhana": 1872,
    "Chandrapur": 4402,
    "Dhule": 1370,
    "Gadchiroli": 356,
    "Gondiya": 1956,
    "Hingoli": 576,
    "Jalgaon": 8795,
    "Jalna": 1846,
    "Kolhapur": 8435,
    "Latur": 3729,
    "Mumbai": 26762,
    "Mumbai Suburban": 0,
    "Nagpur": 19142,
    "Nanded": 6687,
    "Nandurbar": 1108,
    "Nashik": 14005,
    "Osmanabad": 2977,
    "Palghar": 6003,
    "Parbhani": 1369,
    "Pune": 59775,
    "Raigad": 8188,
    "Ratnagiri": 2869,
    "Sangli": 10557,
    "Satara": 8992,
    "Sindhudurg": 1326,
    "Solapur": 7494,
    "Thane": 28894,
    "Wardha": 1119,
    "Washim": 826,
    "Yavatmal": 3020
}]



function getMax(data) {
    let max = 0;
    for (const key in data) {
        let value = data[key];
        if(value > max) {
            max = value;
        }
    }
    return max;
}



function drawScale(id, mapType, maxCount) {
    const svg = d3.select(id);
    const numCells = 6;
    let color;
    mapType == 0 ? color = d3.scaleSequential(d3.interpolateGreys).domain([0, maxCount / 0.8 || 10])
    : color = d3.scaleSequential(d3.interpolateGreens).domain([0, maxCount / 0.8 || 10]);
    
    let label = ({ i, genLength, generatedLabels, labelDelimiter }) => {
        if (i === genLength - 1) {
            const n = Math.floor(generatedLabels[i]);
            return `${n}+`;
        } else {
            const n1 = 1 + Math.floor(generatedLabels[i]);
            const n2 = Math.floor(generatedLabels[i + 1]);
            return `${n1} - ${n2}`;
        }
    };
    
    const delta = Math.floor((maxCount < numCells ? numCells : maxCount) / (numCells - 1));
    let cells = Array.from(Array(numCells).keys()).map((i) => i * delta);
    
    svg
        .append('g')
        .attr('class', 'legendLinear')
        .attr('transform', function () {
            if (mapType == 0) {
                return 'translate(50, 450)';
            }
            else {
                return 'translate(400, 450)';
            }
        });
    
    const legendLinear = d3.legendColor()
        .shapeWidth(36)
        .shapeHeight(10)
        .cells(cells)
        .titleWidth(3)
        .labels(label)
        .title("Sample Data")
        .orient('vertical')
        .scale(color);
    
    svg
        .select('.legendLinear')
        .call(legendLinear)
        .selectAll('text')
        .style('font', '10px monospace');
}



function tooltipHtml(name, data) {
    return "<h4>" + name + "</h4><table>" +
        "<tr><td>Sample Data: </td><td>" + data + "</td></tr>" +
        "</table>";
}




let max0 = getMax(sampleData[0]), max1 = getMax(sampleData[1])
regions.draw("#india_state_ut_svg", 0, India, sampleData[0], max0, tooltipHtml);
regions.draw("#state_ut_district_svg", 1, MH, sampleData[1], max1, tooltipHtml);
drawScale("#india_state_ut_svg", 0, max0);
drawScale("#state_ut_district_svg", 1, max1);