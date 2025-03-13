// MapPage.jsx
import { useEffect, useState } from "react";
import MemberMap from "../components/Map/MemberMap";
import { getCoordsFromAddress, getRegionFromCoords } from "../api/kakaoApi";
import members from "../data/members";

const MapPage = () => {
  const [regionCounts, setRegionCounts] = useState({});

  const normalizeRegionName = (fullName) => {
    const match = fullName.match(/([가-힣]+[구군시])$/);
    return match ? match[1] : fullName;
  };

  useEffect(() => {
    const fetchData = async () => {
      const regionCountMap = {};
    
      for (const member of members) {
        const coords = await getCoordsFromAddress(member.address);
        const region = coords && await getRegionFromCoords(coords.lat, coords.lng); // 예: "고양시 덕양구"
        
        if (coords && region) {
          const cleanedRegion = region;
    
          if (!regionCountMap[cleanedRegion]) {
            regionCountMap[cleanedRegion] = { count: 1, coords };
          } else {
            regionCountMap[cleanedRegion].count += 1;
          }
        }
      }
    
      setRegionCounts(regionCountMap);
      console.log("✅ 최종 regionCounts:", regionCountMap);
      Object.entries(regionCountMap).forEach(([region, data]) => {
        console.log(`📦 ${region}: ${data.count}명`);
      });
    };
    

    fetchData();
  }, []);

  return (
    <div>
      <h2>🗺️ 지역별 회원 밀도</h2>
      <MemberMap regionCounts={regionCounts} />
    </div>
  );
};

export default MapPage;
