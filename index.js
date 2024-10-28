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
        confine: true,
        textStyle: {
            fontSize: 12 // 调整字体大小
        },
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
                'Fabrication: ' + params.value[5] +
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
                [16.43, 1939.456, 0.00847, "NS-MD: Near-Sensor Motion Detection With Energy Harvesting Image Sensor for Always-On Visual Perception", "https://ieeexplore.ieee.org/document/9449866", "180 nm CMOS"],
                [620, 76.8, 8.073, "A Low-Power Convolutional Neural Network Face Recognition Processor and a CIS Integrated With Always-on Face Detector", "https://ieeexplore.ieee.org/document/8197364", "65 nm CMOS"],
                [29.9, 491.52, 0.0608, "7.2 243.3pJ/pixel bio-inspired time-stamp-based 2D optic flow sensor for artificial compound eyes", "https://ieeexplore.ieee.org/document/6757366", "180nm CMOS"],
                [52500, 7680, 6.836, "An On-Chip Binary-Weight Convolution CMOS Image Sensor for Neural Networks", "https://ieeexplore.ieee.org/document/9119774", "180nm CMOS"],
                [229, 2313.13, 0.099, "A Data-Compressive 1.5/2.75-bit Log-Gradient QVGA Image Sensor With Multi-Scale Readout for Always-On Object Detection", "https://ieeexplore.ieee.org/document/8844721", "130 nm"],
                [620, 76.8, 8.1, "14.6 A 0.62mW ultra-low-power convolutional-neural-network face-recognition processor and a CIS integrated with always-on haar-like face detector", "https://ieeexplore.ieee.org/document/7870354", "65nm"],
                [107000, 9727, 11, "39 000-Subexposures/s Dual-ADC CMOS Image Sensor With Dual-Tap Coded-Exposure Pixels for Single-Shot HDR and 3-D Computational Imaging", "https://ieeexplore.ieee.org/document/10143350", "110nm CIS/ 65nm Digital Mask Generator"],
                [760000, 62208, 12.21, "A 1920 × 1080 25-Frames/s 2.4-TOPS/W Low-Power 6-D Vision Processor for Unified Optical Flow and Stereo Depth With Semi-Global Matching", "https://ieeexplore.ieee.org/document/8598832", "28 nm"],
                [188388, 71089.92, 2.65, "5.2 Energy-Efficient Low-Noise CMOS Image Sensor with Capacitor Array-Assisted Charge-Injection SAR ADC for Motion-Triggered Low-Power IoT Applications", "https://ieeexplore.ieee.org/document/8662306", "65nm"]
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
                [134.5, 3969, 0.0338, "A 0.8 V Intelligent Vision Sensor With Tiny Convolutional Neural Network and Programmable Weights Using Mixed-Mode Processing-in-Sensor Technique for Image Classification", "https://ieeexplore.ieee.org/document/10164007", "180 nm CMOS"],
                [71.2, 1474.56, 0.0483, "A 0.8 V Multimode Vision Sensor for Motion and Saliency Detection With Ping-Pong PWM Pixel", "https://ieeexplore.ieee.org/document/9425497", "180 nm"],
                [77, 7864.32, 0.0098, "A 0.5-V Real-Time Computational CMOS Image Sensor With Programmable Kernel for Feature Extraction", "https://ieeexplore.ieee.org/document/9250500", "180 nm"],
                [1400, 1545.87, 0.9056, "RedEye: Analog ConvNet Image Sensor Architecture for Continuous Mobile Vision", "https://ieeexplore.ieee.org/document/7551398", "180 nm"],
                [6200, 12288, 0.5046, "A 3.96μm, 124dB Dynamic Range, 6.2mW Stacked Digital Pixel Sensor with Monochrome and Near-Infrared Dual-Channel Global Shutter Capture", "https://ieeexplore.ieee.org/document/10185291", "45nm/40nm"],
                [5300, 7864.32, 0.6739, "A 4.6μm, 512×512, Ultra-Low Power Stacked Digital Pixel Sensor with Triple Quantization and 127dB Dynamic Range", "https://ieeexplore.ieee.org/document/9371913", "45nm CIS/ 65nm Stacked BSI"],
                [205000, 165888, 1.23, "5.1 A Stacked Global-Shutter CMOS Imager with SC-Type Hybrid-GS Pixel and Self-Knee Point Calibration Single Frame HDR and On-Chip Binarization Algorithm for Smart Vision Applications", "https://ieeexplore.ieee.org/document/8662441", "TSMC 40nm/65nm stacked backside-illumination (BSI) CMOS process"],
                [111, 3276.8, 0.034, "34.2 A 21pJ/frame/pixel Imager and 34pJ/frame/pixel Image Processor for a Low-Vision Augmented-Reality Smart Contact Lens", "https://ieeexplore.ieee.org/document/9365771", "imager: 90nm/65nm CIS, image processor: 40nm"],
                [5.7, 96, 0.059, "A 3.0μW@5fps QQVGA Self-Controlled Wake-Up Imager with On-Chip Motion Detection, Auto-Exposure and Object Recognition", "https://ieeexplore.ieee.org/document/9162854", "90nm"],
                [34400, 988.2, 34, "Dual-Tap Computational Photography Image Sensor With Per-Pixel Piplined Digital Memory for Intra-Frame Coded Multi-Exposure", "https://ieeexplore.ieee.org/document/8844261", "110nm CIS"],
                [5750, 7864.32, 0.731, "A 4.6-μm, 127-dB Dynamic Range, Ultra-Low Power Stacked Digital Pixel Sensor With Overlapped Triple Quantization", "https://ieeexplore.ieee.org/document/9684032", "45nm/65nm"],
                [34.4, 8847.36, 0.00388, "A 0.5 V, 14.28-kframes/s, 96.7-dB Smart Image Sensor With Array-Level Image Signal Processing for IoT Applications", "https://ieeexplore.ieee.org/document/7403939", "180nm"],
                [598600, 540000, 1.11, "4.6 A 1/2.3inch 20Mpixel 3-layer stacked CMOS Image Sensor with DRAM", "https://ieeexplore.ieee.org/document/7870268", "90 nm CIS/ 30nm DRAM/40 nm Logic"],
                [612000, 1470873, 0.42, "A Low-Power 65/14nm Stacked CMOS Image Sensor", "https://ieeexplore.ieee.org/document/9180435", "65/14nm process"],
                [75000, 20833, 3.6, "CMOS-3D Smart Imager Architectures for Feature Detection", "https://ieeexplore.ieee.org/document/6362241", "65nm CMOS"],
                [185000, 242457, 0.76, "4.8 48nJ/pixel Analog-Mixed-Signal Processor for Ultra-Low-Power Smart Imager", "https://ieeexplore.ieee.org/document/7870373", "45nm/65nm"],
                [31521, 1106, 28.5, "A CMOS Multi-Aperture Camera System with Lightfield-Aware Image Sensor Array and Efficient Global-Shutter Multi-Tap Pixels", "https://ieeexplore.ieee.org/document/9865913", "65 nm"],
                [8560, 9216, 0.929, "5.5 High-Efficiency Stereoscopic Vision System-on-Chip With Hierarchical Feature Detection and Encoding for Autonomous Robot Guidance", "https://ieeexplore.ieee.org/document/7870269", "90 nm"]
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
                [1, 4.096, 0.2441, "In-Situ Self-Powered Intelligent Vision System with Inference-Adaptive Energy Scheduling for BNN-Based Always-On Perception", "https://dl.acm.org/doi/abs/10.1145/3489517.3530554", "65nm CMOS"],
                [17.4, 245.76, 0.0708, "A Multimode CMOS Vision Sensor With On-Chip Motion Direction Detection and Simultaneous Energy Harvesting Capabilities", "https://ieeexplore.ieee.org/document/9789972", "180nm CMOS"],
                [23000, 5068.8, 4.5, "A 23-mW Face Recognition Processor with Mostly-Read 5T Memory in 40-nm CMOS", "https://ieeexplore.ieee.org/document/10143299", "40nm"]
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
        confine: false,
        position: 'left',
        textStyle: {
            fontSize: 12 // 调整字体大小
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
                    return (value / 1000000).toFixed(0) + ' W'; // Convert to W
                } else if (value >= 1000) {
                    return (value / 1000).toFixed(0) + ' mW'; // Convert to mW
                } else if (value <= 0.1) {
                    return (value ).toFixed(1) + ' uW'; // Show 0.1 uW
                }
                return value.toFixed(0) + ' uW'; // Show as uW
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
            data: [
                [881.7, 51200, 58, "NS-CIM: A Current-Mode Computation-in-Memory Architecture Enabling Near-Sensor Processing for Intelligent IoT Vision Nodes", "https://ieeexplore.ieee.org/document/9061142", "65 nm CMOS"],
                [1800, 981.72, 0.5454, "Processing Near Sensor Architecture in Mixed-Signal Domain With CMOS Image Sensor of Convolutional-Kernel-Readout Method", "https://ieeexplore.ieee.org/document/8835152", "180 nm"],
                [1800, 981.7, 0.5454, "A 1.8mW Perception Chip with Near-Sensor Processing Scheme for Low-Power AIoT Applications", "https://ieeexplore.ieee.org/document/8839347", "180 nm"],
                [94500, 22551500, 27, "ASP-SIFT: Using Analog Signal Processing Architecture to Accelerate Keypoint Detection of SIFT Algorithm", "https://ieeexplore.ieee.org/document/8836114", "180 nm"],
                [32000, 140000, 4.375, "4.9 A 1ms high-speed vision chip with 3D-stacked 140GOPS column-parallel PEs for spatio-temporal image processing", "https://ieeexplore.ieee.org/document/7870271", "90nm CIS/40nm Logic"],
                [10.17, 92.14, 9.06, "An Ultra-Low-Power Analog-Digital Hybrid CNN Face Recognition Processor Integrated with a CIS for Always-on Mobile Devices", "https://ieeexplore.ieee.org/document/8702698", "65nm"],
                [900, 478800, 532, "An Always-On 3.8 uJ/86% CIFAR-10 Mixed-Signal Binary CNN Processor With All Memory on Chip in 28-nm CMOS", "https://ieeexplore.ieee.org/document/8480105", "28 nm"],
                [170, 255, 1.5, "An Ultra-Low-Power Image Signal Processor for Hierarchical Image Recognition With Deep Neural Networks", "https://ieeexplore.ieee.org/document/9293122", "40nm"],
                [200, 2660, 13.3, "B-Face: 0.2 MW CNN-Based Face Recognition Processor with Face Alignment for Mobile User Identification", "https://ieeexplore.ieee.org/document/8502266", "65nm"]
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
                [2.17, 24.93, 11.49, "A 2.17μW@120fps Ultra-Low-Power Dual-Mode CMOS Image Sensor with Senputing Architecture", "https://ieeexplore.ieee.org/document/9712591", "65 nm CMOS"],
                [0.147, 2.543, 17.3, "Senputing: An Ultra-Low-Power Always-On Vision Perception Chip Featuring the Deep Fusion of Sensing and Computing", "https://ieeexplore.ieee.org/document/9464962", "180 nm CMOS"],
                [2.14, 14.74, 6.89, "A 4.57 μW@120fps Vision System of Sensing with Computing for BNN-Based Perception Applications", "https://ieeexplore.ieee.org/document/9634759", "65 nm CMOS"],
                [12.16, 16.05, 1.32, "MACSen: A Processing-In-Sensor Architecture Integrating MAC Operations Into Image Sensor for Ultra-Low-Power BNN-Based Intelligent Visual Perception", "https://ieeexplore.ieee.org/document/9164893", "180 nm"],
                [4.45, 51.13, 11.49, "Utilizing Direct Photocurrent Computation and 2D Kernel Scheduling to Improve In-Sensor-Processing Efficiency", "https://ieeexplore.ieee.org/document/9218622", "65 nm"],
                [60800, 4.55e9, 7.48e4, "All-analog photoelectronic chip for high-speed vision tasks", "https://www.nature.com/articles/s41586-023-06558-8#Abs1", "180 nm"],
                [1230000, 655000, 0.5325, "A 100,000 fps Vision Sensor with Embedded 535GOPS/W 256x256 SIMD Processor Array", "https://ieeexplore.ieee.org/document/6578654", "180 nm"],
                [26200, 20000, 0.7634, "Focal-Plane Algorithmically-Multiplying CMOS Computational Image Sensor", "https://ieeexplore.ieee.org/document/4982878", "350 nm"],
                [5.9, 48.56, 8.23, "A 5.9μW Ultra-Low-Power Dual-Resolution CIS Chip of Sensing-with-Computing for Always-on Intelligent Visual Devices", "https://ieeexplore.ieee.org/document/9401338", "180 nm"],
                [6500, 65000, 10, "Envision: A 0.26-to-10TOPS/W subword-parallel dynamic-voltage-accuracy-frequency-scalable Convolutional Neural Network processor in 28nm FDSOI", "https://ieeexplore.ieee.org/document/7870353", "28 nm CMOS"],
                [379100, 1210000, 3.19, "A 1/2.3inch 12.3Mpixel with On-Chip 4.97TOPS/W CNN Processor Back-Illuminated Stacked CMOS Image Sensor", "https://ieeexplore.ieee.org/document/9365965", "65nm top chip/22nm bottom chip"],
                [53.2, 193.9, 3.6, "A 0.2-to-3.6TOPS/W Programmable Convolutional Imager SoC with In-Sensor Current-Domain Ternary-Weighted MAC Operations for Feature Extraction and Region-of-Interest Detection", "https://ieeexplore.ieee.org/document/9365839", "65nm"],
                [1230000, 658000, 0.535, "A Camera That CNNs: Towards Embedded Neural Networks on Pixel Processor Arrays", "https://ieeexplore.ieee.org/document/9010705", "N/A"]
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
            data:[
                [225000, 1600000, 7.1, "H3DAtten: Heterogeneous 3-D Integrated Hybrid Analog and Digital Compute-in-Memory Accelerator for Vision Transformer Self-Attention", "https://ieeexplore.ieee.org/document/10213232", "40 nm"]
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
                    rotate:15,
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
