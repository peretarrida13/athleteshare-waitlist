import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: 'https://athleteshare.app', lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: 'https://athleteshare.app/privacy', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
    { url: 'https://athleteshare.app/terms', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.3 },
  ]
}
