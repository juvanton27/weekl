const stories = [
    {
        id: 0,
        videos: [
            {
                id: 0,
                date: new Date(new Date().getTime()-86400004*2),
                video: require('../assets/videos/01.mp4')
            },
            {
                id: 1,
                date: new Date(new Date().getTime()-86400003*2),
                video: require('../assets/videos/02.mp4')
            },
            {
                id: 3,
                date: new Date(new Date().getTime()-86400002*2),
                video: require('../assets/videos/03.mp4')
            },
            {
                id: 4,
                date: new Date(new Date().getTime()-86400001*1),
                video: require('../assets/videos/04.mp4')
            },
        ],
    },
    {
        id: 1,
        videos: [
            {
                id: 5,
                date: new Date(new Date().getTime()-86400003*1),
                video: require('../assets/videos/05.mp4')
            },
            {
                id: 6,
                date: new Date(new Date().getTime()-86400002*1),
                video: require('../assets/videos/06.mp4')
            },
            {
                id: 7,
                date: new Date(new Date().getTime()-86400001*1),
                video: require('../assets/videos/07.mp4')
            },
        ],
    },
];

export function getActiveStoriesByUser(id) {
    return stories.find(s=>s.id===id).videos.filter(v=>v.date.getTime() >= new Date().getTime()-(7*86400000));
} 

export default stories;