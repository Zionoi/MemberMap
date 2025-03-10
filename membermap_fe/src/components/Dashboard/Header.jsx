import { useNavigate } from "react-router-dom";

const Header = () => {
  const navigate = useNavigate();

  const handleLogoClick = () => {
    navigate("/"); // 로그인 페이지로 이동
  };

  return (
    <header>
      <h1 onClick={handleLogoClick} style={{ cursor: "pointer" }}>
        MemberMap
      </h1>
    </header>
  );
};

export default Header;
