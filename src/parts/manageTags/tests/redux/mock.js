import { key } from '../../redux'

export const state = {
  global: {
    loading: false,
    error: {}
  },
  [key]: {
    tagsList: [
      {
        tagId: 1,
        tagName: 'Holidays',
        clubId: 659,
        tagTemplates: []
      },
      {
        tagId: 2,
        tagName: 'Special Offer',
        clubId: 659,
        tagTemplates: [
          {
            tagId: 2,
            templateId: 12,
            global: '0'
          },
          {
            tagId: 2,
            templateId: 13,
            global: '1'
          },
          {
            tagId: 2,
            templateId: 14,
            global: '1'
          }
        ]
      },
      {
        tagId: 3,
        tagName: 'Prospects',
        clubId: 659,
        tagTemplates: []
      },
      {
        tagId: 4,
        tagName: 'Members',
        clubId: 659,
        tagTemplates: []
      },
      {
        tagId: 5,
        tagName: 'PT',
        clubId: 659,
        tagTemplates: []
      }
    ]
  }
}

export const mockData = {
  newTagValue: 'newtag',
  tags: {
    content: [
      {
        tagId: 1,
        tagName: 'Holidays',
        clubId: 659,
        tagTemplates: []
      },
      {
        tagId: 2,
        tagName: 'Special Offer',
        clubId: 659,
        tagTemplates: [
          {
            tagId: 2,
            templateId: 12,
            global: '0'
          },
          {
            tagId: 2,
            templateId: 13,
            global: '1'
          },
          {
            tagId: 2,
            templateId: 14,
            global: '1'
          }
        ]
      },
      {
        tagId: 3,
        tagName: 'Prospects',
        clubId: 659,
        tagTemplates: []
      },
      {
        tagId: 4,
        tagName: 'Members',
        clubId: 659,
        tagTemplates: []
      },
      {
        tagId: 5,
        tagName: 'PT',
        clubId: 659,
        tagTemplates: []
      }
    ]
  }
}

export const mockResponse = {
  success: [{
    tagId: 10,
    tagName: 'new tag',
    clubId: 659
  }]
}
