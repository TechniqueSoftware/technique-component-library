import { key } from '..'

export const loadingState = {
  [key]: {
    loading: true,
    user: { name: 'Luke Skywalker', id: 1 },
    permissions: {
      featurePermissions: [
        {
          permissionName: 'FirstPermission',
          displayName: 'First Permission',
          permissionEffect: 'ALLOW',
          accessible: true
        }
      ]
    }
  }
}

export const state = {
  [key]: {
    loading: false,
    error: 'Error here',
    user: {
      name: 'Luke Skywalker',
      id: 1,
      role: { id: 3, name: 'Padawan' }
    },
    club: { name: 'Jedi Order', id: 1, timeZone: 'JediTime' },
    locations: [
      { name: 'Hoth', id: 1 },
      { name: 'Tatooine', id: 2 }
    ],
    permissions: {
      featurePermissions: [
        {
          permissionName: 'FirstPermission',
          displayName: 'First Permission',
          permissionEffect: 'ALLOW',
          accessible: true
        }
      ]
    }
  }
}

export const emptyState = {
  [key]: {
    loading: false,
    error: '',
    user: {},
    delegated: {},
    club: {},
    locations: []
  }
}

export const userData = {
  userId: 1,
  name: 'Dark Sidius',
  clubId: 259,
  locationId: 4559,
  unrestrictedAdmin: true
}

export const clubData = {
  content: [{
    id: 1,
    name: 'The empire'
  }]
}

export const locationsData = {
  content: [
    { id: 1, name: 'Hoth' },
    { id: 2, name: 'Endor' }
  ]
}

export const allowedLocationsData = {
  content: [
    {
      unrestrictedAdmin: true,
      locationName: 'Philadelphia, PA',
      locationId: 4559,
      defaultLocation: true
    },
    {
      unrestrictedAdmin: true,
      locationName: 'Austin, TX',
      locationId: 4585,
      defaultLocation: false
    }
  ],
  totalPages: 2
}

export const restrictedAllowedLocationsData = {
  content: [
    {
      locationName: 'Philadelphia, PA',
      locationId: 4559,
      defaultLocation: true
    },
    {
      locationName: 'Austin, TX',
      locationId: 4585,
      defaultLocation: false
    }
  ],
  totalPages: 2
}

export const expectedAllowedLocationsData = {
  content: [
    {
      unrestrictedAdmin: true,
      locationName: 'Philadelphia, PA',
      locationId: 4559,
      defaultLocation: true
    },
    {
      unrestrictedAdmin: true,
      locationName: 'Austin, TX',
      locationId: 4585,
      defaultLocation: false
    },
    {
      unrestrictedAdmin: true,
      locationName: 'Philadelphia, PA',
      locationId: 4559,
      defaultLocation: true
    },
    {
      unrestrictedAdmin: true,
      locationName: 'Austin, TX',
      locationId: 4585,
      defaultLocation: false
    }
  ],
  totalPages: 2
}

export const expectedRestrictedAllowedLocationsData = {
  content: [
    {
      locationName: 'Philadelphia, PA',
      locationId: 4559,
      defaultLocation: true
    },
    {
      locationName: 'Austin, TX',
      locationId: 4585,
      defaultLocation: false
    },
    {
      locationName: 'Philadelphia, PA',
      locationId: 4559,
      defaultLocation: true
    },
    {
      locationName: 'Austin, TX',
      locationId: 4585,
      defaultLocation: false
    }
  ],
  totalPages: 2
}

export const permissions = {
  permissions: {
    featurePermissions: [
      {
        permissionName: 'FirstPermission',
        displayName: 'First Permission',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'SecondOne',
        displayName: 'Second One',
        permissionEffect: 'ALLOW',
        accessible: true
      }
    ],
    userPermissions: [
      {
        permissionName: 'TruePermission',
        displayName: 'True Permission',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'FalsePermission',
        displayName: 'False Permission',
        permissionEffect: 'DENY',
        accessible: false
      }
    ]
  }
}

export const parsedPermissions = {
  feature: permissions.permissions.featurePermissions,
  user: permissions.permissions.userPermissions
}
export const dynamicTags = {
  locationId: 4585,
  labelGroup: [{
    label: 'Recipient',
    sortOrder: 1,
    dynamicTags: [
      { name: 'First Name',
        dynamicTag: '{{recipient-first}}',
        tagSortOrder: 1
      },
      { name: 'Last Name',
        dynamicTag: '{{recipient-last}}',
        tagSortOrder: 2
      }
    ]
  }]
}
export const dynamicTagsState = [{
  name: 'Recipient',
  options: [{
    name: 'First Name',
    value: '{{recipient-first}}'
  },
  {
    name: 'Last Name',
    value: '{{recipient-last}}'
  }]
}]
