import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://fahrschule06.ch'
  
  return [
    {
      url: baseUrl,
      lastModified: new Date('2025-09-15'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/impressum`,
      lastModified: new Date('2025-09-01'),
      changeFrequency: 'yearly',
      priority: 0.3,
    },
  ]
}
