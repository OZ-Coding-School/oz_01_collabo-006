// const placesData = Array.from(Array(80)).map((_, index) => ({
//     id: index + 1,
//     // 아마 아이디 빼도 될껄 계령아
//     img: '../../public/images/hello.jpg',
//     title: `시설 ${index + 1}`,
//     distance: `00km`,
//     information: `설명`,
//     closed: '쉬는날',
//     sectors: '분류',
//     time: '00:00 ~ 00:00',
//     dog: '애완견 기준',
//     inside: '실내',
//     outside: '실외',
// }))

// export default placesData

const placesData = [
    {
        id: 1,
        // 아마 아이디 빼도 될껄 계령아
        img: '/public/images/hello.jpg',
        title: `시설`,
        distance: `00km`,
        information: `설명`,
        closed: '쉬는날',
        sectors: '분류',
        time: '00:00 ~ 00:00',
        dog: '애완견 기준',
        inside: '실내',
        outside: '실외',
        url: 'https://velog.io/@rgfdds98/React%EC%97%90%EC%84%9C-%ED%81%B4%EB%A6%AD%EC%8B%9C-%EC%99%B8%EB%B6%80%EB%A7%81%ED%81%AC%EB%A1%9C-%EC%97%B4%EA%B8%B0',
        users: [
            {
                id: 'q',
                img: '',
                name: '바보',
                comment: '하잉',
            },
            {
                id: 'w',
                img: '/public/images/krk.jpg',
                name: '냠냠',
                comment: '히잉',
            },
        ],
    },
    {
        id: 2,
        // 아마 아이디 빼도 될껄 계령아
        img: '../../public/images/hello.jpg',
        title: `시1설`,
        distance: `010km`,
        information: `설명1`,
        closed: '쉬는d날',
        sectors: '분1류',
        time: '00:00 ~ 00:00',
        dog: '애완s견 기준',
        inside: '실내',
        outside: '실외',
        url: 'https://www.naver.com/',
        users: [
            {
                id: 'r',
                img: '/public/images/krk.jpg',
                name: '바부양',
                comment: '안뇽',
            },
            {
                id: 't',
                img: '',
                name: '냠냐미',
                comment: '히잉헹',
            },
        ],
    },
]

export default placesData
