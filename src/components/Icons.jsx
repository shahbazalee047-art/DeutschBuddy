import { createElement } from 'react';

const s = { fill: 'none', stroke: 'currentColor', strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' };

function si(type, props, children) {
  return createElement('svg', { viewBox: '0 0 24 24', ...s, width: '1em', height: '1em', ...props }, ...children.map(c => createElement(...c)));
}

function p(d) { return ['path', { d }]; }
function l(x1, y1, x2, y2) {
  if (typeof x1 === 'string' && y1 === undefined) {
    const nums = x1.match(/-?\d+\.?\d*/g).map(Number);
    return ['line', { x1: nums[0], y1: nums[1], x2: nums[2], y2: nums[3] }];
  }
  return ['line', { x1, y1, x2, y2 }];
}
function poly(points) { return ['polyline', { points }]; }
function c(x, y, r) { return ['circle', { cx: x, cy: y, r }]; }
function r(x, y, w, h, rx) { const a = { x, y, width: w, height: h }; if (rx !== undefined) a.rx = rx; return ['rect', a]; }

export const IconHome = (props) => si('g', props, [p('M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z'), poly('9 22 9 12 15 12 15 22')]);
export const IconChart = (props) => si('g', props, [l('18 20 18 10'), l('12 20 12 4'), l('6 20 6 14')]);
export const IconTrophy = (props) => si('g', props, [p('M6 9H4.5a2.5 2.5 0 0 1 0-5H6'), p('M18 9h1.5a2.5 2.5 0 0 0 0-5H18'), p('M4 22h16'), p('M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22'), p('M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22'), p('M18 2H6v7a6 6 0 0 0 12 0V2Z')]);
export const IconChat = (props) => si('g', props, [p('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')]);
export const IconBook = (props) => si('g', props, [p('M4 19.5A2.5 2.5 0 0 1 6.5 17H20'), p('M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z')]);
export const IconBookOpen = (props) => si('g', props, [p('M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z'), p('M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z')]);
export const IconTarget = (props) => si('g', props, [c(12, 12, 10), c(12, 12, 6), c(12, 12, 2)]);
export const IconCalendar = (props) => si('g', props, [r(3, 4, 18, 18, 2), l('16 2 16 6'), l('8 2 8 6'), l('3 10 21 10')]);
export const IconBell = (props) => si('g', props, [p('M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9'), p('M13.73 21a2 2 0 0 1-3.46 0')]);
export const IconUser = (props) => si('g', props, [p('M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2'), c(12, 7, 4)]);
export const IconWave = (props) => si('g', props, [p('M2 12a10 10 0 0 1 20 0'), p('M6 12a6 6 0 0 1 12 0'), p('M10 12a2 2 0 0 1 4 0')]);
export const IconFire = (props) => si('g', props, [p('M8.5 14.5A2.5 2.5 0 0 0 11 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 1 1-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 0 0 2.5 2.5z')]);
export const IconEdit = (props) => si('g', props, [p('M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7')]);
export const IconHelpCircle = (props) => si('g', props, [c(12, 12, 10), p('M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3'), l('12 17 12.01 17')]);
export const IconCards = (props) => si('g', props, [p('M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z'), poly('14 2 14 8 20 8'), l(16, 13, 8, 13), l(8, 14, 16, 14)]);
export const IconLink = (props) => si('g', props, [p('M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71'), p('M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71')]);
export const IconPencil = (props) => si('g', props, [p('M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z')]);
export const IconShuffle = (props) => si('g', props, [poly('16 3 21 3 21 8'), l(4, 3, 21, 3), poly('8 21 3 21 3 16'), l(21, 21, 3, 3)]);
export const IconMic = (props) => si('g', props, [p('M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z'), l(19, 10, 17.5, 11.5), p('M5.5 11.5 5 12a7 7 0 0 0 14 0')]);
export const IconFeather = (props) => si('g', props, [p('M3 21c3-3 7-3 12-3 3 0 6 0 6-3C21 9 9 3 3 9c0 3 2 5 4 7-2 2-4 3-4 5z'), p('M15 12c-3-1-6-3-8-5')]);
export const IconClipboard = (props) => si('g', props, [r(3, 3, 18, 18, 2), l('9 12 12 12'), l('9 16 12 16')]);
export const IconTheater = (props) => si('g', props, [p('M12 2a10 10 0 1 0 10 10 4 4 0 0 1-5-5 4 4 0 0 1-5-5'), p('M8.5 8.5v.01'), p('M15.5 15.5v.01'), p('M12 22v-4')]);
export const IconSparkles = (props) => si('g', props, [p('M12 3v4'), p('M18 5l-3 3'), p('M21 12h-4'), p('M19 18l-3-3'), p('M12 21v-4'), p('M8 19l3-3'), p('M5 12h4'), p('M5 6l3 3')]);
export const IconHeadphones = (props) => si('g', props, [p('M3 18v-6a9 9 0 0 1 18 0v6'), p('M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z')]);
export const IconBolt = (props) => si('g', props, [p('M13 2L3 14h9l-1 8 10-12h-9l1-8z')]);
export const IconLightbulb = (props) => si('g', props, [p('M9 18h6'), p('M10 22h4'), p('M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0 0 18 8 6 6 0 0 0 6 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 0 1 8.91 14')]);
export const IconLock = (props) => si('g', props, [r(5, 11, 14, 9, 2), p('M7 11V7a5 5 0 0 1 10 0v4')]);
export const IconCheck = (props) => si('g', props, [poly('20 6 9 17 4 12')]);
export const IconSquare = (props) => si('g', props, [r(3, 3, 18, 18, 2)]);
export const IconSearch = (props) => si('g', props, [c(11, 11, 8), l(21, 21, 16.65, 16.65)]);
export const IconMail = (props) => si('g', props, [r(2, 4, 20, 16, 2), poly('2 4 12 13 22 4')]);
export const IconCrown = (props) => si('g', props, [p('M2 20h20M4 20V8l4 4 4-8 4 8 4-4v12')]);
export const IconDiamond = (props) => si('g', props, [p('M12 2l4 6-4 14-4-14z'), p('M12 2l-4 6 8 6')]);
export const IconStar = (props) => si('g', props, [poly('12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2')]);
export const IconMedal = (props) => si('g', props, [c(12, 8, 6), p('M15.477 12.89 17 22l-5-3-5 3 1.523-9.11')]);
export const IconMap = (props) => si('g', props, [p('M3 7v11a1 1 0 0 0 .7.94l5.3 1.77a1 1 0 0 0 .63-.01L15 19.58l5.3 1.77A1 1 0 0 0 22 20.35V9.33a1 1 0 0 0-.7-.94L16 6.58l-5.3-1.77a1 1 0 0 0-.63.01L9 5.42'), p('M9 5.42V19.4'), p('M15 6.58V20.4')]);
export const IconBird = (props) => si('g', props, [p('M16 7h.01'), p('M3.4 18H12a8 8 0 0 0 8-8V7l4 4-4 4v1a6 6 0 0 1-6 6H5.5l3-3-1.5-1.5')]);
export const IconPercent = (props) => si('g', props, [l('19 5 5 19'), c(6.5, 6.5, 3.5), c(17.5, 17.5, 3.5)]);
export const IconBear = (props) => si('g', props, [c(12, 8, 7), c(8, 6, 2), c(16, 6, 2), c(9, 11, 1.5), c(15, 11, 1.5), p('M12 17c-1.5 0-3-.5-3-2 0 1.5 1.5 3 3 3s3-1.5 3-3c0 1.5-1.5 2-3 2z')]);
export const IconTurtle = (props) => si('g', props, [p('M5 12a7 7 0 0 1 14 0v5a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3z'), p('M8 12v.01'), p('M16 12v.01'), p('M12 3v2'), p('M3 12h2'), p('M19 12h2')]);
export const IconGraduation = (props) => si('g', props, [p('M22 10v6M2 10l10-5 10 5-10 5z'), p('M6 12v5c3 3 9 3 12 0v-5')]);
export const IconSpeaker = (props) => si('g', props, [poly('11 5 6 9 2 9 2 15 6 15 11 19 11 5'), p('M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07')]);
export const IconSpeakerMute = (props) => si('g', props, [poly('11 5 6 9 2 9 2 15 6 15 11 19 11 5'), l('23 9 9 23'), l('9 9 23 23')]);
export const IconVideo = (props) => si('g', props, [r(2, 4, 20, 16, 2), p('M22 8l-6 4 6 4V8Z')]);
export const IconPodcast = (props) => si('g', props, [p('M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8l-6 6v12a2 2 0 0 0 2 2Z'), p('M18 2v6H8')]);
export const IconNewspaper = (props) => si('g', props, [p('M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8l-6 6v12a2 2 0 0 0 2 2Z'), l('18 10 18 14'), l('10 10 8 10'), l('6 10 5 10')]);
export const IconHash = (props) => si('g', props, [l('4 9 16 9'), l('4 15 16 15'), l('10 3 8 21'), l('2 3 6 21')]);
export const IconClock = (props) => si('g', props, [c(12, 12, 10), poly('12 6 12 12 16 14')]);
export const IconAward = (props) => si('g', props, [c(12, 8, 6), p('M15.477 12.89 17 22l-5-3-5 3 1.523-9.11')]);
export const IconChevronRight = (props) => si('g', props, [poly('9 18 15 12 9 6')]);
export const IconLeaf = (props) => si('g', props, [p('M11 20A7 7 0 0 1 9.8 6.4C10.2 4.5 11.9 3 14 3a5 5 0 0 1 5 5c0 2.6-1.5 4.8-3.6 5.8A7 7 0 0 1 11 20Z'), p('M12 20v2')]);
export const IconTree = (props) => si('g', props, [p('M12 22V8'), p('M8 12l4-4 4 4'), p('M12 2C8 2 4 5 4 9c0 5 4 7 8 10 4-3 8-5 8-10 0-4-4-7-8-7z')]);
export const IconCertificate = (props) => si('g', props, [c(12, 8, 6), p('M15.477 12.89 17 22l-5-3-5 3 1.523-9.11')]);
export const IconArrowLeft = (props) => si('g', props, [l('19 12 5 12'), poly('12 19 5 12 12 5')]);
export const IconArrowUp = (props) => si('g', props, [l('12 19 12 5'), poly('5 12 12 5 19 12')]);
export const IconArrowRight = (props) => si('g', props, [l('5 12 19 12'), poly('12 5 19 12 12 19')]);
export const IconX = (props) => si('g', props, [l('18 6 6 18'), l('6 6 18 18')]);
export const IconMenu = (props) => si('g', props, [l('3 12 21 12'), l('3 6 21 6'), l('3 18 21 18')]);
export const IconPlus = (props) => si('g', props, [l('12 5 12 19'), l('5 12 19 12')]);
export const IconThumbsUp = (props) => si('g', props, [p('M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3')]);
export const IconMessageCircle = (props) => si('g', props, [p('M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z')]);
export const IconImage = (props) => si('g', props, [r(2, 2, 20, 20, 2), c(8.5, 8.5, 1.5), p('M21 15l-5-5L5 21')]);
export const IconSettings = (props) => si('g', props, [c(12, 12, 3), p('M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42')]);
export const IconLogOut = (props) => si('g', props, [p('M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4'), poly('16 17 21 12 16 7'), l('21 12 9 12')]);
export const IconFlag = (props) => si('g', props, [p('M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z'), l(4, 22, 4, 15)]);
export const IconHeart = (props) => si('g', props, [p('M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z')]);
export const IconZap = (props) => si('g', props, [p('M13 2L3 14h9l-1 8 10-12h-9l1-8z')]);
export const IconInfo = (props) => si('g', props, [c(12, 12, 10), l('12 16 12 12'), l('12 8 12.01 8')]);
export const IconTrendingUp = (props) => si('g', props, [poly('23 6 13.5 15.5 8.5 10.5 1 18'), poly('17 6 23 6 23 12')]);
export const IconActivity = (props) => si('g', props, [poly('22 12 18 12 15 21 9 3 6 12 2 12')]);
export const IconCheckCircle = (props) => si('g', props, [c(12, 12, 10), poly('9 12 11 14 15 10')]);
export const IconMoon = (props) => si('g', props, [p('M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z')]);
export const IconSun = (props) => si('g', props, [c(12, 12, 5), l('12 1 12 3'), l('12 21 12 23'), l('4.22 4.22 5.64 5.64'), l('18.36 18.36 5.64 5.64'), l('1 12 3 12'), l('21 12 23 12'), l('4.22 19.78 5.64 18.36'), l('18.36 5.64 5.64 4.22')]);

export const IconWarning = (props) => si('g', props, [c(12, 12, 10), p('M12 2v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 1 1-8 0 4 4 0 0 1 8 0z')]);

export const IconPlay = (props) => si('g', props, [c(12, 12, 10), p('M10 8l6 4-6 4V8z')]);

export const IconPlayFilled = (props) => si('g', props, [poly('5 3 19 12 5 21 5 3z')]);

export const IconSpeakerX = (props) => si('g', props, [poly('11 5 6 9 2 9 2 15 6 15 11 19 11 5'), l('23 9 9 23'), l('9 9 23 23')]);
