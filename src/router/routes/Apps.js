// ** React Imports
import { lazy } from 'react'
import { Redirect } from 'react-router-dom'

const AppRoutes = [

  {
    path: '/apps/email',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email'))
  },
  {
    path: '/apps/email/:folder',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/label/:label',
    exact: true,
    appLayout: true,
    className: 'email-application',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/email/:filter',
    component: lazy(() => import('../../views/apps/email')),
    meta: {
      navLink: '/apps/email'
    }
  },
  {
    path: '/apps/chat',
    appLayout: true,
    className: 'chat-application',
    component: lazy(() => import('../../views/apps/chat'))
  },
  {
    path: '/apps/todo',
    exact: true,
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo'))
  },
  {
    path: '/apps/todo/:filter',
    appLayout: true,
    exact: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/todo/tag/:tag',
    appLayout: true,
    className: 'todo-application',
    component: lazy(() => import('../../views/apps/todo')),
    meta: {
      navLink: '/apps/todo'
    }
  },
  {
    path: '/apps/calendar',
    component: lazy(() => import('../../views/apps/calendar'))
  },
  {
    path: '/apps/invoice/list',
    component: lazy(() => import('../../views/apps/invoice/list'))
  },
  {
    path: '/apps/invoice/preview/:id',
    component: lazy(() => import('../../views/apps/invoice/preview')),
    meta: {
      navLink: '/apps/invoice/preview'
    }
  },
  {
    path: '/apps/invoice/preview',
    exact: true,
    component: () => <Redirect to='/apps/invoice/preview/4987' />
  },
  {
    path: '/apps/invoice/edit/:id',
    component: lazy(() => import('../../views/apps/invoice/edit')),
    meta: {
      navLink: '/apps/invoice/edit'
    }
  },
  {
    path: '/apps/invoice/edit',
    exact: true,
    component: () => <Redirect to='/apps/invoice/edit/4987' />
  },
  {
    path: '/apps/invoice/add',
    component: lazy(() => import('../../views/apps/invoice/add'))
  },
  {
    path: '/apps/invoice/print',
    layout: 'BlankLayout',
    component: lazy(() => import('../../views/apps/invoice/print'))
  },
  {
    path: '/apps/ecommerce/shop',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/shop'))
  },
  {
    path: '/apps/ecommerce/wishlist',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/wishlist'))
  },
  {
    path: '/apps/ecommerce/product-detail',
    exact: true,
    className: 'ecommerce-application',
    component: () => <Redirect to='/apps/ecommerce/product-detail/apple-i-phone-11-64-gb-black-26' />
  },
  {
    path: '/apps/ecommerce/product-detail/:product',
    exact: true,
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/detail')),
    meta: {
      navLink: '/apps/ecommerce/product-detail'
    }
  },
  {
    path: '/apps/ecommerce/checkout',
    className: 'ecommerce-application',
    component: lazy(() => import('../../views/apps/ecommerce/checkout'))
  },
  {
    path: '/user/list',
    component: lazy(() => import('../../views/apps/user/list'))
  },
  {
    path: '/visitor/list',
    component: lazy(() => import('../../views/apps/visitor/list'))
  },
  {
    path: '/complain/list',
    component: lazy(() => import('../../views/apps/complain/list'))
  },
 
 
  {
    path: '/employee/list',
    component: lazy(() => import('../../views/apps/employee/list'))
  },
  {
    path: '/tenant/list',
    component: lazy(() => import('../../views/apps/tenant/list'))
  },
  {
    path: '/floor/listFloors',
    component: lazy(() => import('../../views/apps/floor/listFloors'))
  },
  {
    path: '/apps/floor/view',
    exact: true,
    component: () => <Redirect to='/apps/floor/view/1' />
  },
  {
    path: '/floor/view/:id',
    component: lazy(() => import('../../views/apps/floor/view')),
    meta: {
      navLink: '/floor/view'
    }
  },
  {
    path: '/units/listUnits',
    component: lazy(() => import('../../views/apps/units/listUnits'))
  },
  {
    path: '/apps/units/view',
    exact: true,
    component: () => <Redirect to='/apps/units/view/1' />
  },
  {
    path: '/units/view/:id',
    component: lazy(() => import('../../views/apps/units/view')),
    meta: {
      navLink: '/units/view'
    }
  },
  {
    path: '/complain/details/:compl_id',
    component: lazy(() => import('../../views/pages/pricing')),
    meta: {
      navLink: '/complain/details'
    }
  },

  {
    path: '/apps/user/view',
    exact: true,
    component: () => <Redirect to='/apps/user/view/1' />
  },
  {
    path: '/user/view/:id',
    component: lazy(() => import('../../views/apps/user/view')),
    meta: {
      navLink: '/user/view'
    }
  },
  


  
  

  {
    path: '/apps/buildings/view/:id',
    component: lazy(() => import('../../views/apps/buildings/view')),
    meta: {
      navLink: '/apps/buildings/view'
    }
  },
  {
    path: '/apps/buildings/view',
    component: lazy(() => import('../../views/apps/buildings/view')),
    meta: {
      navLink: '/buildings/view'
    }
  },
  {
    path: '/apps/contract/view',
    exact: true,
    component: () => <Redirect to='/apps/contract/view/1' />
  },
  {
    path: '/apps/contract/view/:id',
    component: lazy(() => import('../../views/apps/contract/view')),
    meta: {
      navLink: '/apps/contract/view'
    }
  },
  {
    path: '/apps/contract/view',
    component: lazy(() => import('../../views/apps/contract/view')),
    meta: {
      navLink: '/contract/view'
    }
  },
  {
    path: '/buildings/list',
    component: lazy(() => import('../../views/apps/buildings/list')),
    meta: {
      navLink: '/buildings/list'
    }
  },
  {
    path: '/apps/roles',
    component: lazy(() => import('../../views/apps/roles-permissions/roles'))
  },
  {
    path: '/apps/permissions',
    component: lazy(() => import('../../views/apps/roles-permissions/permissions'))
  }
]

export default AppRoutes
