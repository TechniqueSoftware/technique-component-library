import { key } from '../../redux'

export const state = {
  global: {
    loading: false,
    error: {},
    user: {
      userId: 136951500,
      clubId: 659,
      locationId: 4559,
      role: {
        id: '3',
        name: 'Location Manager'
      },
      email: 'locationmanagerfive@yandex.com',
      homePhone: null,
      mobilePhone: null,
      workPhone: null,
      gender: 'F',
      firstName: 'location',
      lastName: 'managerfive',
      createdDate: '2018-08-06T07:48:16Z',
      birthDate: null,
      joinDate: '2018-08-06T02:48:16Z',
      deletedAt: null,
      deletedBy: null,
      updatedDate: '2021-07-13T07:50:15Z',
      updatedBy: null,
      source: null,
      salespersonId: null,
      trainerId: null,
      address: 35651412,
      unrestrictedAdmin: false
    },
    delegated: {
      userId: 136951500,
      clubId: 659,
      locationId: 4559,
      role: {
        id: '3',
        name: 'Location Manager'
      },
      email: 'locationmanagerfive@yandex.com',
      homePhone: null,
      mobilePhone: null,
      workPhone: null,
      gender: 'F',
      firstName: 'location',
      lastName: 'managerfive',
      createdDate: '2018-08-06T07:48:16Z',
      birthDate: null,
      joinDate: '2018-08-06T02:48:16Z',
      deletedAt: null,
      deletedBy: null,
      updatedDate: '2021-07-13T07:50:15Z',
      updatedBy: null,
      source: null,
      salespersonId: null,
      trainerId: null,
      address: 35651412
    },
    club: {
      id: 659,
      name: 'Club OS QA',
      domainPrefix: 'quality',
      status: 'Active',
      smsEnabled: true
    },
    locations: [
      {
        locationName: 'Philadelphia, PA',
        locationId: 4559
      },
      {
        locationName: 'Mohali, India',
        locationId: 4560
      },
      {
        locationName: 'Austin, TX',
        locationId: 4585
      },
      {
        locationName: 'Jonas Compete Integrated',
        locationId: 5622
      },
      {
        locationName: 'OTF Demo',
        locationId: 6443
      },
      {
        locationName: 'Mystic',
        locationId: 6828
      }
    ],
    selectedLocation: {
      name: 'Club OS QA',
      value: 659,
      clubId: 659,
      isClub: true
    },
    permissions: [
      {
        permissionName: 'EmailCampaignAction',
        displayName: 'Email Campaigns',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'EmailCampaignSendFromAnyEmailAction',
        displayName: 'Send Campaigns from Any Email Address',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'BulkSmsCampaignAction',
        displayName: 'Bulk Text Campaigns',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'ScheduleAction',
        displayName: 'Schedule',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'ClubServicesAction',
        displayName: 'Club Services',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'WorkoutsAction',
        displayName: 'Workouts',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageManagementAction',
        displayName: 'Package Management',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageManagementMembershipsAction',
        displayName: 'Memberships in Packages',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageManagementMarketingBulletsAction',
        displayName: 'Marketing Bullets in Packages',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageBillingAction',
        displayName: 'Package Billing',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageBillingCashCheckForRecurringAction',
        displayName: 'Cash/Check for Recurring Payments',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageBillingPackageDiscountsAction',
        displayName: 'Package Discounts',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'SelfServiceApplicationAction',
        displayName: 'Self Service Application',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PerformanceAnalyticsAction',
        displayName: 'Performance Analytics',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'MembershipAgreementAnalyticsAction',
        displayName: 'Membership Agreement Analytics',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'TextUsageAnalyticsAction',
        displayName: 'Text Usage Analytics',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'AutomaticFollowUpAction',
        displayName: 'Automatic Follow-ups',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'NewFollowUpSchedulesAndScriptsAction',
        displayName: 'New Follow-Up Schedules & Scripts Page',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'MessagingCampaignAnalyticsAction',
        displayName: 'Messaging Campaign Analytics',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'DesignateEmailCampaignSendTimeAction',
        displayName: 'Designate Email Campaign Send Time',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'ImprovedPtFollowUpWorkflowAction',
        displayName: 'Improved PT Follow-up Workflow',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'LeadManagementAction',
        displayName: 'Lead Management',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'LeadManagementDuplicateProspectsAtDifferentLocationAction',
        displayName: 'Create Duplicate Prospect if Matching Prospect Exists at Different Location',
        permissionEffect: 'DENY',
        accessible: false
      },
      {
        permissionName: 'LeadManagementDuplicateInactiveMembersAtDifferentLocationAction',
        displayName: 'Create Duplicate Prospect if Matching Inactive Member Exists at Different Location',
        permissionEffect: 'DENY',
        accessible: false
      },
      {
        permissionName: 'LeadManagementDuplicateActiveMembersAtDifferentLocationAction',
        displayName: 'Create Duplicate Prospect if Matching Active Member Exists at Different Location',
        permissionEffect: 'DENY',
        accessible: false
      },
      {
        permissionName: 'LeadManagementFacebookLeadAdsAction',
        displayName: 'Facebook Lead Ads Integration',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'NutritionAction',
        displayName: 'Nutrition',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'FitnessProfileAction',
        displayName: 'Fitness Profile',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PackageDiscountLocationLevelControlAction',
        displayName: 'Location-Level Discount Controls',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PitchBuilderAction',
        displayName: 'Pitch Builder (legacy)',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'PitchSetupCodeAction',
        displayName: 'Pitch (alpha access)',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'GuestPassAnalyticsAction',
        displayName: 'Guest Pass Analytics',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'ReInterestedLeadsAction',
        displayName: 'Re-Interested Leads',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'ReInterestedInactiveMembersAction',
        displayName: 'Re-Interested Inactive Members',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'SyncOfMemberCommunicationDataFromAbc',
        displayName: 'Sync of Member Communication Data from ABC',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'ImprovedTiEntryAction',
        displayName: 'Improved TI Entry',
        permissionEffect: 'ALLOW',
        accessible: true
      },
      {
        permissionName: 'DoNotCallAction',
        displayName: 'Do Not Call Phone Number Validation',
        permissionEffect: 'DEFER',
        accessible: false
      }
    ]
  },
  [key]: {
    errors: [],
    appointmentEnabled: false,
    form: {
      locationSelect: {
        type: 'select',
        label: 'Location',
        value: {
          value: 4559,
          name: 'Philadelphia, PA'
        },
        error: '',
        required: true,
        relatedField: null,
        validated: true
      },
      firstName: {
        type: 'text',
        label: 'First Name',
        value: 'Test',
        error: '',
        required: true,
        relatedField: null,
        validated: true
      },
      lastName: {
        type: 'text',
        label: 'Last Name',
        value: 'ApptTime120',
        error: '',
        required: true,
        relatedField: null,
        validated: true
      },
      email: {
        type: 'email',
        label: 'Email',
        value: 'testappttime120@aol.com',
        error: '',
        required: false,
        relatedField: 'mobilePhone',
        validated: true
      },
      mobilePhone: {
        type: 'phone',
        label: 'Phone',
        value: '',
        error: '',
        required: false,
        relatedField: 'email',
        validated: true
      },
      contact: {
        type: 'select',
        label: 'With',
        value: {
          availability: [],
          value: 136951500,
          name: 'location managerfive'
        },
        error: '',
        required: false,
        relatedField: null,
        validated: true
      },
      date: {
        type: 'date',
        label: 'Date',
        value: '2022-10-17',
        error: '',
        required: false,
        relatedField: null,
        validated: true
      },
      time: {
        type: 'select',
        label: 'Time',
        value: {
          value: '2022-10-17T16:00:00Z',
          name: '12:00 AM'
        },
        error: '',
        required: false,
        relatedField: null,
        validated: true
      }
    },
    tiScript: {
      value: '<p>This is for test</p>'
    },
    response: {},
    locationData: {
      clubId: 659,
      locationId: 4559,
      externalIds: ['123444'],
      name: 'Philadelphia, PA',
      smsEnabled: true,
      timeZone: 'America/New_York'
    },
    locationEmployees: [
      {
        userId: 168521407,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: 'sergey@thiessentech.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'ALF',
        lastName: 'Trainer',
        createdDate: '2021-07-27T16:09:31Z',
        birthDate: null,
        joinDate: '2021-07-27T12:09:31Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 80989621
      },
      {
        userId: 136951517,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'club4dminsix@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'F',
        firstName: 'club',
        lastName: 'adminsix',
        createdDate: '2018-08-06T08:07:22Z',
        birthDate: null,
        joinDate: '2018-08-06T03:07:22Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-02-12T14:08:56Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651429
      },
      {
        userId: 136951515,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'asrinivas@beesolvertechnology.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'club',
        lastName: 'adminfive',
        createdDate: '2018-08-06T08:04:36Z',
        birthDate: null,
        joinDate: '2018-08-06T03:04:36Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-06-22T10:42:46Z',
        updatedBy: 136951515,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651427
      },
      {
        userId: 136951513,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'club4dminfour@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'club',
        lastName: 'adminfour',
        createdDate: '2018-08-06T08:02:27Z',
        birthDate: null,
        joinDate: '2018-08-06T03:02:27Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-05-15T10:52:23Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651425
      },
      {
        userId: 152140005,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'mking152@gmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'ClubOS',
        lastName: 'King',
        createdDate: '2019-09-25T18:23:16Z',
        birthDate: null,
        joinDate: '2019-09-25T13:23:16Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2019-11-26T16:57:50Z',
        updatedBy: 152140005,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 56764690
      },
      {
        userId: 172229101,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'connor.delee@asfpaymentsolutions.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Connor',
        lastName: 'DeLee',
        createdDate: '2022-03-18T18:46:24Z',
        birthDate: null,
        joinDate: '2022-03-18T14:46:24Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2022-05-02T15:43:54Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 85053439
      },
      {
        userId: 162467632,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'nhahn+dk@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Digital Kozak',
        lastName: 'Test',
        createdDate: '2020-11-19T01:13:14Z',
        birthDate: null,
        joinDate: '2020-11-18T20:13:14Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-09-17T15:53:14Z',
        updatedBy: 140406925,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 74177980
      },
      {
        userId: 142731888,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'esegall@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'ed',
        lastName: 'club admin',
        createdDate: '2018-12-20T16:50:41Z',
        birthDate: null,
        joinDate: '2018-12-20T08:50:41Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-10-22T16:41:05Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 41825993
      },
      {
        userId: 158714015,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'allenbarry2153732@yopmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Fast2153732',
        lastName: 'Barry2153732',
        createdDate: '2020-03-27T08:28:18Z',
        birthDate: null,
        joinDate: '2020-03-27T03:28:18Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 68698809
      },
      {
        userId: 158714011,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'allenbarry499028@yopmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Fast499028',
        lastName: 'Barry499028',
        createdDate: '2020-03-27T07:57:49Z',
        birthDate: null,
        joinDate: '2020-03-27T02:57:49Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 68698802
      },
      {
        userId: 158714012,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'allenbarry581572@yopmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Fast581572',
        lastName: 'Barry581572',
        createdDate: '2020-03-27T08:04:45Z',
        birthDate: null,
        joinDate: '2020-03-27T03:04:45Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 68698806
      },
      {
        userId: 158714016,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'allenbarry585398@yopmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Fast585398',
        lastName: 'Barry585398',
        createdDate: '2020-03-27T08:30:13Z',
        birthDate: null,
        joinDate: '2020-03-27T03:30:13Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 68698810
      },
      {
        userId: 136951465,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '5',
          name: 'Front Desk'
        },
        email: 'frontdesksix@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'front',
        lastName: 'desksix',
        createdDate: '2018-08-06T07:16:08Z',
        birthDate: null,
        joinDate: '2018-08-06T02:16:08Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-01-29T13:22:31Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651382
      },
      {
        userId: 136951463,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '5',
          name: 'Front Desk'
        },
        email: 'frontdeskfive@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'F',
        firstName: 'front',
        lastName: 'deskfive',
        createdDate: '2018-08-06T07:14:06Z',
        birthDate: null,
        joinDate: '2018-08-06T02:14:06Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-01-12T21:11:27Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651380
      },
      {
        userId: 155782034,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'KatieKAdmin@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'KatieKAdmin',
        lastName: 'KatieKAdmin',
        createdDate: '2020-01-08T15:41:10Z',
        birthDate: null,
        joinDate: '2020-01-08T10:41:10Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-10-05T20:50:47Z',
        updatedBy: 107058574,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 63767738
      },
      {
        userId: 157103382,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'KatieKAdmin3',
        lastName: 'KatieKAdmin3',
        createdDate: '2020-02-04T19:08:37Z',
        birthDate: null,
        joinDate: '2020-02-04T14:08:37Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2022-06-21T12:10:20Z',
        updatedBy: 157103382,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 65734439
      },
      {
        userId: 136951504,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: 'locationmanagersix@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'F',
        firstName: 'location',
        lastName: 'managersix',
        createdDate: '2018-08-06T07:51:22Z',
        birthDate: null,
        joinDate: '2018-08-06T02:51:22Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-01-29T13:12:52Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651416
      },
      {
        userId: 136951500,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: 'locationmanagerfive@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'F',
        firstName: 'location',
        lastName: 'managerfive',
        createdDate: '2018-08-06T07:48:16Z',
        birthDate: null,
        joinDate: '2018-08-06T02:48:16Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-07-13T07:50:15Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651412
      },
      {
        userId: 169129229,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Matt',
        lastName: 'Higgins',
        createdDate: '2021-09-01T22:00:28Z',
        birthDate: null,
        joinDate: '2021-09-01T16:00:28Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 81669864
      },
      {
        userId: 152139909,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: 'mking+lm@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Melissa',
        lastName: 'King',
        createdDate: '2019-09-25T18:18:28Z',
        birthDate: null,
        joinDate: '2019-09-25T13:18:28Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-03-26T20:22:19Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 56764388
      },
      {
        userId: 161661446,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'mking+sales@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Missy',
        lastName: 'Sale',
        createdDate: '2020-10-02T16:51:17Z',
        birthDate: null,
        joinDate: '2020-10-02T12:51:17Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-10-02T15:07:51Z',
        updatedBy: 161661446,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 73038319
      },
      {
        userId: 161661764,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Missy',
        lastName: 'LM',
        createdDate: '2020-10-02T17:13:51Z',
        birthDate: null,
        joinDate: '2020-10-02T13:13:51Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 73038669
      },
      {
        userId: 137410808,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'kklochan@club-os.com',
        homePhone: null,
        mobilePhone: '7089021047',
        workPhone: null,
        gender: 'M',
        firstName: 'Monsieur',
        lastName: 'Croissant',
        createdDate: '2018-08-23T15:36:05Z',
        birthDate: null,
        joinDate: '2018-08-23T10:36:05Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2018-12-06T15:24:56Z',
        updatedBy: 126250889,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 36092323
      },
      {
        userId: 140653796,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: 'danielostester2@gmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'new',
        lastName: 'duderson',
        createdDate: '2018-11-20T14:53:54Z',
        birthDate: null,
        joinDate: '2018-11-20T09:53:54Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 39579030
      },
      {
        userId: 140653784,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '3',
          name: 'Location Manager'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'new',
        lastName: 'guy',
        createdDate: '2018-11-20T14:53:01Z',
        birthDate: null,
        joinDate: '2018-11-20T09:53:01Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 39579014
      },
      {
        userId: 164658621,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'sergiy.vasyletskyy@gmail.com',
        homePhone: null,
        mobilePhone: '9516421176',
        workPhone: null,
        gender: 'M',
        firstName: 'Phil',
        lastName: 'Adelphia',
        createdDate: '2021-03-26T19:40:53Z',
        birthDate: null,
        joinDate: '2021-03-26T15:40:53Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2022-06-21T21:17:58Z',
        updatedBy: 164215152,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 76942957
      },
      {
        userId: 150827709,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'phillyandaustin@test.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Philly and',
        lastName: 'Austin',
        createdDate: '2019-08-15T20:26:29Z',
        birthDate: null,
        joinDate: '2019-08-15T15:26:29Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 54341393
      },
      {
        userId: 139203301,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'PHISmokeTester',
        lastName: 'CR398',
        createdDate: '2018-10-18T14:26:11Z',
        birthDate: null,
        joinDate: '2018-10-18T09:26:11Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-04-06T19:47:00Z',
        updatedBy: 126250889,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 37996224
      },
      {
        userId: 136840117,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '6',
          name: 'Trainer'
        },
        email: 'trainer@example.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'QATest',
        lastName: 'Trainer',
        createdDate: '2018-08-01T19:02:10Z',
        birthDate: null,
        joinDate: '2018-08-01T14:02:10Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35541169
      },
      {
        userId: 173535672,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'qa.admin.restricted.philly@gmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Restricted Admin',
        lastName: 'Philly',
        createdDate: '2022-06-21T13:47:35Z',
        birthDate: null,
        joinDate: '2022-06-21T07:47:35Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 86483890
      },
      {
        userId: 139306398,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'daniel.dri1@gmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Restricted To',
        lastName: 'Philly Only',
        createdDate: '2018-10-22T14:14:02Z',
        birthDate: null,
        joinDate: '2018-10-22T10:14:02Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2022-06-21T13:50:57Z',
        updatedBy: 137735510,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 38113139
      },
      {
        userId: 158671388,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'RichaAdmin659',
        lastName: 'Chawla',
        createdDate: '2020-03-18T04:34:25Z',
        birthDate: null,
        joinDate: '2020-03-17T23:34:25Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 68392343
      },
      {
        userId: 136951480,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'salespersonfive@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'F',
        firstName: 'sales',
        lastName: 'personfive',
        createdDate: '2018-08-06T07:32:24Z',
        birthDate: null,
        joinDate: '2018-08-06T02:32:24Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-01-12T21:10:07Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651395
      },
      {
        userId: 105742295,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'c2577173@urhen.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Sales',
        lastName: 'Driver',
        createdDate: '2015-05-28T15:14:22Z',
        birthDate: null,
        joinDate: '2015-05-28T10:14:22Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2019-09-25T19:16:51Z',
        updatedBy: 105446346,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 5524201
      },
      {
        userId: 136951475,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'salespersonthree@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'sales',
        lastName: 'personthree',
        createdDate: '2018-08-06T07:25:36Z',
        birthDate: null,
        joinDate: '2018-08-06T02:25:36Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-07-23T12:59:51Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651392
      },
      {
        userId: 136951483,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'salespersonsix@yandex.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'sales',
        lastName: 'personsix',
        createdDate: '2018-08-06T07:37:50Z',
        birthDate: null,
        joinDate: '2018-08-06T02:37:49Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-01-13T15:27:17Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651398
      },
      {
        userId: 162457881,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'Anastasia.Singletary@Mckesson.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Tasha',
        lastName: 'Singletary',
        createdDate: '2020-11-18T19:03:09Z',
        birthDate: null,
        joinDate: '2020-11-18T11:03:09Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-11-18T19:03:46Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 74164131
      },
      {
        userId: 169128723,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'test',
        lastName: '3366',
        createdDate: '2021-09-01T21:32:19Z',
        birthDate: null,
        joinDate: '2021-09-01T17:32:19Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 81669380
      },
      {
        userId: 160191137,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '5',
          name: 'Front Desk'
        },
        email: 'demo@123.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Testing',
        lastName: 'AF1234',
        createdDate: '2020-07-09T07:18:20Z',
        birthDate: null,
        joinDate: '2020-07-09T02:18:20Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-03-12T14:30:44Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 70874587
      },
      {
        userId: 160436564,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'asrinivas@nn.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Testing',
        lastName: 'QA',
        createdDate: '2020-07-24T05:33:59Z',
        birthDate: null,
        joinDate: '2020-07-24T00:33:59Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-06-02T03:43:57Z',
        updatedBy: 132551911,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 71223268
      },
      {
        userId: 149646070,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'testuser@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'testuser',
        lastName: 'test',
        createdDate: '2019-07-12T15:00:25Z',
        birthDate: null,
        joinDate: '2019-07-12T11:00:25Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 52287975
      },
      {
        userId: 136951511,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '2',
          name: 'Club Admin'
        },
        email: 'shill@club-os.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Trainer',
        lastName: 'Timothy',
        createdDate: '2018-08-06T07:57:22Z',
        birthDate: null,
        joinDate: '2018-08-06T02:57:22Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-10-13T17:56:48Z',
        updatedBy: 136951511,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651423
      },
      {
        userId: 136951398,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '6',
          name: 'Trainer'
        },
        email: 'trainerfivefive@gmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'F',
        firstName: 'Trainer',
        lastName: 'Five',
        createdDate: '2018-08-06T06:20:40Z',
        birthDate: null,
        joinDate: '2018-08-06T01:20:40Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2021-01-29T13:26:28Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651318
      },
      {
        userId: 136951405,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '6',
          name: 'Trainer'
        },
        email: 'trainer.six@rediffmail.com',
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Trainer',
        lastName: 'Six',
        createdDate: '2018-08-06T06:25:28Z',
        birthDate: null,
        joinDate: '2018-08-06T01:25:28Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2020-01-21T07:37:15Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 35651325
      },
      {
        userId: 154110547,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '6',
          name: 'Trainer'
        },
        email: null,
        homePhone: null,
        mobilePhone: null,
        workPhone: null,
        gender: 'M',
        firstName: 'Trainer',
        lastName: 'Performerone',
        createdDate: '2019-11-29T07:27:46Z',
        birthDate: null,
        joinDate: '2019-11-29T01:27:46Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: '2019-11-29T07:39:09Z',
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 60667961
      },
      {
        userId: 158776194,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '4',
          name: 'Salesperson'
        },
        email: 'vrainskvjgh26@gmail.com',
        homePhone: null,
        mobilePhone: '15417543010',
        workPhone: null,
        gender: 'M',
        firstName: 'Virendra',
        lastName: 'S.',
        createdDate: '2020-04-21T08:30:24Z',
        birthDate: '1995-05-25T00:00:00.000+0000',
        joinDate: '2020-04-21T04:30:24Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 69119079
      },
      {
        userId: 158776190,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '6',
          name: 'Trainer'
        },
        email: 'vrainsingh26@gmail.com',
        homePhone: null,
        mobilePhone: '15417543010',
        workPhone: null,
        gender: 'M',
        firstName: 'Virendra',
        lastName: 'Singh',
        createdDate: '2020-04-21T08:10:16Z',
        birthDate: '1995-05-25T00:00:00.000+0000',
        joinDate: '2020-04-21T04:10:16Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 69119015
      },
      {
        userId: 158776191,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '5',
          name: 'Front Desk'
        },
        email: 'vrainsin26@gmail.com',
        homePhone: null,
        mobilePhone: '15417543010',
        workPhone: null,
        gender: 'M',
        firstName: 'Virendra s.',
        lastName: 'Singh',
        createdDate: '2020-04-21T08:20:03Z',
        birthDate: '1995-05-25T00:00:00.000+0000',
        joinDate: '2020-04-21T04:20:03Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 69119043
      },
      {
        userId: 158776192,
        clubId: 659,
        locationId: 4559,
        role: {
          id: '6',
          name: 'Trainer'
        },
        email: 'vrainsgh26@gmail.com',
        homePhone: null,
        mobilePhone: '15417543010',
        workPhone: null,
        gender: 'M',
        firstName: 'Vrain-singh',
        lastName: 'Singh',
        createdDate: '2020-04-21T08:25:19Z',
        birthDate: '1995-05-25T00:00:00.000+0000',
        joinDate: '2020-04-21T04:25:19Z',
        deletedAt: null,
        deletedBy: null,
        updatedDate: null,
        updatedBy: null,
        source: null,
        salespersonId: null,
        trainerId: null,
        address: 69119056
      }
    ]
  }
}

export const mockData = {
  field: {
    name: 'firstName',
    data: {
      value: 'Geoff',
      error: '',
      validated: true
    }
  },
  constant: {
    clubId: 659,
    salespersonId: 132763659
  },
  locationReset: {
    locationId: 659
  },
  existingUser: 172195379,
  userResponse: {
    userId: 172195379,
    clubId: 659,
    locationId: 4559,
    locationAccess: [],
    role: {
      id: 99,
      name: 'Prospect'
    },
    email: 'gkpeel@gmail.com',
    homePhone: null,
    mobilePhone: 9088124012,
    workPhone: null,
    gender: 'M',
    firstName: 'Geoff',
    lastName: 'Peel',
    createdDate: '2022-04-22T14:42:51Z',
    birthDate: null,
    joinDate: null,
    deletedAt: null,
    deletedBy: null,
    updatedDate: null,
    updatedBy: null,
    source: 'T.I.',
    salespersonId: 775565995,
    trainerId: null,
    address: null
  },
  employeesData: [
    {
      userId: 10,
      clubId: 659,
      locationId: 4559,
      gender: 'M',
      firstName: 'Diego',
      lastName: 'Maradona',
      availability: [{ startTime: '2022-04-22T14:00:00Z' }]
    },
    {
      userId: 1011,
      clubId: 659,
      locationId: 4559,
      gender: 'M',
      firstName: 'Jerry',
      lastName: 'Seinfeld',
      availability: [{ startTime: '2022-04-22T14:15:00Z' }]
    },
    {
      userId: 1033,
      clubId: 659,
      locationId: 4559,
      gender: 'M',
      firstName: 'George',
      lastName: 'Costanza',
      availability: [{ startTime: '2022-04-22T14:30:00Z' }]
    }
  ],
  ownEmployeeData: {
    userId: 10,
    firstName: 'Diego',
    lastName: 'Maradona',
    availability: [{ startTime: '2022-04-22T14:00:00Z' }]
  },
  locationData: {
    content: [
      {
        name: 'Test Location',
        locationId: 4000
      }
    ]
  },
  scriptData: {
    script: '<p>This is a test script</p>'
  }
}

export const mockResponse = {
  success: {
    userId: 172195380,
    clubId: 659,
    locationId: 4559,
    locationAccess: null,
    role: {
      id: '99',
      name: 'Prospect'
    },
    email: 'ti422@aol.com',
    homePhone: null,
    mobilePhone: null,
    workPhone: null,
    gender: 'M',
    firstName: 'Test',
    lastName: 'Inquiry422',
    createdBy: 132763659,
    createdDate: '2022-04-22T15:29:53.055399Z',
    birthDate: null,
    joinDate: null,
    deletedAt: null,
    deletedBy: null,
    updatedDate: null,
    updatedBy: null,
    source: 'T.I.',
    userName: null,
    address: null,
    externalSystemIds: [],
    barcode: null,
    timeZone: 'America/New_York',
    emailOptOut: true,
    smsOptOut: true,
    profilePicHash: null,
    userOrigin: {
      originId: 2,
      originName: 'T.I.'
    },
    referredBy: null,
    submissionPoint: 2,
    salespersonId: 132763659,
    trainerId: null,
    interests: [],
    ptFollowupStatus: null,
    membershipFollowupStatus: null,
    sendResponseEmails: false,
    eventReminderMethod: null,
    status: 202,
    code: 'SUCCESS'
  },
  localError: {
    'First Name': 'This field is required',
    'Last Name': 'This field is required',
    Email: 'Please provide an email or phone number',
    Phone: 'Please provide an email or phone number',
    status: 400,
    code: 'FORM_SUBMISSION_ERROR'
  },
  duplicateUser: {
    status: 400,
    code: 'DUPLICATE_USER',
    user: 172195379
  },
  backEndError: {
    timestamp: '2022-04-06T15:05:54.903+0000',
    status: 'BAD_REQUEST',
    error: 'Bad Request',
    messages: {
      code: "(CONN=6594969) DATA TOO LONG FOR COLUMN 'FIRST_NAME' AT ROW 1",
      message: 'could not execute statement'
    }
  },
  modifiedBackEndError: {
    code: 'BAD_REQUEST',
    error: 'Bad Request',
    message: 'First name cannot exceed 50 characters',
    status: 400
  }
}

export const apptResponse = {
  test: 'test'
}
