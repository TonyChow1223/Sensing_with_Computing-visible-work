option1 = {
    title: {
        text: 'Using pixel/s as speed metric',
        left: 'center',
        top: '0%'
    },

    grid: {
        left: '3%',
        right: '15%',
        bottom: '5%',
        containLabel: true
    },

    tooltip: {
        showDelay: 0,
        confine: true,  // 确保 tooltip 不超出图表容器
        textStyle: {
            fontSize: 12,
        },
        position: function (point, params, dom, rect, size) {
            // 当前鼠标位置
            var x = point[0];
            var y = point[1];

            // 图表的宽高
            var viewWidth = size.viewSize[0];
            var viewHeight = size.viewSize[1];

            // tooltip 的宽高
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // 如果 tooltip 超出右边界，则调整 x 位置
            if (x + boxWidth > viewWidth) {
                x = viewWidth - boxWidth - 10; // 留出 10px 的边距
            }
            // 如果 tooltip 超出左边界，则调整 x 位置
            if (x < 0) {
                x = 10; // 留出 10px 的边距
            }
            // 如果 tooltip 超出下边界，则调整 y 位置
            if (y + boxHeight > viewHeight) {
                y = viewHeight - boxHeight - 10; // 留出 10px 的边距
            }
            // 如果 tooltip 超出上边界，则调整 y 位置
            if (y < 0) {
                y = 10; // 留出 10px 的边距
            }

            return [x, y];
        },

        formatter: function (params) {
            // 功率单位转换
            let power = params.value[0];
            let formattedPower = '';

            if (power >= 1000000) {
                formattedPower = (power / 1000000).toFixed(2) + ' W'; // 转换为瓦特
            } else if (power >= 1000) {
                formattedPower = (power / 1000).toFixed(2) + ' mW'; // 转换为毫瓦特
            } else if (power >= 0.001) {
                formattedPower = power.toFixed(2) + ' µW'; // 转换为微瓦特
            } else {
                formattedPower = (power * 1000).toFixed(2) + ' nW'; // 转换为纳瓦特
            }

            if (params.seriesName === 'FoM Lines') {
                return `FoM = ${params.name}`;
            }

            return (
                'Power: ' + formattedPower +  // 转换后的功率显示
                '<br/>' +
                'Speed: ' + params.value[1] + ' kpixel/s ' + // 显示速度
                '<br/>' +
                'FoM: ' + params.value[2] + ' nJ/pixel ' + // 显示能效
                '<br/>' +
                'Fabrication: ' + params.value[5] +
                '<br/>' +
                params.value[3] // 显示样本名称
            );
        },

    },

    xAxis: {
        type: 'log',
        name: 'Power',
        min: 0.000999,  // 将最小值扩展到 1 nW (0.001 µW)
        max: 1000000,
        axisLabel: {
            formatter: function (value) {
                // 功率单位转换
                if (value >= 1000000) {
                    return (value / 1000000) + ' W';
                } else if (value >= 1000) {
                    return (value / 1000) + ' mW';
                } else if (value >= 1) {
                    return value + ' µW';
                } else if(value >=0.001){
                    return (value * 1000) + ' nW';  // 小于1 µW时显示为nW
                }
            }
        }
    },

    yAxis: {
        type: 'log',
        name: 'Speed/Throughput(kpixel/s)',
        min: 1,
        max: 10000000,
        axisLabel: {
            formatter: '{value}'
        }
    },

    legend: {
        data: ['NearSensor', 'InSensor', 'Unknown'],
        left: 'center',
        top: 'bottom'
    },

    series: [
        {
            name: 'NearSensor',
            type: 'scatter',
            symbolSize: 13,
            data: [],
            symbol: 'circle',
            visible: true
        },
        {
            name: 'InSensor',
            type: 'scatter',
            symbolSize: 13,
            itemStyle: {
                color: 'green'
            },
            symbol: 'triangle',
            data: [],
            symbol: 'triangle',
            visible: true
        },
        {
            name: 'Unknown',
            type: 'scatter',
            symbolSize: 13,
            itemStyle: {
                color: 'black'
            },
            symbol: 'square',
            data: [],
            visible: true
        },
        {
            name: 'FoM Lines',
            type: 'scatter',
            symbolSize: 0,
            data: [],
            markLine: {
                silent: true,
                symbol: 'none',
                label: {
                    formatter: function (params) {
                        return  params.name;
                    },
                    rotate:15,
                    position: 'end',
                    color: 'gray'
                },
                lineStyle: {
                    type: 'dashed',
                    color: 'gray'
                },
                data: [
                    [{ coord: [100, 1], symbol: 'none' }, { coord: [1000000, 10000], symbol: 'none', name: '100 nJ/pixel' }],
                    [{ coord: [10, 1], symbol: 'none' }, { coord: [1000000, 100000], symbol: 'none', name: '10 nJ/pixel' }],
                    [{ coord: [1, 1], symbol: 'none' }, { coord: [1000000, 1000000], symbol: 'none', name: '1 nJ/pixel' }],
                    [{ coord: [0.1, 1], symbol: 'none' }, { coord: [1000000, 10000000], symbol: 'none', name: '0.1 nJ/pixel' }],
                    [{ coord: [0.01, 1], symbol: 'none' }, { coord: [100000, 10000000], symbol: 'none', name: '0.01 nJ/pixel' }],
                    [{ coord: [0.001, 1], symbol: 'none' }, { coord: [10000, 10000000], symbol: 'none', name: '0.001 nJ/pixel' }]
                ]
            }
        }
    ]
};

option2 = {
    title: {
        text: 'Using OPS as speed metric',
        left: 'center',
        top: '0%'
    },

    grid: {
        left: '3%',
        right: '15%',
        bottom: '3.5%',
        containLabel: true
    },

    tooltip: {
        showDelay: 0,
        confine: true,  // 确保 tooltip 不超出图表容器
        textStyle: {
            fontSize: 12,
        },
        position: function (point, params, dom, rect, size) {
            // 当前鼠标位置
            var x = point[0];
            var y = point[1];

            // 图表的宽高
            var viewWidth = size.viewSize[0];
            var viewHeight = size.viewSize[1];

            // tooltip 的宽高
            var boxWidth = size.contentSize[0];
            var boxHeight = size.contentSize[1];

            // 如果 tooltip 超出右边界，则调整 x 位置
            if (x + boxWidth > viewWidth) {
                x = viewWidth - boxWidth - 10; // 留出 10px 的边距
            }
            // 如果 tooltip 超出左边界，则调整 x 位置
            if (x < 0) {
                x = 10; // 留出 10px 的边距
            }
            // 如果 tooltip 超出下边界，则调整 y 位置
            if (y + boxHeight > viewHeight) {
                y = viewHeight - boxHeight - 10; // 留出 10px 的边距
            }
            // 如果 tooltip 超出上边界，则调整 y 位置
            if (y < 0) {
                y = 10; // 留出 10px 的边距
            }

            return [x, y];
        },

        formatter: function (params) {
            // 功耗转换

            let power = params.value[0];
            let powerUnit = 'uW';
            if (power >= 1000) {
                power /= 1000;
                powerUnit = 'mW';
            }
            if (power >= 1000) {
                power /= 1000;
                powerUnit = 'W';
            }
            if (power < 1) {
                power *=1000;
                powerUnit = 'nW';
            }

            // 速度转换
            let speed = params.value[1];
            let speedUnit = 'MOPS';
            if (speed >= 1000) {
                speed /= 1000;
                speedUnit = 'GOPS';
            }
            if (speed >= 1000) {
                speed /= 1000;
                speedUnit = 'TOPS';
            }

            return (
                'Power: ' + power.toFixed(2) + ' ' + powerUnit + // 显示功耗
                '<br/>' +
                'Speed: ' + speed.toFixed(2) + ' ' + speedUnit + // 显示速度
                '<br/>' +
                'Eff.: ' + params.value[2] + ' TOPS/W ' + // 显示能效
                '<br/>' +
                'Fabrication: ' + params.value[5] +
                '<br/>' +
                params.value[3] // 显示样本名称
            );
        },

    },

    xAxis: {
        type: 'log',
        name: 'Power (Watt)',
        min: 0.001,
        max: 5000000,
        axisLabel: {
            formatter: function (value) {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(0) + ' W'; // Convert to W
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(0) + ' mW'; // Convert to mW
                } else if (value >= 1) {
                    return (value).toFixed(0) + ' uW'; // Show uW
                } else
                return (value*1000).toFixed(0) + ' nW'; // Show as uW
            }
        }
    },

    yAxis: {
        type: 'log',
        name: 'Speed/Throughput (OPS)',
        min: 1,
        max: 5000000000,
        axisLabel: {
            formatter: function (value) {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(0) + ' TOPS'; // Convert to TOPS
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(0) + ' GOPS'; // Convert to GOPS
                }
                return value.toFixed(0) + ' MOPS'; // Show as MOPS
            }
        }
    },

    legend: {
        data: ['NearSensor', 'InSensor', 'Unknown'],
        left: 'center',
        top: 'bottom'
    },

    series: [
        {
            name: 'NearSensor',
            type: 'scatter',
            symbolSize: 13,
            data: [],
            symbol: 'circle',
            visible: true
        },
        {
            name: 'InSensor',
            type: 'scatter',
            symbolSize: 13,
            itemStyle: {
                color: 'green'
            },
            symbol: 'triangle',
            data: [],
            symbol: 'triangle',
            visible: true
        },
        {
            name: 'Unknown',
            type: 'scatter',
            symbolSize: 13,
            itemStyle: {
                color: 'black'
            },
            symbol: 'square',
            data:[],
            visible: true
        },
        {
            name: 'Eff. Lines',
            type: 'scatter',
            symbolSize: 0,
            data: [],
            markLine: {
                silent: true,
                symbol: 'none',
                label: {
                    formatter: function (params) {
                        return params.name;
                    },
                    rotate:15,
                    position: 'end',
                    color: 'gray'
                },
                lineStyle: {
                    type: 'dashed',
                    color: 'gray'
                },
                data: [
                    [{ coord: [100, 1], symbol: 'none' }, { coord: [5000000, 50000], symbol: 'none', name: '0.01 TOPS/W' }],
                    [{ coord: [10, 1], symbol: 'none' }, { coord: [5000000, 500000], symbol: 'none', name: '0.1 TOPS/W' }],
                    [{ coord: [1, 1], symbol: 'none' }, { coord: [5000000, 5000000], symbol: 'none', name: '1 TOPS/W' }],
                    [{ coord: [0.1, 1], symbol: 'none' }, { coord: [5000000, 50000000], symbol: 'none', name: '10 TOPS/W' }],
                    [{ coord: [0.01, 1], symbol: 'none' }, { coord: [5000000, 500000000], symbol: 'none', name: '100 TOPS/W' }],
                    [{ coord: [0.001, 1], symbol: 'none' }, { coord: [5000000, 5000000000], symbol: 'none', name: '1k TOPS/W' }],
                    [{ coord: [0.001, 10], symbol: 'none' }, { coord: [500000, 5000000000], symbol: 'none', name: '10k TOPS/W' }],
                ]
            }
        }
    ]
};

// 从JSON中抓数据
fetch("./data.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error("Network response was not ok " + response.statusText);
        }
        return response.json();
    })
    .then((data) => {
        // 分类并将数据分配到 option1 或 option2 中
        data.data.forEach((item) => {
            const targetOption = item.option === 1 ? option1 : option2;
            const series = targetOption.series.find(
                (series) => series.name === item.category
            );
            if (series) {
                // 这里将数据推送为数组形式 [power, Speed, Energy eff., Name, Links, Fabrication]
                series.data.push([
                    item.power,                // power
                    item.Speed,                // Speed
                    item['Energy eff.'],       // Energy efficiency
                    item.Name,                 // Name
                    item.Links,                // Links
                    item.Fabrication           // Fabrication
                ]);
            }
        });

        // 初始化图表
        const graph1 = echarts.init(document.getElementById("graph-1"));
        graph1.setOption(option1);
        const graph2 = echarts.init(document.getElementById("graph-2"));
        graph2.setOption(option2);
    })
    .catch((error) => {
        console.error("Error loading data:", error);
    });

// 点击跳转到文献链接
const graph1 = echarts.init(document.getElementById('graph-1'));
graph1.setOption(option1);
graph1.on('click', function (params) {
    const dataPoint = params.data;
    if (dataPoint && dataPoint[4]) {  // dataPoint[4] 是链接
        window.open(dataPoint[4]);
    }
});

const graph2 = echarts.init(document.getElementById('graph-2'));
graph2.setOption(option2);
graph2.on('click', function (params) {
    const dataPoint = params.data;
    if (dataPoint && dataPoint[4]) {  // dataPoint[4] 是链接
        window.open(dataPoint[4]);
    }
});
