(function () {

    let regions = {};
    regions.draw = function (id, mapType, mapData, data, maxCount, toolTip) {
        let key;
        mapType == 0 ? key = "state" : key = "district";

        function mouseOver(d) {
            d3.select("#tooltip").transition().duration(200).style("opacity", .9);
            let left = d3.event.layerX, top = d3.event.layerY;
            let x = $(id).position();
            let containerWidth = $(id).width(), containerHeight = $(id).height();
            if (d[key] in data) {
                d3.select("#tooltip").html(toolTip(d[key], data[d[key]]));
                let tooltipWidth = $('#tooltip').width(), tooltipHeight = $('#tooltip').height();;

                if ((containerWidth - (left - x.left) - 10) < tooltipWidth) {
                    left = left - tooltipWidth;
                    if (left < 0) {
                        left = 0;
                    }
                }

                if ((containerHeight - (top - x.top) - 10) < tooltipHeight) {
                    top = top - tooltipHeight;
                }

                d3.select("#tooltip").style("left", left + "px").style("top", top + "px");
            }
            else {
                d3.select("#tooltip").html(toolTip(d[key], 0));
                let tooltipWidth = $('#tooltip').width(), tooltipHeight = $('#tooltip').height();;

                if ((containerWidth - (left - x.left) - 10) < tooltipWidth) {
                    left = left - tooltipWidth;
                    if (left < 0) {
                        left = 0;
                    }
                }

                if ((containerHeight - (top - x.top) - 10) < tooltipHeight) {
                    top = top - tooltipHeight;
                }

                d3.select("#tooltip").style("left", left + "px").style("top", top + "px");
            }
        }



        function mouseOut() {
            d3.select("#tooltip").transition().duration(500).style("opacity", 0);
        }





        d3.select(id).selectAll(".region")
            .data(mapData).enter().append("path").attr("class", "region").attr("d", function (d) {
                return d.path;
            })
            .style("fill", function (d) {
                if (d[key] in data) {
                    if (mapType == 0) {
                        return d3.interpolateGreys((0.8 * data[d[key]]) / (maxCount || 0.001));
                    }
                    else {
                        return d3.interpolateGreens((0.8 * data[d[key]]) / (maxCount || 0.001));
                    }
                }
                else {
                    return '#FFFFFF';
                }
            })
            .style("stroke", function (d) {
                if (mapType == 0) {
                    return "#6C757D30";
                }
                else {
                    return "#28A74520";
                }
            })
            .style("stroke-width", "2")
            .on("mousemove", mouseOver)
            .on("mouseout", mouseOut);
    }
    this.regions = regions;
})();