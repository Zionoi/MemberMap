import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { getCoordsFromAddress } from "../api/kakaoApi";
import members from "../data/members";
import L from "leaflet";

// 마커 기본 아이콘 설정
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const MapPage = () => {
  const [memberMarkers, setMemberMarkers] = useState([]);

  useEffect(() => {
    const fetchAllCoords = async () => {
      const results = await Promise.all(
        members.map(async (member) => {
          const coords = await getCoordsFromAddress(member.address);
          return coords
            ? { id: member.id, name: member.name, ...coords }
            : null;
        })
      );
      setMemberMarkers(results.filter((m) => m !== null));
    };

    fetchAllCoords();
  }, []);

  return (
    <div style={{ height: "80vh" }}>
      <MapContainer center={[36.5, 127.5]} zoom={7} style={{ height: "100%" }}>
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {memberMarkers.map((member) => (
          <Marker key={member.id} position={[member.lat, member.lng]}>
            <Popup>{member.name} 님의 주소 기반 위치입니다.</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default MapPage;
