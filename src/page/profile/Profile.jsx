import React from "react";
import "./style.css";
const Profile = () => {
    return (
        <div className="profile">
            <div className="avatar">
                <img src="https://cdn4.iconfinder.com/data/icons/avatars-xmas-giveaway/128/batman_hero_avatar_comics-512.png" />
            </div>
            <div className="content">
                <div className="backgroud">
                    <img
                        src="https://images.unsplash.com/photo-1589497836818-9ad2fa1df1a0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxjb2xsZWN0aW9uLXBhZ2V8MXwxMzYwOTV8fGVufDB8fHx8fA%3D%3D&w=1000&q=80"
                        alt=""
                    />
                </div>
                <div className="text">
                    <div>
                        <table>
                            <tbody>
                                <tr>
                                    <td>Name</td>
                                    <td>Lê Duy Mạnh</td>
                                </tr>
                                <tr>
                                    <td>Id</td>
                                    <td>B20DCCN423</td>
                                </tr>
                                <tr>
                                    <td>Lớp</td>
                                    <td>D20CQCN03-B</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
