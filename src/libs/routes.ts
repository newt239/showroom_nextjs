type RouteParams = {
  name: string;
  path: string;
};

const routes: RouteParams[] = [
  {
    name: "Home",
    path: "/",
  },
  {
    name: "Tetris",
    path: "/tetris",
  },
  {
    name: "No Vowels",
    path: "/no_vowels",
  },
  {
    name: "Save Youtube to Notion",
    path: "/save_youtube_to_notion",
  },
];
export default routes;
