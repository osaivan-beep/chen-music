
import { MusicTrack, CarouselImage } from './types';

const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/smile584421-chen/chen-music/main/';

export const INITIAL_CAROUSEL: CarouselImage[] = [
  { id: 'img_6', url: `${GITHUB_RAW_BASE}chen-p6.jpg`, title: '風與石系列', subtitle: 'Wind & Stone Series' },
  { id: 'img_5', url: `${GITHUB_RAW_BASE}chen-p5.jpg`, title: '在旋律中與自己相遇', subtitle: 'Meeting Yourself in Melody' },
  { id: 'img_4', url: `${GITHUB_RAW_BASE}chen-p4.jpg`, title: '溫暖療癒系', subtitle: 'Warmth & Healing' },
  { id: 'img_3', url: `${GITHUB_RAW_BASE}chen-p3.jpg`, title: '風 地與水的協奏', subtitle: 'Concerto of Wind, Earth & Water' },
  { id: 'img_2', url: `${GITHUB_RAW_BASE}chen-p2.jpg`, title: '溪語情書', subtitle: 'Love Letters from the Brook' },
  { id: 'img_1', url: `${GITHUB_RAW_BASE}chen-p1.jpg`, title: '月光', subtitle: 'Moonlight' },
];

export const CATEGORIES = ['禎心推薦', '冥想', '溫暖', '明亮', '放鬆'];

export const INITIAL_TRACKS: MusicTrack[] = [
  { 
    id: 't1', 
    title: '月光1', 
    artist: '在萬物乾渴的夢境裡，妳是永不乾枯的泉源。\nIn a dream where all things are thirsty, you are an inexhaustible spring.', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen-m1.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p1.jpg` 
  },
  { 
    id: 't2', 
    title: '月光3', 
    artist: '月色正溫柔地收攏，世間所有的顛沛與匆匆。\nThe moonlight gently embraces all the noise and hustle and bustle.', 
    category: '溫暖', 
    url: `${GITHUB_RAW_BASE}chen-m2.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p2.jpg` 
  },
  { 
    id: 't3', 
    title: '在旋律中與自己相遇3', 
    artist: '心安了，便是一生瀟灑。\nPeace of mind is the key to a carefree life.', 
    category: '溫暖', 
    url: `${GITHUB_RAW_BASE}chen-m3.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p3.jpg` 
  },
  { 
    id: 't4', 
    title: '在旋律中與自己相遇4', 
    artist: '光影交織，溫暖如昨。\nAmidst the interplay of light and shadow, the warmth remains unchanged.', 
    category: '冥想', 
    url: `${GITHUB_RAW_BASE}chen-m4.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p4.jpg` 
  },
  { 
    id: 't5', 
    title: '風地與水協奏1', 
    artist: '像風掠過水，滋潤大地。\nLike the wind sweeping across the water, nourishing the earth.', 
    category: '溫暖', 
    url: `${GITHUB_RAW_BASE}chen-m5.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p5.jpg` 
  },
  { 
    id: 't6', 
    title: '風地與水協奏3', 
    artist: '當旋律蔓延成最好的相遇。\nAs the melody spreads, you will encounter the most beautiful things.', 
    category: '明亮', 
    url: `${GITHUB_RAW_BASE}chen-m6.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p6.jpg` 
  },
  { 
    id: 't7', 
    title: '風與石系列2 遠行', 
    artist: '我不曾離去，而你正要遠行。\nI have never left, but you are about to embark on a long journey.', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen-m7.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p1.jpg` 
  },
  { 
    id: 't8', 
    title: '風與石系列4 放手-1', 
    artist: '最終你成了抓不住的遠方。\nIn the end, you became an unattainable distance.', 
    category: '禎心推薦', 
    url: `${GITHUB_RAW_BASE}chen-m8.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p2.jpg` 
  },
  { 
    id: 't9', 
    title: '溪語情書2', 
    artist: '靈魂很輕，世界很遠，而你，就在自己懷裡。\nThe soul is light, the world is far away, and you lie in your own embrace.', 
    category: '明亮', 
    url: `${GITHUB_RAW_BASE}chen-m9.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p3.jpg` 
  },
  { 
    id: 't10', 
    title: '溪語情書5', 
    artist: '順著蜿蜒的旋律而行，前方，便是為你點亮的燈火。\nFollow the winding melody, and ahead lies the light lit for you.', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen-m10.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p4.jpg` 
  },
  { 
    id: 't11', 
    title: '溫暖療癒系1', 
    artist: '所有的流浪，都是為了此刻的停泊。\nAll wandering is for the sake of finding a place to anchor.', 
    category: '放鬆', 
    url: `${GITHUB_RAW_BASE}chen-m11.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p5.jpg` 
  },
  { 
    id: 't12', 
    title: '溫暖療癒系5', 
    artist: '在音符裡安放所有憂傷。\nLet all the sorrow turn into musical notes, and let him take them away.', 
    category: '冥想', 
    url: `${GITHUB_RAW_BASE}chen-m12.mp3`, 
    coverUrl: `${GITHUB_RAW_BASE}chen-p6.jpg` 
  }
];

export const ADMIN_PASSWORD = 'admin';
