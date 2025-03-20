import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import { normalizeRegionName } from "../../utils/regionUtils";

// 색상 계산 함수
const getColor = (count, max) => {
  const ratio = count / max;
  const blue = Math.floor(255 - ratio * 155);
  return `rgb(${blue}, ${blue}, 255)`; // 연파랑~진파랑
};

const MemberMap = ({ regionCounts }) => {
  const [geoData, setGeoData] = useState(null);

  useEffect(() => {
    fetch("/geo/regions.geojson")
      .then((res) => res.json())
      .then((data) => setGeoData(data))
      .catch((err) => console.error("GeoJSON 로딩 오류:", err));
  }, []);

  if (!geoData) return <div>지도를 불러오는 중...</div>;

  // regionCounts 정제
  const normalizedRegionCounts = {};
  Object.entries(regionCounts).forEach(([key, value]) => {
    const normKey = normalizeRegionName(key);
    normalizedRegionCounts[normKey] = value;
  });

  const counts = Object.values(normalizedRegionCounts).map((r) => r.count);
  const maxCount = counts.length > 0 ? Math.max(...counts) : 1;

  const style = (feature) => {
    const rawName = feature.properties.SIG_KOR_NM;
    const regionKey = normalizeRegionName(rawName);
    const regionData = normalizedRegionCounts[regionKey];
    const count = regionData?.count || 0;

    return {
      fillColor: getColor(count, maxCount),
      weight: 1,
      opacity: 1,
      color: "white",
      fillOpacity: 0.7,
    };
  };

  return (
    <MapContainer center={[36.5, 127.5]} zoom={7} style={{ height: "80vh" }}>
      <TileLayer
        attribution='&copy; OpenStreetMap contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <GeoJSON
        data={{
            ...geoData,
            features: geoData.features.filter((feature) => {
            const rawName = feature.properties.SIG_KOR_NM;
            const regionKey = normalizeRegionName(rawName);

            if (normalizedRegionCounts.hasOwnProperty(regionKey)) {
                const count = normalizedRegionCounts[regionKey].count;
                return count > 0; // ✅ count가 0보다 크면 포함
            }

            return false;
            }),
        }}
        style={style}
        onEachFeature={(feature, layer) => {
            const regionKey = normalizeRegionName(feature.properties.SIG_KOR_NM);
            const count = normalizedRegionCounts[regionKey]?.count || 0;

            layer.bindTooltip(`${regionKey}: ${count}명`, {
            direction: "top",
            permanent: true,
            offset: [0, -10],
            });
        }}
        />
    </MapContainer>
  );
};

export default MemberMap;
