
import { MusicTrack, CarouselImage } from './types';

// 根據您的反饋：圖片已改為連字號，音樂在 GitHub 截圖中仍為空格
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/smile584421-chen/chen-music/main/';

export const INITIAL_CAROUSEL: CarouselImage[] = [
  { id: 'img_1', url: `${GITHUB_RAW_BASE}chen-p1.jpg`, title: '月光', subtitle: 'Moonlight' },
  { id: 'img_5', url: `${GITHUB_RAW_BASE}chen-p5.jpg`, title: '在旋律中與自己相遇', subtitle: 'Meeting Yourself in Melody' },
  { id: 'img_3', url: `${GITHUB_RAW_BASE}chen-p3.jpg`, title: '風-地與水的協奏', subtitle: 'Concerto of Wind, Earth & Water' },
  { id: 'img_6', url: `${GITHUB_RAW_BASE}chen-p6.jpg`, title: '風與石系列', subtitle: 'Wind & Stone Series' },
  { id: 'img_2', url: `${GITHUB_RAW_BASE}chen-p2.jpg`, title: '溪語情書', subtitle: 'Love Letters from the Brook' },
  { id: 'img_4', url: `${GITHUB_RAW_BASE}chen-p4.jpg`, title: '溫暖療癒系', subtitle: 'Warmth & Healing' },
];

export const CATEGORIES = ['禎心推薦', '冥想', '溫暖', '明亮', '放鬆'];

export const INITIAL_TRACKS: MusicTrack[] = [
  { 
    id: 't1', 
    title: '月光 1', 
    artist: '在萬物乾渴的夢境裡，妳是永不乾枯的泉源。', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen%20m1.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p1.jpg` 
  },
  { 
    id: 't2', 
    title: '月光 3', 
    artist: '月色正溫柔地收攏，世間所有的顛沛與匆匆。', 
    category: '溫暖', 
    url: `${GITHUB_RAW_BASE}chen%20m2.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p1.jpg` 
  },
  { 
    id: 't3', 
    title: '在旋律中與自己相遇 3', 
    artist: '心安了，便是一生瀟灑。', 
    category: '溫暖', 
    url: `${GITHUB_RAW_BASE}chen%20m3.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p5.jpg` 
  },
  { 
    id: 't4', 
    title: '在旋律中與自己相遇 4', 
    artist: '光影交織，溫暖如昨。', 
    category: '冥想', 
    url: `${GITHUB_RAW_BASE}chen%20m4.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p5.jpg` 
  },
  { 
    id: 't5', 
    title: '風地與水協奏 1', 
    artist: '像風掠過水，滋潤大地。', 
    category: '溫暖', 
    url: `${GITHUB_RAW_BASE}chen%20m5.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p3.jpg` 
  },
  { 
    id: 't6', 
    title: '風地與水協奏 3', 
    artist: '當旋律蔓延成最好的相遇。', 
    category: '明亮', 
    url: `${GITHUB_RAW_BASE}chen%20m6.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p3.jpg` 
  },
  { 
    id: 't7', 
    title: '風與石系列 2 遠行', 
    artist: '我不曾離去，而你正要遠行。', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen%20m7.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p6.jpg` 
  },
  { 
    id: 't8', 
    title: '風與石系列 4 放手-1', 
    artist: '最終你成了抓不住的遠方。', 
    category: '禎心推薦', 
    url: `${GITHUB_RAW_BASE}chen%20m8.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p6.jpg` 
  },
  { 
    id: 't9', 
    title: '溪語情書 2', 
    artist: '靈魂很輕，世界很遠，而你，就在自己懷裡。', 
    category: '明亮', 
    url: `${GITHUB_RAW_BASE}chen%20m9.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p2.jpg` 
  },
  { 
    id: 't10', 
    title: '溪語情書 5', 
    artist: '順著蜿蜒的旋律而行，前方，便是為你點亮的燈火。', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen%20m10.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p2.jpg` 
  },
  { 
    id: 't11', 
    title: '溫暖療癒系 1', 
    artist: '所有的流浪，都是為了此刻的停泊。', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen%20m11.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p4.jpg` 
  },
  { 
    id: 't12', 
    title: '溫暖療癒系 5', 
    artist: '在音符裡安放所有憂傷。', 
    category: '冥想', 
    url: `${GITHUB_RAW_BASE}chen%20m12.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p4.jpg` 
  }
];

export const ADMIN_PASSWORD = 'admin';
