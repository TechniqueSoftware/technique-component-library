import { validateScriptBody, validateScriptTags } from '@utils/validation'

const mockTags = [
  {
    name: 'TagsGroup1',
    options: [
      { name: 'hello', value: '{{hello}}' },
      { name: 'bye', value: '{{bye-bye}}' }
    ]
  },
  {
    name: 'TagsGroup2',
    options: [
      { name: 'newells', value: '{{newells}}' },
      { name: 'tag', value: '{{tag-1}}' }
    ]
  }
]

const mockData = {
  primaryAction: 2,
  secondaryAction: 3
}

const mockScripts1 = [
  {
    actionType: 1,
    script: ''
  },
  {
    actionType: 2,
    script: '<h2>This is a fake script content</h2>'
  },
  {
    actionType: 3,
    script: '<h1>Newells</h1>'
  }
]

const mockScripts2 = [
  {
    actionType: 2,
    script: '<h2>This is a fake script content</h2>'
  },
  {
    actionType: 3,
    script: ''
  }
]

describe('validation utils', () => {
  describe('validateScriptTags', () => {
    it('should return error if tag does not exist', () => {
      const errors = validateScriptTags('hi {{hello}} testing tag {{asd}}', mockTags)
      expect(errors.length).toBe(1)
      expect(errors).toContainEqual('Invalid dynamic content name: asd')
    })
    it('should return error if tag has too many brackets', () => {
      const errors = validateScriptTags('hi {{hello}} testing tag {{{newells}}', mockTags)
      expect(errors.length).toBe(1)
      expect(errors).toContainEqual(
        'Invalid dynamic content syntax, use {{newells}} instead {{{newells}}'
      )
    })
    it('should return error if tag has too few brackets', () => {
      const errors = validateScriptTags('hi {{hello} testing tag {newells}}', mockTags)
      expect(errors.length).toBe(2)
      expect(errors).toContainEqual(
        'Invalid dynamic content syntax, use {{newells}} instead {newells}}'
      )
      expect(errors).toContainEqual(
        'Invalid dynamic content syntax, use {{hello}} instead {{hello}'
      )
    })
    it('should pass if tag exists and has proper brackets', () => {
      const errors = validateScriptTags('hi {{hello}} testing tag {{newells}}', mockTags)
      expect(errors.length).toBe(0)
    })
  })

  describe('validateScriptBody', () => {
    it('should pass if non call scripts have content', () => {
      const error = validateScriptBody(mockScripts1, mockData)
      expect(error).toBeFalsy()
    })

    it('should return error if sms or email script has no content', () => {
      const error = validateScriptBody(mockScripts2, mockData)
      expect(error).toBeTruthy()
    })
  })
})
