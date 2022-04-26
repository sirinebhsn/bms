import mock from '../mock'
export const searchArr = [
  {
    groupTitle: 'Pages',
    searchLimit: 4,
    data: [
      {
        id: 1,
        target: 'analyticsDash',
        isBookmarked: false,
        title: 'Dashboard',
        icon: 'Home',
        link: '/dashboard'
      },
      {
        id: 2,
        target: 'listFloor',
        isBookmarked: false,
        title: 'Floors List',
        icon: 'Home',
        link: '/floor/listFloors'
      },
      {
        id: 3,
        target: 'floors',
        isBookmarked: false,
        title: 'Add Floor',
        icon: 'Home',
        link: '/floor/view/1'
      },
      {
        id: 4,
        target: 'listUnit',
        isBookmarked: false,
        title: 'List Units',
        icon: 'Home',
        link: '/units/listUnits'
      },
      {
        id: 5,
        target: 'addUnit',
        isBookmarked: false,
        title: 'Add Unit',
        icon: 'Home',
        link: '/units/view/1'
      },
      {
        id: 6,
        target: 'users',
        isBookmarked: true,
        title: 'Users List',
        icon: 'User',
        link: '/user/list'
      },
      {
        id: 7,
        target: 'contract',
        isBookmarked: true,
        title: 'Add Contract',
        icon: 'FileText',
        link: '/apps/contract/view/1'
      },
      {
        id: 8,
        target: 'Tenant',
        isBookmarked: false,
        title: 'Tenant List',
        icon: 'Users',
        link: '/tenant/list'
      },
      {
        id: 9,
        target: 'profile',
        isBookmarked: false,
        title: 'Profile',
        icon: 'Layout',
        link: '/pages/profile'
      },
      {
        id: 10,
        target: 'complain',
        isBookmarked: false,
        title: 'Complain List',
        icon: 'Layout',
        link: '/complain/list'
      },
      {
        id: 11,
        target: 'visitor',
        isBookmarked: false,
        title: 'Visitor List',
        icon: 'Users',
        link: '/visitor/list'
      },




    ]
      },
  {
    groupTitle: 'Files',
    searchLimit: 4,
    data: [
      {
        title: 'Passport Image',
        by: 'Oliver Queen',
        size: '52kb',
        file: require('@src/assets/images/icons/jpg.png').default
      },
      {
        title: 'Parenting Guide',
        by: 'Alfred Pennyworth',
        size: '2.3mb',
        file: require('@src/assets/images/icons/doc.png').default
      },
      {
        title: 'Class Notes',
        by: 'Barry Allen',
        size: '30kb',
        file: require('@src/assets/images/icons/doc.png').default
      },
      {
        title: 'Class Attendance',
        by: 'Walter White',
        size: '52mb',
        file: require('@src/assets/images/icons/xls.png').default
      }
    ]
  },
  {
    groupTitle: 'Contacts',
    searchLimit: 4,
    data: [
      {
        title: 'Mia Davis',
        email: 'miadavis@teleworm.us',
        img: require('@src/assets/images/portrait/small/avatar-s-8.jpg').default,
        date: '01/03/2020'
      },
      {
        title: 'Norris Carrière',
        email: 'NorrisCarriere@rhyta.com',
        img: require('@src/assets/images/portrait/small/avatar-s-3.jpg').default,
        date: '07/03/2020'
      },
      {
        title: 'Charlotte Gordon',
        email: 'CharlotteGordon@jourrapide.com',
        img: require('@src/assets/images/portrait/small/avatar-s-26.jpg').default,
        date: '14/03/2020'
      },
      {
        title: 'Robert Nash',
        email: 'RobertNash@dayrep.com',
        img: require('@src/assets/images/portrait/small/avatar-s-25.jpg').default,
        date: '21/03/2020'
      }
    ]
  }
]

// GET Search Data
mock.onGet('/api/main-search/data').reply(() => {
  return [200, { searchArr }]
})

// GET Search Data & Bookmarks
mock.onGet('/api/bookmarks/data').reply(() => {
  const bookmarks = searchArr[0].data.filter(item => item.isBookmarked)
  const suggestions = searchArr[0].data
  return [200, { suggestions, bookmarks }]
})

// POST Update isBookmarked
mock.onPost('/api/bookmarks/update').reply(config => {
  const { id } = JSON.parse(config.data)

  const obj = searchArr[0].data.find(item => item.id === id)

  Object.assign(obj, { isBookmarked: !obj.isBookmarked })

  return [200]
})
