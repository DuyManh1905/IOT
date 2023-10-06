import React, { useState, useEffect } from "react";
import axios from "axios";

const State = () => {
    const [actions, setActions] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [searchDate, setSearchDate] = useState(""); // Thêm state để lưu trữ ngày giờ phút tìm kiếm

    const itemsPerPage = 10;

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

    const filterData = () => {
        let filteredActions = [...actions];

        // Kiểm tra nếu người dùng đã nhập thời gian tìm kiếm
        if (searchDate) {
            filteredActions = filteredActions.filter((item) =>
                item.time.includes(searchDate)
            );
        }

        return filteredActions;
    };

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = filterData().slice(indexOfFirstItem, indexOfLastItem);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const maxPage = Math.ceil(filterData().length / itemsPerPage);

    const handleSearch = () => {
        // Gọi khi người dùng ấn nút tìm kiếm
        // Ở đây, bạn cần xử lý ngày, giờ và phút nhập vào để tạo chuỗi thời gian tìm kiếm
        const formattedSearchDate = `${searchDate} 00:00:00`; // Điều chỉnh định dạng thời gian cần tìm kiếm
        setSearchDate(formattedSearchDate);
    };

    return (
        <div>
            <h1 className="table-heading">Dữ liệu bật tắt đèn</h1>

            {/* Thêm ô nhập thời gian tìm kiếm */}
            <div>
                <input
                    type="text"
                    placeholder="Nhập ngày giờ phút (YYYY-MM-DD)"
                    value={searchDate}
                    onChange={(e) => setSearchDate(e.target.value)}
                />
                <button onClick={handleSearch}>Tìm kiếm</button>
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
