import { CreatePageParameters } from '@notionhq/client/build/src/api-endpoints'
import Youtube, { YoutubeVideoSnippet } from 'youtube.ts'

import type { NextApiRequest, NextApiResponse } from 'next'
type ParagraphBlock = {
  type: 'paragraph'
  paragraph: {
    rich_text: {
      type: 'text'
      text: {
        content: string
        link: null
      }
    }[]
  }
}
export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { Client } = require('@notionhq/client')
  const notion = new Client({
    auth: req.body.notionApiKey,
  })
  const youtube = new Youtube(req.body.youtubeApiKey)
  const video = await youtube.videos.get(req.body.url)
  const descriptionParagraph: ParagraphBlock[] = []
  for (const eachParagraph of video.snippet.description.split('\n\n')) {
    descriptionParagraph.push({
      type: 'paragraph',
      paragraph: {
        rich_text: [
          {
            type: 'text',
            text: {
              content: eachParagraph + '\n',
              link: null,
            },
          },
        ],
      },
    })
  }
  const parameters: CreatePageParameters = {
    parent: {
      database_id: req.body.databaseId,
    },
    properties: {
      Name: {
        title: [
          {
            text: {
              content: video.snippet.title,
            },
          },
        ],
      },
      URL: {
        url: 'https://youtube.com/watch?v=' + video.id,
      },
    },
    children: descriptionParagraph,
    icon: {
      type: 'external',
      external: {
        url: 'https://www.youtube.com/s/desktop/e06db45c/img/favicon_144x144.png',
      },
    },
    cover: {
      type: 'external',
      external: {
        url: getLargerYoutubeThumbnail(video.snippet.thumbnails),
      },
    },
  } as CreatePageParameters
  const response = await notion.pages.create(parameters)
  res.status(200).json(response)
}

const getLargerYoutubeThumbnail = (thumbnails: YoutubeVideoSnippet['thumbnails']) => {
  if (thumbnails.maxres) {
    return thumbnails.maxres.url
  } else if (thumbnails.standard) {
    return thumbnails.standard.url
  } else {
    return thumbnails.high.url
  }
}
