import axios from "axios";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY;


/**
 * 주소를 좌표로 변환
 * @param {string} address 변환할 주소 문자열
 * @returns {Promise<{lat: number, lng: number}>}
 */
export const getCoordsFromAddress = async (address) => {
    try {
      const response = await axios.get(
        "https://dapi.kakao.com/v2/local/search/address.json",
        {
          headers: {
            Authorization: `KakaoAK ${KAKAO_API_KEY}`,
          },
          params: { query: address },
        }
      );
      const documents = response.data.documents;
      if (documents.length > 0) {
        const { x, y } = documents[0]; // x: 경도(lng), y: 위도(lat)
        return { lat: parseFloat(y), lng: parseFloat(x) };
      } else {
        throw new Error("주소 결과 없음");
      }
    } catch (error) {
      console.error("주소 변환 에러:", error);
      return null;
    }
  };
  
 
  //주소 → 좌표 → 시군구명 추출
  export const getRegionFromCoords = async (lat, lng) => {
    try {
      const res = await axios.get(
        `https://dapi.kakao.com/v2/local/geo/coord2regioncode.json?x=${lng}&y=${lat}`,
        {
          headers: {
            Authorization: `KakaoAK ${process.env.REACT_APP_KAKAO_REST_API_KEY}`,
          },
        }
      );
  
      const data = res.data.documents[0];
      // full name 조합: region_1depth_name + region_2depth_name
      return `${data.region_1depth_name} ${data.region_2depth_name}`; // 예: 서울특별시 중구
    } catch (e) {
      console.error("주소로부터 지역명 가져오기 실패", e);
      return null;
    }
  };
