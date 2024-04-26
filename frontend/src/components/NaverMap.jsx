import React, { useEffect, useState  } from 'react';

function NaverMap( {intValue} ) {

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [placeName, setPlaceName] = useState(null);
  const [placewhere1, setPlacewhere1] = useState(null);
  const [homepage, setHomepage] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {

    const fetchCoordinatesAndRenderMap = async () => {
      if(intValue > 0)
      {
          console.log(intValue);
          try {
            // API 호출하여 데이터 받아오기
            const response = await fetch('http://223.130.139.240/api/v1/categories/places/');
            const data = await response.json();
            
            // 받아온 데이터에서 좌표 값을 추출하여 상태로 설정
            const latitude = parseFloat(data.results[intValue - 1].Latitude);
            const longitude = parseFloat(data.results[intValue - 1].Longitude);

            const placeName = data.results[intValue - 1].Place_Name;
            const placewhere1 = data.results[intValue - 1].place_where1;
            const homepage = data.results[intValue - 1].Home_Page;

           
            
            setLatitude(latitude);
            setLongitude(longitude);
            setPlaceName(placeName);
            setPlacewhere1(placewhere1);
            setHomepage(homepage);
            
          } catch (error) {
            console.error('Error fetching data:', error);
          }
    
          setIsLoaded(true);
        };
    
        
      }
      fetchCoordinatesAndRenderMap();
      
  }, [intValue]);

    
  useEffect(() => {
    if (isLoaded) {
    // Naver 지도 API 로드
    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=k7uu5g5so9';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {

        


      // Naver 지도 생성
      const cityhall = new window.naver.maps.LatLng(latitude, longitude);
      const map = new window.naver.maps.Map('map', {
        center: cityhall.destinationPoint(0, 500),
        zoom: 15
      });

      // 지도에 마커 추가
      const marker = new window.naver.maps.Marker({
        position: cityhall,
        map: map
      });

      // 정보 창에 들어갈 HTML 문자열
      const contentString = `
      <div class="iw_inner">
        <h3>${placeName}</h3>
        <p>${placewhere1}<br />
           <a href="${homepage}" target="_blank">관련링크</a>
        </p>
      </div>
    `;

      // 정보 창 객체 생성
      const infowindow = new window.naver.maps.InfoWindow({
        content: contentString
      });

      // 마커 클릭 이벤트 처리
      window.naver.maps.Event.addListener(marker, "click", function(e) {
        if (infowindow.getMap()) {
          infowindow.close();
        } else {
          infowindow.open(map, marker);
        }
      });

      // 초기에 정보 창 열기
      infowindow.open(map, marker);
    };

    // 클린업 함수
    return () => {
      document.head.removeChild(script);
    };
    }
  }, [isLoaded]);

  return (
    <div id="map" style={{ width: '700px', height: '500px' }}></div>
  );
}

export default NaverMap;