import { useNavigate } from "react-router-dom";
import { useState } from "react";
import "./LoginPage.css";

const LoginPage = () => {
  const [userId, setUserId] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    // TODO: 나중에 백엔드 인증 API 연동 예정
    // 예시:
    // const response = await axios.post('/api/login', { userId, password });
    // if (response.data.success) { ... }

    // 지금은 무조건 로그인 성공 처리
    localStorage.setItem("user", JSON.stringify({ userId })); // 로그인 정보 저장
    navigate("/dashboard");
  };

  return (
    <div className="login-container">
      <form className="login-form" onSubmit={handleLogin}>
        <h2>MemberMap 로그인</h2>
        <input
          type="text"
          placeholder="아이디"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
        />
        <br />
        <input
          type="password"
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <br />
        <button type="submit">로그인</button>
      </form>
    </div>
  );
};

export default LoginPage;
