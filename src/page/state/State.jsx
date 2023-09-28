import React, { useState, useEffect } from "react";
import axios from "axios";

import "./style.css";

const State = () => {
    const [actions, setActions] = useState([]);

    const itemsPerPage = 10;
    const [currentPage, setCurrentPage] = useState(1);

    useEffect(() => {
        axios.get("http://localhost:8080/action").then((response) => {
            setActions(response.data);
        });
        const intervalTime = setInterval(() => {
            axios.get("http://localhost:8080/action").then((response) => {
                setActions(response.data);
            });
        }, 5000);

        return () => {
            clearInterval(intervalTime);
        };
    }, []);

    const sortActions = (order) => {
        // Sắp xếp theo ID dựa vào giá trị của biến 'order'
        const sortedActions = [...actions].sort((a, b) => {
            if (order === "asc") {
                return a.id - b.id;
            } else {
                return b.id - a.id;
            }
        });

        setActions(sortedActions);
    };

    // Tính toán dữ liệu trang hiện tại dựa trên currentPage và itemsPerPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = actions.slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const maxPage = Math.ceil(actions.length / itemsPerPage);

    return (
        <div>
            <h1>Dữ liệu bật tắt đèn</h1>
            <div className="sort-buttons">
                <button onClick={() => sortActions("asc")}>
                    Sắp xếp tăng dần
                </button>
                <button onClick={() => sortActions("desc")}>
                    Sắp xếp giảm dần
                </button>
            </div>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Thiết bị</th>
                        <th>State</th>
                        <th>Thời gian</th>
                    </tr>
                </thead>
                <tbody>
                    {currentItems.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.device}</td>
                            <td>{item.state}</td>
                            <td>{item.time}</td>
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

export default State;
