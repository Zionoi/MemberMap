// MapPage.jsx
import { useEffect, useState } from "react";
import MemberMap from "../components/Map/MemberMap";
import { getCoordsFromAddress, getRegionFromCoords } from "../api/kakaoApi";
import members from "../data/members";

const MapPage = () => {
  const [regionCounts, setRegionCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const regionCountMap = {};

      for (const member of members) {
        const coords = await getCoordsFromAddress(member.address);
        const region = coords && await getRegionFromCoords(coords.lat, coords.lng); // 예: "고양시 덕양구"
        if (coords && region) {
          // 🔥 GeoJSON에서 매칭되는 형태로 유지해야 함 (ex: "고양시 덕양구", "포항시 북구")
          const cleanedRegion = region.trim(); 

          if (!regionCountMap[cleanedRegion]) {
            regionCountMap[cleanedRegion] = { count: 1, coords };
          } else {
            regionCountMap[cleanedRegion].count += 1;
          }
        }
      }

      setRegionCounts(regionCountMap);
      console.log("✅ 최종 regionCounts:", regionCountMap);
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
