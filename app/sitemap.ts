import { MetadataRoute } from 'next'
import storiesData from '@/data/stories.json'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://www.fahrschule06.ch'
  // The homepage changes when new success stories are published — use the newest story date
  // so lastmod reflects real content changes, not build timestamps.
  const newestStoryDate = storiesData.stories.reduce(
    (max, story) => (story.date > max ? story.date : max),
    '2026-01-01'
  )

  return [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(newestStoryDate),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/impressum/`,
      lastModified: new Date('2025-02-06'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
    {
      url: `${baseUrl}/agb/`,
      lastModified: new Date('2026-01-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
