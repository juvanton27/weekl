const posts = [
  {
    id: 0,
    posts: [
      {
        id: 0,
        date: new Date(new Date().getTime() - 86400004 * 2),
        post: 'https://ericheymans.b-cdn.net/wp-content/uploads/2012/08/dawn-field-grass-164025.jpg',
        comments: [
          {
            id: 0,
            user_id: 1,
            comment: 'Wow ❤️',
            date: new Date(new Date().getTime() - 86400000 * 2)
          },
          {
            id: 1,
            user_id: 1,
            comment: 'Wow 🔥🔥🔥🔥',
            date: new Date(new Date().getTime() - 86399999 * 2)
          },
          {
            id: 2,
            user_id: 1,
            comment: 'Insane',
            date: new Date(new Date().getTime() - 86399998 * 2)
          },
          {
            id: 3,
            user_id: 2,
            comment: 'Incroyaux',
            date: new Date(new Date().getTime() - 86399997 * 2)
          },
          {
            id: 4,
            user_id: 2,
            comment: 'Mashallaté sans sucre svp',
            date: new Date(new Date().getTime() - 86399996 * 2)
          },
        ]
      },
      {
        id: 1,
        date: new Date(new Date().getTime() - 86400003 * 2),
        post: 'https://www.radiofrance.fr/s3/cruiser-production/2022/06/5f6ac5ab-37d9-4ca6-8f79-3694fcfec071/560x315_paysage-monet.jpg'
      },
      {
        id: 3,
        date: new Date(new Date().getTime() - 86400002 * 2),
        post: 'https://www.okvoyage.com/wp-content/uploads/2021/02/paysages-norvege-scaled.jpeg'
      },
      {
        id: 4,
        date: new Date(new Date().getTime() - 86400001 * 1),
        post: 'https://terres-sauvages.ch/wp-content/uploads/2020/06/Iles-Lofoten-vue-du-ciel.jpg'
      },
    ],
  },
  {
    id: 1,
    posts: [
      {
        id: 5,
        date: new Date(new Date().getTime() - 86400003 * 1),
        post: 'https://ceweblogfrbe.photoservices.nl/wp-content/uploads/2020/09/mark-harpur-K2s_YE031CA-unsplash-1-1024x683-1.jpg'
      },
    ],
  },
  {
    id: 2,
    posts: [
      {
        id: 6,
        date: new Date(new Date().getTime() - 86400002 * 1),
        post: 'https://www.missnumerique.com/blog/wp-content/uploads/10-conseils-de-cadrage-paysage-horizon-2.jpg'
      },
    ],
  },
  {
    id: 3,
    posts: [
      {
        id: 7,
        date: new Date(new Date().getTime() - 86400001 * 1),
        post: 'https://www.naturephotographie.com/wp-content/uploads/2019/08/Trouble-in-the-Sky.jpg'
      },
    ],
  },
];

export function getPostsByUser(id) {
  if(id===undefined) return undefined;
  return posts.find(s => s.id === id).posts;
}

export function getCommentsByPost(id) {
  if(id===undefined) return undefined;
  return posts.reduce((p, c) => p.concat(c.posts), []).find(p=>p.id===id).comments??[];
}

export default posts;