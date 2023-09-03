import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";

const colorCodes = [
    "#FF0000", // Đỏ
    "#0000FF", // Xanh dương
    "#008000", // Xanh lá cây
    "#FFFF00", // Vàng
    "#FFA500", // Cam
    "#FFC0CB", // Hồng
    "#800080", // Tím
    "#0047AB", // Xanh dương cobalt
    "#FFFFFF", // Màu trắng
    "#000000", // Đen
    "#808080", // Xám
    "#D3D3D3", // Xám nhạt
    "#A52A2A", // Nâu
    "#006400", // Xanh lá cây đậm
    "#FF4500", // Màu hạt dẻ
];

const colorHex = ["#ff000024", "#0000ff26", "#00800024"];

const Chart = ({ prop, newData }) => {
    console.log(newData);
    const labels = [
        "0",
        "2",
        "4",
        "6",
        "8",
        "10",
        "12",
        "14",
        "16",
        "18",
        "20",
        "22",
        "24",
        "26",
        "28",
        "30",
        "32",
        "34",
    ];

    const [datas, setDatas] = useState(
        prop.data.map((item) => [
            0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        ])
    );

    // const [pause, setPause] = useState(false);

    const data = {
        labels: labels,
        datasets: prop.data.map((item, index) => {
            return {
                label: item,
                data: datas[index],
                fill: true, // fill phan o duoi
                backgroundColor: colorHex[index],
                borderColor: colorCodes[index],
                tension: 0.4, // do cong cua line
            };
        }),
    };

    //options style of chart
    const options = {
        animation: {
            duration: 0,
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: "Thời gian(s)",
                    font: {
                        size: 20, // Kích thước font mong muốn
                    },
                },
            },
            y: {
                title: {
                    display: true,
                    text: "Giá trị",
                    font: {
                        size: 20, // Kích thước font mong muốn
                    },
                },
            },
        },
    };

    useEffect(() => {
        setDatas((prop) => {
            const tmp = [...prop];
            const result = [];
            tmp.forEach((element, index) => {
                let arr = [...element];
                arr.pop();
                arr = [newData[index], ...arr];
                result.push(arr);
            });
            return [...result];
        });
    }, [newData]);

    return (
        <div className="chart">
            <Line data={data} options={options} style={{ height: "100%" }} />
        </div>
    );
};

export default Chart;
