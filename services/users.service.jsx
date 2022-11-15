import stories from "./stories.service";

const users = [
  {
    id: 0,
    username: 'jvantongerlo',
    stories: 0,
    picture: 'https://pub-static.fotor.com/assets/projects/pages/d5bdd0513a0740a8a38752dbc32586d0/fotor-03d1a91a0cec4542927f53c87e0599f6.jpg',
  },
  {
    id: 1,
    username: 'mgiunta',
    stories: 1,
  },
  {
    id: 2,
    username: 'ljanssens',
  },
  {
    id: 3,
    username: 'mlibidi',
  },
  {
    id: 4,
    username: 'mmormina',
  },
  {
    id: 5,
    username: 'lvantongerlo',
  },
]

export function getUserById(id) {
  return users.find(u=>u.id===id);
}