import React, { useEffect } from 'react';

function NaverMap() {
  useEffect(() => {
    // Naver 지도 API 로드
    const script = document.createElement('script');
    script.src = 'https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=k7uu5g5so9';
    script.async = true;
    document.head.appendChild(script);

    script.onload = () => {
      // Naver 지도 생성
      const cityhall = new window.naver.maps.LatLng(37.5666805, 126.9784147);
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
      const contentString = [
        '<div class="iw_inner">',
        '   <h3>서울특별시청</h3>',
        '   <p>서울특별시 중구 태평로1가 31 | 서울특별시 중구 세종대로 110 서울특별시청<br />',
        '       <img src="./img/example/hi-seoul.jpg" width="10" height="10" alt="서울시청" class="thumb" /><br />',
        '       02-120 | 공공,사회기관 &gt; 특별,광역시청<br />',
        '       <a href="http://www.seoul.go.kr" target="_blank">www.seoul.go.kr/</a>',
        '   </p>',
        '</div>'
      ].join('');

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
  }, []);

  return (
    <div id="map" style={{ width: '700px', height: '500px' }}></div>
  );
}

export default NaverMap;
