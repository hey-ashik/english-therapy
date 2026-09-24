/**
 * Global site information: brand, contact details and external links.
 */
export const SITE_URL = 'https://englishtherapy.com.bd';

export const BRAND = {
  name: 'English Therapy',
  tagline: 'Experience English. Express You.',
  motto: 'E = YOU²',
  logo: '/brand/english-therapy-logo.svg',
  logoWhite: '/brand/english-therapy-logo-white.svg',
  socialCover: `${SITE_URL}/brand/english-therapy-social-cover.jpg`,
};

export const CONTACT = {
  phonePrimary: { label: '+880 1755 298 934', href: 'tel:+8801755298934' },
  phoneSecondary: { label: '+880 1610 853 198', href: 'tel:+8801610853198' },
  phoneTertiary: { label: '+880 1750 853 198', href: 'tel:+8801750853198' },
  email: { label: 'info@englishtherapy.com.bd', href: 'mailto:info@englishtherapy.com.bd' },
  address: ['House #37, Road #06,', 'Block #H, Mirpur-02,', 'Dhaka, Bangladesh'],
  whatsapp: 'https://wa.me/8801755298934',
  whatsappTeam: 'https://wa.me/+8801610853198',
  whatsappCourses: 'https://wa.me/8801713143175',
  whatsappGroup: 'https://chat.whatsapp.com/H10V0CJz2zmH5OWaRyhtKp?mode=ac_t',
  mapEmbed: 'https://www.google.com/maps?q=English%20Therapy%20Mirpur-2%20Dhaka&output=embed',
  mapLink: 'https://www.google.com/maps/search/?api=1&query=English%20Therapy%20Mirpur-2%20Dhaka',
};

export const MEDIA = {
  launchVideo: '/video/launching-video.mp4',
};

export const NAV_LINKS = [
  { to: '/courses', label: 'Courses' },
  { to: '/about', label: 'Our Story' },
  { to: '/faq', label: 'FAQ' },
  { to: '/books', label: 'Books' },
  { to: '/contact', label: 'Contact' },
];
