// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async function handler(req, res) {
  res.status(200).json([
    {
      id: 0,
      title: "Foster The People - Pumped Up Kicks (Official Video)",
      url: "/videos/001.mp4",
      poster: "/poster/001.jpg",
      description: "912,411,209 views  Feb 5, 2011",
    },
    {
      id: 1,
      title: "Axel Thesleff - Bad Karma",
      url: "/videos/002.mp4",
      poster: "/poster/002.jpg",
      description: "112,838,690 views  Jan 13, 2017",
    },
    {
      id: 2,
      title: "Aaron Smith - Dancin (KRONO Remix)",
      url: "/videos/003.mp4",
      poster: "/poster/003.jpg",
      description: "671,643,307 views  Apr 15, 2013",
    },
    {
      id: 3,
      title: "Tom Odell - Another Love (Lyrics) [Zwette Edit]",
      url: "/videos/004.mp4",
      poster: "/poster/004.jpg",
      description: "2,972,042 views  May 16, 2021",
    },
    {
      id: 4,
      title: "Capital Cities - Safe And Sound (Official Video)",
      url: "/videos/005.mp4",
      poster: "/poster/005.jpg",
      description: "676,941,501 views  Apr 25, 2013",
    },
  ]);
}
