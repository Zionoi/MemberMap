// src/components/Map/MemberMap.jsx
import { MapContainer, TileLayer, GeoJSON, Tooltip } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";

// 색상 계산 함수 (파랑 계열, 상대값)
const getColor = (count, max) => {
  const ratio = count / max;
  const blue = Math.floor(255 - ratio * 155);
  return `rgb(${blue}, ${blue}, 255)`; // 연파랑 ~ 진파랑
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
  
    const maxCount = Math.max(...Object.values(regionCounts).map((r) => r.count));
  
    const style = (feature) => {
        const regionName = feature.properties.SIG_KOR_NM;
        const regionData = regionCounts[regionName];
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
                const name = feature.properties.SIG_KOR_NM;
                const matched = regionCounts[name]?.count > 0;
                if (!matched) {
                  console.warn("❌ 매칭 안되는 지역:", name);
                }
                return matched;
              }),
          }}
          style={style}
          onEachFeature={(feature, layer) => {
            const name = feature.properties.SIG_KOR_NM;
            const count = regionCounts[name]?.count || 0;
            layer.bindTooltip(`${name}: ${count}명`, {
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
