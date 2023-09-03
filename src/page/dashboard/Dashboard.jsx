import React, { useEffect, useState } from "react";
import { Chart as chartjs } from "chart.js/auto";
import Chart from "./Chart";
import "./style.css";

const color = [
    [
        // do am
        "linear-gradient(90deg, #ffffff , blue",
    ],
    [
        //nhiet do
        "linear-gradient(90deg, #ffffff 0%, red 50%)",
    ],
    [
        //anh sang
        "linear-gradient(to right, #ffffff, #fffc00)",
        "linear-gradient(to right, #ffffff, #fffc20)",
        "linear-gradient(to right, #ffffff, #fffc10)",
    ],
];

const Dashboard = () => {
    const data = {
        data: ["Độ ẩm", "Nhiệt độ", "Ánh sáng"],
        unit: ["%", "℃", "lux"],
    };

    //data
    const [newData, setNewData] = useState(data.data.map((item) => 0));

    //----------------------------------------------------------------
    const [lightState, setLightState] = useState(false); //chat
    const [fanState, setFanState] = useState(false); //chat

    const handleLightToggle = () => {
        setLightState(!lightState);
    };

    const handleFanToggle = () => {
        setFanState(!fanState);
    };
    //----------------------------------------------------------------

    useEffect(() => {
        const intervalId = setInterval(() => {
            setNewData((prop) => {
                const result = [];
                prop.forEach((element) => {
                    result.push(Math.floor(Math.random() * 40));
                });
                return [...result];
                // return result;
            });
        }, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

    return (
        <div id="containerDashboard">
            <div className="containerBlock">
                {data.data.map((item, index) => (
                    <div
                        className="block"
                        style={{
                            backgroundImage:
                                color[index][
                                    Math.floor(
                                        Math.random() * color[index].length
                                    )
                                ],
                        }}
                        key={index}
                    >
                        {item + ": " + newData[index] + " " + data.unit[index]}
                    </div>
                ))}
            </div>
            <div className="dashboard">
                <Chart prop={data} newData={newData} />
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
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
