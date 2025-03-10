import axios from "axios";

const KAKAO_API_KEY = process.env.REACT_APP_KAKAO_REST_API_KEY; // 복사한 키 입력


/**
 * 주소를 좌표로 변환
 * @param {string} address 변환할 주소 문자열
 * @returns {Promise<{lat: number, lng: number}>}
 */
export const getCoordsFromAddress = async (address) => {
  try {
    const response = await axios.get("https://dapi.kakao.com/v2/local/search/address.json", {
      headers: {
        Authorization: `KakaoAK ${KAKAO_API_KEY}`,
      },
      params: {
        query: address,
      },
    });

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
