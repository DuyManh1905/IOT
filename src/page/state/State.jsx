import React, { useState } from "react";
import "./style.css";
const Data = () => {
    // Sử dụng mảng dữ liệu sẵn có
    const date = new Date(Date.now());
    const data = [
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },
        {
            id: 1,
            device: "Đèn",
            state: "OFF",
            time: `${date.getHours()}:${date.getMinutes()}:${date.getMilliseconds()}`,
        },

        // Thêm dữ liệu khác vào đây
    ];

    const itemsPerPage = 10; // Số lượng dòng trên mỗi trang
    const [currentPage, setCurrentPage] = useState(1);

    // Tính toán dữ liệu trang hiện tại dựa trên currentPage và itemsPerPage
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    // Hàm chuyển trang
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <div>
            <h1>Dữ liệu bật tắt đèn</h1>
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

            {/* Phân trang */}
            <div className="pagination">
                {Array.from({
                    length: Math.ceil(data.length / itemsPerPage),
                }).map((_, index) => (
                    <button
                        key={index}
                        onClick={() => paginate(index + 1)}
                        className={currentPage === index + 1 ? "active" : ""}
                    >
                        {index + 1}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Data;
