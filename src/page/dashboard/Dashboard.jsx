import React, { useContext } from "react";
import { Chart as chartjs } from "chart.js/auto";
import Chart from "./Chart";
import "./style.css";
import { ContextStore } from "../../context/ContextStore";
import axios from "axios";

const color = [
    [
        // do am
        "linear-gradient(90deg, #ffffff 0%, blue 80%)", //<50
        "linear-gradient(90deg, #ffffff 0%, blue 50%)", //<50
    ],
    [
        //nhiet do
        "linear-gradient(90deg, #ffffff 0%, red 80%)",
        "linear-gradient(90deg, #ffffff 0%, red 50%)",
    ],
    [
        //anh sang
        "linear-gradient(to right, #ffffff 0%, #ccc 80%)",
        "linear-gradient(to right, #ffffff 0%, #fffc00 50%)",
    ],
    [
        "linear-gradient(to right, #ffffff 0%, #bbbbbb 80%)",
        "linear-gradient(to right, #ffffff 0%, #fffc00 50%)",
    ], //them
];

function convetTime() {
    // Lấy thời gian hiện tại
    var currentDate = new Date();
    // Lấy các thành phần của thời gian (năm, tháng, ngày, giờ, phút, giây)
    var year = currentDate.getFullYear();
    var month = String(currentDate.getMonth() + 1).padStart(2, "0"); // Cộng 1 vì tháng trong JavaScript bắt đầu từ 0
    var day = String(currentDate.getDate()).padStart(2, "0");
    var hours = String(currentDate.getHours()).padStart(2, "0");
    var minutes = String(currentDate.getMinutes()).padStart(2, "0");
    var seconds = String(currentDate.getSeconds()).padStart(2, "0");
    // Tạo chuỗi thời gian hiện tại với định dạng yyyy-MM-dd HH:mm:ss
    var formattedCurrentTime = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
    return formattedCurrentTime;
}

function getBackgroundColor(index, value) {
    if (index >= 0 && index < color.length) {
        if (value >= 50) {
            return color[index][1];
        } else {
            return color[index][0];
        }
    }
    return "linear-gradient(90deg, #ffffff 0%, blue 80%)";
}

const Dashboard = () => {
    const {
        newData,
        data, //nhan
        lightState,
        setLightState,
        fanState,
        setFanState,
        datas, //list data
        labels, //list thoi gian
        lightState2, //them
        setLightState2, //them
    } = useContext(ContextStore);

    const data1 = { data: data.data.slice(0, 3), unit: data.unit.slice(0, 3) };
    const data2 = { data: data.data.slice(3), unit: data.unit.slice(3) };

    console.log(data1);
    console.log(data2);

    const datas1 = datas.slice(0, 3);
    const datas2 = datas.slice(3);

    const handleLightToggle = () => {
        const data = {};
        const action = {
            device: "Đèn",
            time: convetTime(),
        };

        if (lightState) {
            data["led1"] = "off";
            action["state"] = "off";
        } else {
            data["led1"] = "on";
            action["state"] = "on";
        }
        axios.post("http://localhost:8080/mqtt/api/led", data); //GUI API LEN MQTT
        axios.post("http://localhost:8080/action", action); //LUU VAO DB

        setLightState(!lightState);
    };

    const handleFanToggle = () => {
        const data = {};
        const action = {
            device: "Quạt",
            time: convetTime(),
        };

        if (fanState) {
            data["led2"] = "off";
            action["state"] = "off";
        } else {
            data["led2"] = "on";
            action["state"] = "on";
        }
        axios.post("http://localhost:8080/mqtt/api/led", data);
        axios.post("http://localhost:8080/action", action);

        setFanState(!fanState);
    };
    // them
    const handleLightToggle2 = () => {
        const data = {};
        const action = {
            device: "Đèn 2",
            time: convetTime(),
        };

        if (lightState2) {
            data["led3"] = "off";
            action["state"] = "off";
        } else {
            data["led3"] = "on";
            action["state"] = "on";
        }
        axios.post("http://localhost:8080/mqtt/api/led", data);
        axios.post("http://localhost:8080/action", action);

        setLightState2(!lightState2);
    };
    //----------------------------------------------------------------

    return (
        <div id="containerDashboard">
            <div className="containerBlock">
                {data.data.map((item, index) => (
                    <div
                        className="block"
                        style={{
                            backgroundImage: getBackgroundColor(
                                index,
                                newData[index]
                            ),
                        }}
                        key={index}
                    >
                        {item + ": " + newData[index] + " " + data.unit[index]}
                    </div>
                ))}
            </div>
            <div className="dashboard">
                <div className="chartContainer">
                    <div className="chartItem1">
                        <Chart
                            className="chart"
                            prop={data1}
                            datas={datas1}
                            labels={labels}
                        />
                    </div>
                    {/* <div className="chartItem2">
                        <Chart
                            className="chart"
                            prop={data2}
                            datas={datas2}
                            labels={labels}
                        />
                    </div> */}
                </div>

                <div className="buttonContainer">
                    <div className="btnContainer1">
                        <div className="image-container">
                            <img
                                src={
                                    lightState ? "/den-on.png" : "/den-off.png"
                                }
                                alt={"Light " + (lightState ? "On" : "Off")}
                            />
                        </div>
                        <div
                            className="button btn-1"
                            onClick={handleLightToggle}
                            style={{
                                backgroundColor: lightState ? "green" : "red",
                            }}
                        >
                            {"Đèn: " + (lightState ? "On" : "Off")}
                        </div>
                    </div>
                    <div className="btnContainer2">
                        <div className="image-container">
                            <img
                                src={fanState ? "/fan-on.gif" : "/fan-off.png"}
                                alt={"Fan " + (fanState ? "On" : "Off")}
                            />
                        </div>
                        <div
                            className="button btn-2"
                            onClick={handleFanToggle}
                            style={{
                                backgroundColor: fanState ? "green" : "red",
                            }}
                        >
                            {"Quạt: " + (fanState ? "On" : "Off")}
                        </div>
                    </div>
                    {/* them */}
                    {/* <div className="btnContainer1">
                        <div className="image-container">
                            <img
                                src={
                                    lightState2 ? "/den-on.png" : "/den-off.png"
                                }
                                alt={"Light " + (lightState ? "On" : "Off")}
                            />
                        </div>
                        <div
                            className="button btn-1"
                            onClick={handleLightToggle2}
                            style={{
                                backgroundColor: lightState2 ? "green" : "red",
                            }}
                        >
                            {"Đèn2: " + (lightState2 ? "On" : "Off")}
                        </div>
                    </div> */}
                </div>
            </div>
            <div className="footer">
                <p className="copyright">
                    By DuyManh Copyright 2023.com, All rights reserved.
                </p>
                <div className="social">
                    <a href="https://www.facebook.com/manhle2369/">
                        <img src="facebook.svg" alt="facebook" />
                    </a>
                    <a href="https://www.facebook.com/manhle2369/">
                        <img src="twitter.svg" alt="" />
                    </a>
                    <a href="https://www.facebook.com/manhle2369/">
                        <img src="linkedin.svg" alt="" />
                    </a>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
