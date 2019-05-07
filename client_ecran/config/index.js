export const WINDOW_WIDTH = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth
export const WINDOW_HEIGHT = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
export const WORLD_SIZE = { width: 2024, height: 1000 }
export const ASSETS_URL = '../assets'
export const NBR_POPBOX_COLONNE = 2
export const POS_Y_POPBOX = (WORLD_SIZE.height / 2) + 200;
export const NBR_POPBOX_LIGNE = 4;
export const NBR_MONSTRE_LIGNE = (localStorage.getItem('stage') === '3') ? 1 : 2;
export const NBR_MONSTRE_COLONNE = (localStorage.getItem('stage') === '3') ? 3 : 2;
export const DIST_LIGNE = (localStorage.getItem('stage') !== '2') ? 600 : 2000;
export const DIST_COLONNE = 600;
export const LIMIT_TOP = 200;
export const LIMIT_BOTTOM = 2000;
export const LIMIT_LEFT = 100;
export const LIMIT_RIGHT = 2000;
