// src/components/Sidebar.jsx
import { Link } from "react-router-dom";
import "./Sidebar.css"; // 스타일은 여기 따로 관리해도 OK

const Sidebar = () => {
  return (
    <div className="sidebar">
      <h2>📌 MemberMap</h2>
      <ul>
        <li><Link to="/dashboard">📊 대시보드</Link></li>
        <li><Link to="/map">🗺️ 지도 보기</Link></li>
        <li><Link to="/members">👥 회원 목록</Link></li>
        <li><Link to="/add-member">➕ 회원 등록</Link></li>
        <li><Link to="/admin">🛠️ 관리자 설정</Link></li>
      </ul>
    </div>
  );
};

export default Sidebar;
