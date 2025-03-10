import StatCard from "./StatCard";
import LineChart from "./LineChart";
import "./dashboard.css"; // 스타일은 따로 분리 가능

const DashboardLayout = () => {
  return (
    <div className="dashboard-container">
      <div className="stat-grid">
        <StatCard title="총 회원 수" value="340명" />
        <StatCard title="회원 증감 (전월 대비)" value="+24명" />
        <StatCard title="이번달 총 매출" value="₩3,500,000" />
        <StatCard title="일평균 유입" value="11.3명" />
        <StatCard title="신규 가입자 수" value="45명" />
      </div>

      <div className="chart-grid">
        <LineChart title="한달간 인원 유입 수" />
        <LineChart title="한달간 매출 변화" />
      </div>
    </div>
  );
};

export default DashboardLayout;