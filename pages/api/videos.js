// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  res.status(200).json([{
    title: 'Foster The People - Pumped Up Kicks (Official Video)',
    url: '/videos/001.mp4',
    poster: '/poster/001.jpg'
  },
  {
    title: 'Axel Thesleff - Bad Karma',
    url: '/videos/002.mp4',
    poster: '/poster/002.jpg'
  },
  {
    title: 'Aaron Smith - Dancin (KRONO Remix)',
    url: '/videos/003.mp4',
    poster: '/poster/003.jpg'
  },
  {
    title: 'Tom Odell - Another Love (Lyrics) [Zwette Edit]',
    url: '/videos/004.mp4',
    poster: '/poster/004.jpg'
  },
  {
    title: 'Capital Cities - Safe And Sound (Official Video)',
    url: '/videos/005.mp4',
    poster: '/poster/005.jpg'
  },
  ]
  )
}
