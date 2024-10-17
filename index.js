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
        formatter: function (params) {
            // 功率单位转换
            let power = params.value[0];
            let formattedPower = '';
            if (power >= 1000000) {
                formattedPower = (power / 1000000).toFixed(2) + ' W';
            } else if (power >= 1000) {
                formattedPower = (power / 1000).toFixed(2) + ' mW';
            } else {
                formattedPower = power.toFixed(2) + ' uW';
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
                params.value[3] // 显示样本名称
            );
        },

        axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
                type: 'dashed',
                width: 1
            }
        }
    },

    xAxis: {
        type: 'log',
        name: 'Power',
        min: 1,
        max: 1000000,
        axisLabel: {
            formatter: function (value) {
                // 功率单位转换
                if (value >= 1000000) {
                    return (value / 1000000) + ' W';  // 将1000000 uW转换为1 W
                } else if (value >= 1000) {
                    return (value / 1000) + ' mW';    // 将1000 uW转换为1 mW
                } else {
                    return value + ' uW';             // 小于1000时保持单位为uW
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
            data: [
                [16.43, 1939.456, 0.00847, "sample4", "https://ieeexplore.ieee.org/document/9449866"],
                [620, 76.8, 8.073, "sample26"],
                [29.9, 491.52, 0.0608, "sample28"],
                [52500, 7680, 6.836, "sample44"],
                [229, 2313.13, 0.099, "sample46"],
                [620, 76.8, 8.1, "sample53"],
                [107000, 9727, 11, "sample64"],
                [760000, 62208, 12.21, "sample65"],
                [188388, 71089.92, 2.65, "sample67"]
            ],
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
            data: [
                [134.5, 3969, 0.0338, "sample13"],
                [71.2, 1474.56, 0.0483, "sample14"],
                [77, 7864.32, 0.0098, "sample15"],
                [1400, 1545.87, 0.9056, "sample17"],
                [6200, 12288, 0.5046, "sample18"],
                [5300, 7864.32, 0.6739, "sample42"],
                [205000, 165888, 1.23, "sample56"],
                [111, 3276.8, 0.034, "sample58"],
                [5.7, 96, 0.059, "sample59"],
                [34400, 988.2, 34, "sample61"],
                [5750, 7864.32, 0.731, "sample62"],
                [34.4, 8847.36, 0.00388, "sample63"],
                [598600, 540000, 1.11, "sample69"],
                [612000, 1470873, 0.42, "sample70"],
                [75000, 20833, 3.6, "sample71"],
                [185000, 242457, 0.76, "sample72"],
                [31521, 1106, 28.5, "sample74"],
                [8560, 9216, 0.929, "sample75"]
            ],
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
            data: [
                [1, 4.096, 0.2441, "sample24"],
                [17.4, 245.76, 0.0708, "sample25"],
                [23000, 5068.8, 4.5, "sample45"]
            ],
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
                    [{ coord: [1, 10], symbol: 'none' }, { coord: [1000000, 10000000], symbol: 'none', name: '0.1 nJ/pixel' }],
                    [{ coord: [1, 100], symbol: 'none' }, { coord: [100000, 10000000], symbol: 'none', name: '0.01 nJ/pixel' }],
                    [{ coord: [1, 1000], symbol: 'none' }, { coord: [10000, 10000000], symbol: 'none', name: '0.001 nJ/pixel' }]
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
                params.value[3] // 显示样本名称
            );
        },

        axisPointer: {
            show: true,
            type: 'cross',
            lineStyle: {
                type: 'dashed',
                width: 1
            }
        }
    },

    xAxis: {
        type: 'log',
        name: 'Power (Watt)',
        min: 0.1,
        max: 10000000,
        axisLabel: {
            formatter: function (value) {
                if (value >= 1000000) {
                    return (value / 1000000).toFixed(1) + ' W'; // Convert to W
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(1) + ' mW'; // Convert to mW
                }
                return value.toFixed(1) + ' uW'; // Show as uW
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
                if (value >= 1000000000) {
                    return (value / 1000000000).toFixed(1) + ' TOPS'; // Convert to TOPS
                } else if (value >= 1000000) {
                    return (value / 1000000).toFixed(1) + ' GOPS'; // Convert to GOPS
                }
                return value.toFixed(1) + ' MOPS'; // Show as MOPS
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
            data: [
                [881.7, 51200, 58, "sample7"],
                [1800, 981.72, 0.5454, "sample8"],
                [1800, 981.7, 0.5454, "sample21"],
                [94500, 22551500, 27, "sample22"],
                [32000, 140000, 4.375, "sample27"],
                [10.17, 92.14, 9.06, "sample43"],
                [900, 478800, 532, "sample47"],
                [170, 255, 1.5, "sample54"],
                [200, 2660, 13.3, "sample66"]
            ],
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
            data: [
                [2.17, 24.93, 11.49, "sample1"],
                [0.147, 2.543, 17.3, "sample2"],
                [2.14, 14.74, 6.89, "sample3"],
                [12.16, 16.05, 1.32, "sample5"],
                [4.45, 51.13, 11.49, "sample6"],
                [60800, 4550000000, 74800, "sample9"],
                [1230000, 655000, 0.5325, "sample12"],
                [26200, 20000, 0.7634, "sample16"],
                [5.9, 48.56, 8.23, "sample19"],
                [6500, 65000, 10, "sample29"],
                [379100, 1210000, 3.19, "sample55"],
                [53.2, 193.9, 3.6, "sample57"],
                [1230000, 658000, 0.535, "sample73"]
            ],
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
            data: [
                [225000, 1600000, 7.1, "sample68"]
            ],
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
                    position: 'end',
                    color: 'gray'
                },
                lineStyle: {
                    type: 'dashed',
                    color: 'gray'
                },
                data: [
                    [{ coord: [100, 1], symbol: 'none' }, { coord: [10000000, 100000], symbol: 'none', name: '0.01 TOPS/W' }],
                    [{ coord: [10, 1], symbol: 'none' }, { coord: [10000000, 1000000], symbol: 'none', name: '0.1 TOPS/W' }],
                    [{ coord: [1, 1], symbol: 'none' }, { coord: [10000000, 10000000], symbol: 'none', name: '1 TOPS/W' }],
                    [{ coord: [0.1, 1], symbol: 'none' }, { coord: [10000000, 100000000], symbol: 'none', name: '10 TOPS/W' }],
                    [{ coord: [0.1, 10], symbol: 'none' }, { coord: [10000000, 1000000000], symbol: 'none', name: '100 TOPS/W' }],
                    [{ coord: [0.1, 100], symbol: 'none' }, { coord: [5000000, 5000000000], symbol: 'none', name: '1k TOPS/W' }],
                    [{ coord: [0.1, 1000], symbol: 'none' }, { coord: [500000, 5000000000], symbol: 'none', name: '10k TOPS/W' }],
                ]
            }
        }
    ]
};







