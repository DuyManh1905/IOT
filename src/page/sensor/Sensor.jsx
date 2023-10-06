import React, { useEffect, useState } from "react";
import "./style.css";
import axios from "axios";

const Sensor = () => {
    const [dataHistory, setDataHistory] = useState([]);
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [filteredData, setFilteredData] = useState([]);
    const [humidityFilter, setHumidityFilter] = useState("");
    const [temperatureFilter, setTemperatureFilter] = useState("");
    const [lightFilter, setLightFilter] = useState("");
    const [maxPage, setMaxPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;
    const [sortType, setSortType] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    useEffect(() => {
        axios.get("http://localhost:8080/data/all").then((response) => {
            setDataHistory(response.data);
        });
        const intervalTime = setInterval(() => {
            axios.get("http://localhost:8080/data/all").then((response) => {
                setDataHistory(response.data);
            });
        }, 5000);

        return () => {
            clearInterval(intervalTime);
        };
    }, []);

    useEffect(() => {
        const filtered = dataHistory.filter((item) => {
            const itemDate = new Date(item.time).getTime();
            const start = new Date(startDate).getTime();
            const end = new Date(endDate).getTime();
            const meetsHumidityFilter =
                !humidityFilter || item.humidity == parseFloat(humidityFilter);
            const meetsTemperatureFilter =
                !temperatureFilter ||
                item.temperature == parseFloat(temperatureFilter);
            const meetsLightFilter =
                !lightFilter || item.light == parseFloat(lightFilter);

            if (!startDate || !endDate)
                return (
                    meetsHumidityFilter &&
                    meetsTemperatureFilter &&
                    meetsLightFilter
                );

            return (
                itemDate >= start &&
                itemDate <= end &&
                meetsHumidityFilter &&
                meetsTemperatureFilter &&
                meetsLightFilter
            );
        });

        const sortedData = [...filtered];
        sortedData.sort((a, b) => {
            const valueA = parseFloat(a[sortType]);
            const valueB = parseFloat(b[sortType]);

            if (sortOrder === "asc") {
                return valueA - valueB;
            } else {
                return valueB - valueA;
            }
        });

        setFilteredData(sortedData);
    }, [
        startDate,
        endDate,
        dataHistory,
        humidityFilter,
        temperatureFilter,
        lightFilter,
        sortType,
        sortOrder,
    ]);

    useEffect(() => {
        setMaxPage(Math.ceil(filteredData.length / itemsPerPage));
    }, [filteredData]);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const handleSortTypeChange = (event) => {
        setSortType(event.target.value);
    };

    const handleSortOrderChange = (event) => {
        setSortOrder(event.target.value);
    };

    return (
        <div>
            <h1 className="table-heading">Lịch sử Data Sensor</h1>
            <div className="date-block">
                <div className="date-start">
                    <label>Ngày bắt đầu: </label>
                    <input
                        type="datetime-local"
                        value={startDate}
                        onChange={(e) => setStartDate(e.target.value)}
                    />
                </div>
                <div className="date-end">
                    <label>Ngày kết thúc: </label>
                    <input
                        type="datetime-local"
                        value={endDate}
                        onChange={(e) => setEndDate(e.target.value)}
                    />
                </div>
                <div className="btn-clear">
                    <button onClick={() => setStartDate("")}>
                        Clear start
                    </button>
                    <button onClick={() => setEndDate("")}>Clear end</button>
                </div>
            </div>
            <div className="sensor-block">
                <div>
                    <label>Độ ẩm: </label>
                    <input
                        type="number"
                        value={humidityFilter}
                        onChange={(e) => setHumidityFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label>Nhiệt độ: </label>
                    <input
                        type="number"
                        value={temperatureFilter}
                        onChange={(e) => setTemperatureFilter(e.target.value)}
                    />
                </div>
                <div>
                    <label>Ánh sáng: </label>
                    <input
                        type="number"
                        value={lightFilter}
                        onChange={(e) => setLightFilter(e.target.value)}
                    />
                </div>
            </div>
            <div className="sort-block">
                <label>Sắp xếp theo: </label>
                <select value={sortType} onChange={handleSortTypeChange}>
                    <option value="id">ID</option>
                    <option value="humidity">Độ ẩm</option>
                    <option value="temperature">Nhiệt độ</option>
                    <option value="light">Ánh sáng</option>
                </select>
                <select value={sortOrder} onChange={handleSortOrderChange}>
                    <option value="asc">Tăng dần</option>
                    <option value="desc">Giảm dần</option>
                </select>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Thời gian</th>
                        <th>Độ ẩm(%)</th>
                        <th>Nhiệt độ(℃)</th>
                        <th>Ánh sáng(lux)</th>
                        <th>Khí Gas(ppm)</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.time}</td>
                            <td>{item["humidity"]}</td>
                            <td>{item["temperature"]}</td>
                            <td>{item["light"]}</td>
                            <td>{item["gas"]}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="pagination">
                {Array.from({ length: maxPage }).map((_, index) => {
                    const isStart = index === 0;
                    const isStartNext = index === 1;
                    const isEnd = index === maxPage - 1;
                    const isCurrent = currentPage === index + 1;

                    if (
                        maxPage <= 5 ||
                        isStart ||
                        isStartNext ||
                        isEnd ||
                        isCurrent ||
                        Math.abs(currentPage - (index + 1)) <= 1
                    ) {
                        return (
                            <button
                                key={index}
                                onClick={() => paginate(index + 1)}
                                className={isCurrent ? "active" : ""}
                            >
                                {index + 1}
                            </button>
                        );
                    } else if (Math.abs(currentPage - (index + 1)) === 2) {
                        return (
                            <button key={index} disabled>
                                ...
                            </button>
                        );
                    }
                })}
            </div>
        </div>
    );
};

export default Sensor;
