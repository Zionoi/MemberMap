// MapPage.jsx
import { useEffect, useState } from "react";
import MemberMap from "../components/Map/MemberMap";
import { getCoordsFromAddress, getRegionFromCoords } from "../api/kakaoApi";
import members from "../data/members";
import { normalizeRegionName } from '../utils/regionUtils';  // ✅ 유틸 함수 사용

const MapPage = () => {
  const [regionCounts, setRegionCounts] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const regionCountMap = {};

      for (const member of members) {
        const coords = await getCoordsFromAddress(member.address);
        const region = coords && await getRegionFromCoords(coords.lat, coords.lng);
        if (coords && region) {
          const cleanedRegion = normalizeRegionName(region);  // ✅ 핵심
          console.log("📌 cleanedRegion :", cleanedRegion);

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
