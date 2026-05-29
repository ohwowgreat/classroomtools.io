import { config, collection, fields } from '@keystatic/core'

export default config({
  storage:
    process.env.KEYSTATIC_STORAGE_KIND === 'github'
      ? {
          kind: 'github',
          repo: { owner: 'ohwowgreat', name: 'classroomtools.io' },
        }
      : { kind: 'local' },

  ui: {
    brand: { name: 'classroomtools.io' },
  },

  collections: {
    tools: collection({
      label: 'Tools',
      slugField: 'name',
      path: 'content/tools/*',
      format: { data: 'yaml' },
      schema: {
        name: fields.slug({
          name: { label: 'Name' },
          slug: { label: 'Slug', description: 'URL-safe identifier, e.g. close-reading' },
        }),
        tagline: fields.text({
          label: 'Tagline',
          description: 'One-line description shown on tool cards',
        }),
        description: fields.text({
          label: 'Description',
          multiline: true,
          description: 'Full description shown on the tool detail page',
        }),
        researchModel: fields.select({
          label: 'Research model',
          options: [
            { label: 'Teaching with the feed', value: 'with-feed' },
            { label: 'Teaching against the feed', value: 'against-feed' },
            { label: 'Both models', value: 'both' },
          ],
          defaultValue: 'with-feed',
        }),
        researchNote: fields.text({
          label: 'Research connection',
          multiline: true,
          description: 'How this tool connects to the research framework',
        }),
        externalUrl: fields.url({
          label: 'External URL',
          description: 'If the tool is hosted elsewhere, link here',
          validation: { isRequired: false },
        }),
        status: fields.select({
          label: 'Status',
          options: [
            { label: 'Live', value: 'live' },
            { label: 'Coming soon', value: 'coming-soon' },
          ],
          defaultValue: 'coming-soon',
        }),
      },
    }),
  },
})
