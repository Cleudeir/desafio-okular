// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { createClient } from 'pexels';

export default async function handler(req, res) {

  const client = createClient(String(process.env.API_KEY));
  const query = 'Nature';

  const request = await client.videos.search({ query, per_page: 80 })

  const videos = await request.videos

  const result = videos.map((item, id) => {
    const title = item.url.replace("https://www.pexels.com/video/", '').replace(`${item.id}/`, '').split('-').join(' ')
    const obj = {
      id,
      title,
      url: item.video_files[0].link || item.video_files[1].link || item.video_files[2].link,
      poster: item.video_pictures[0].picture || item.video_pictures[1].picture || item.video_pictures[2].picture,
      description: `autor: ${item.user.name} @${item.user.name.replace('https://www.pexels.com', '')}`,
    }
    return obj
  })
  console.log(result)

  return res.status(200).json({ result, videos })
}
