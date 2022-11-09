const stories = [
    {
        id: 0,
        videos: [
            {
                id: 0,
                date: new Date(new Date().getTime()-86400000*2),
                video: require('../assets/videos/01.mp4')
            },
            {
                id: 1,
                date: new Date(new Date().getTime()-86400000*2),
                video: require('../assets/videos/01.mp4')
            },
            {
                id: 2,
                date: new Date(new Date().getTime()-86400000*1),
                video: require('../assets/videos/01.mp4')
            }
        ],
    },
    {
        id: 1,
        videos: [
            {
                id: 1,
                date: new Date(new Date().getTime()-86400000*1),
                video: require('../assets/videos/02.mp4')
            }
        ],
    },
];

export function getActiveStoriesByUser(id) {
    return stories.find(s=>s.id===id).videos.filter(v=>v.date.getTime() >= new Date().getTime()-(7*86400000));
} 

export default stories;