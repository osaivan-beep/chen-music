
import { MusicTrack, CarouselImage } from './types';

/**
 * 圖片連結指向您的 GitHub: smile584421-chen/chen-music
 * 使用英文檔名避免編碼問題
 */
const GITHUB_RAW_BASE = 'https://raw.githubusercontent.com/smile584421-chen/chen-music/main/';

export const INITIAL_CAROUSEL: CarouselImage[] = [
  { 
    id: 'img_harp', 
    url: `${GITHUB_RAW_BASE}chen-p6.jpg`, 
    title: '豎琴魅影', 
    subtitle: 'Phantom of the Harp' 
  },
  { 
    id: 'img_piano', 
    url: `${GITHUB_RAW_BASE}chen-p5.jpg`, 
    title: '指尖的舞蹈', 
    subtitle: 'Dance on Fingertips' 
  },
  { 
    id: 'img_flute', 
    url: `${GITHUB_RAW_BASE}chen-p4.jpg`, 
    title: '晨曦的長笛', 
    subtitle: 'Flute in the Morning Mist' 
  },
  { 
    id: 'img_erhu', 
    url: `${GITHUB_RAW_BASE}chen-p3.jpg`, 
    title: '國樂風華', 
    subtitle: 'Heritage of National Music' 
  },
  { 
    id: 'img_violin', 
    url: `${GITHUB_RAW_BASE}chen-p2.jpg`, 
    title: '小提琴之歌', 
    subtitle: 'Song of the Violin' 
  },
  { 
    id: 'img_cello', 
    url: `${GITHUB_RAW_BASE}chen-p1.jpg`, 
    title: '大提琴的沉思', 
    subtitle: 'Cello\'s Meditation' 
  },
];

export const CATEGORIES = ['禎心推薦', '冥想', '放鬆', '溫暖', '明亮'];

export const INITIAL_TRACKS: MusicTrack[] = [
  {
    id: 't1',
    title: '月光下的獨白',
    artist: '禎真音樂',
    category: '冥想',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    coverUrl: `${GITHUB_RAW_BASE}chen-p6.jpg`
  },
  {
    id: 't2',
    title: '晨曦微光',
    artist: '禎真音樂',
    category: '放鬆',
    url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    coverUrl: `${GITHUB_RAW_BASE}chen-p4.jpg`
  }
];

export const ADMIN_PASSWORD = 'admin';
