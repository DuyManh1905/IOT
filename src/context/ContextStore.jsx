import React, { createContext, useEffect, useState } from "react";
import axios from "axios";
export const ContextStore = createContext();

const StoreProvider = ({ children }) => {
    const [lightState, setLightState] = useState(true);
    const [lightState2, setLightState2] = useState(true); //them
    const [fanState, setFanState] = useState(true);

    const data = {
        // data: ["Độ ẩm", "Nhiệt độ", "Ánh sáng"], //them
        // unit: ["%", "℃", "lux"], //them
        data: ["Nhiệt độ", "Độ ẩm", "Khí gas", "Ánh sáng"],
        unit: ["℃", "%", "ppm", "lux"],
    };
    const [datas, setDatas] = useState(
        data.data.map((item) => [0, 0, 0, 0, 0, 0, 0])
    );

    const [labels, setLabels] = useState([]);
    const [newData, setNewData] = useState(data.data.map((item) => 0));

    useEffect(() => {
        const intervalId = setInterval(() => {
            axios.get("http://localhost:8080/data").then((response) => {
                const datatmp = [[], [], [], []]; //them
                const labeltmp = [];
                const datanew = [
                    response.data[response.data.length - 1].temperature,
                    response.data[response.data.length - 1].humidity,
                    response.data[response.data.length - 1].gas,
                    response.data[response.data.length - 1].light, //them
                ];

                response.data.forEach((item) => {
                    datatmp[0].push(item.temperature);
                    datatmp[1].push(item.humidity);
                    datatmp[2].push(item.gas);
                    datatmp[3].push(item.light); //them
                    labeltmp.push(item.time.slice(11));
                });
                setDatas(datatmp);
                setLabels(labeltmp);

                setNewData(datanew);
            });
        }, 2000);
        return () => {
            clearInterval(intervalId);
        };
    }, []);

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
        <ContextStore.Provider
            value={{
                data,
                newData,
                setNewData,
                datas,
                setDatas,
                lightState,
                setLightState,
                fanState,
                setFanState,
                labels,
                lightState2, //them
                setLightState2, //them
            }}
        >
            {children}
        </ContextStore.Provider>
    );
};

export default StoreProvider;
