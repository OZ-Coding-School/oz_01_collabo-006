const placesData = Array.from(Array(80)).map((_, index) => ({
    id: index + 1,
    // 아마 아이디 빼도 될껄 계령아
    img: '../../public/images/hello.jpg',
    title: `시설 ${index + 1}`,
    distance: `00km`,
    information: `설명`,
}))

export default placesData
