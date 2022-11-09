import stories from "./stories.service";

const users = [
  {
    id: 0,
    username: 'jvantongerlo',
    stories: 0,
    picture: 'assets/pictures/01.jpeg'
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