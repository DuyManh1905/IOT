import React from "react";
import { Line } from "react-chartjs-2";
import { ContextStore } from "../../context/ContextStore";

const colorCodes = [
    "#0000FF", // Xanh dương
    "#FF0000", // Đỏ
    "#FFFF00", // Vàng
    "#008000", // Xanh lá cây
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

const Chart = ({ prop, datas, labels }) => {
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
        maintainAspectRatio: false,
        with: "200px",
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

    return (
        <div className="chart">
            <Line data={data} options={options} style={{ height: "100%" }} />
        </div>
    );
};

export default Chart;
