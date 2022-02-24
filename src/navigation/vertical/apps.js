// ** Icons Import
import { Mail, Users, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Home, PlusCircle, List } from 'react-feather'

export default [
 
  {
    id: 'floors',
    title: 'Floor Informations',
    icon: <img height={35} width={35} src='data:image/png;base64,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' />,
    children: [
      {
        id: 'list',
        title: 'Floor List',
        icon: <List size={12} />,
        navLink: '/apps/floor/listFloors'

      },
      {
        id: 'view',
        title: 'Add Floor',
        icon: <></>,

      }
    ]
  },
  {
    id: 'units',
    title: 'Units Informations',
    icon: <img height={35} width={35} src='https://cdn-icons-png.flaticon.com/512/1973/1973300.png'/>,

    children: [
      {
        id: 'list',
        title: 'Units List',
        icon: <List size={12} />,
        navLink: '/apps/units/listUnits'

      },
      {
        id: 'view',
        title: 'Add Unit',
        icon:<Home size={48} color="blue" />,
      }
    ]
  },
  {
    id: 'owners',
    title: 'Owner Informations',
    icon: <img height={35} width={35} src='https://cdn-icons-png.flaticon.com/128/2361/2361731.png'/>,
    children: [
      {
        id: 'liste',
        title: 'List Owners',
        icon: <List size={14} />,
        navLink: '/apps/user/list'

      },
      {
        id: 'viewOwner',
        title: 'Add Owner',
        icon: <PlusCircle size={14} />,
        navLink: '/apps/user/view'

      }
    ]
  },
  {
    id: 'employess',
    title: 'Employees Informations',
    icon: <img height={35} width={35} src='https://cdn-icons-png.flaticon.com/512/1869/1869679.png' />,
    children: [
      {
        id: 'liste',
        title: 'List Employees',
        icon: <List size={14} />,
        navLink: '/apps/employee/list'

      },
      {
        id: 'viewOwner',
        title: 'Add Employee',
        icon: <PlusCircle size={14} />,
        navLink: '/apps/user/view'

      }
    ]
  },
  {
    id: 'tenants',
    title: 'Tenant Informations',
    icon: <img height={35} width={35} src='https://uxwing.com/wp-content/themes/uxwing/download/06-buildings-architecture-real-estate/tenant.png' />,
    children: [
      {
        id: 'listTenants',
        title: 'List Tenants',
        icon: <List size={14} />,
      },
      {
        id: 'viewTenant',
        title: 'Add Tenant',
        icon: <PlusCircle size={14} />,
      }
    ]
  },
  {
    id: 'email',
    title: 'Email',
    icon: <Mail size={20} />,
    navLink: '/apps/email'
  },
  {
    id: 'chat',
    title: 'Chat',
    icon: <MessageSquare size={20} />,
    navLink: '/apps/chat'
  },
  {
    id: 'todo',
    title: 'Todo',
    icon: <CheckSquare size={20} />,
    navLink: '/apps/todo'
  },
  {
    id: 'calendar',
    title: 'Calendar',
    icon: <Calendar size={20} />,
    navLink: '/apps/calendar'
  },
  {
    id: 'invoiceApp',
    title: 'Invoice',
    icon: <FileText size={20} />,
    children: [
      {
        id: 'invoiceList',
        title: 'List',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/list'
      },
      {
        id: 'invoicePreview',
        title: 'Preview',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/preview'
      },
      {
        id: 'invoiceEdit',
        title: 'Edit',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/edit'
      },
      {
        id: 'invoiceAdd',
        title: 'Add',
        icon: <Circle size={12} />,
        navLink: '/apps/invoice/add'
      }
    ]
  },

  {
    id: 'roles-permissions',
    title: 'Roles & Permissions',
    icon: <Shield size={20} />,
    children: [
      {
        id: 'roles',
        title: 'Roles',
        icon: <Circle size={12} />,
        navLink: '/apps/roles'
      },
      {
        id: 'permissions',
        title: 'Permissions',
        icon: <Circle size={12} />,
        navLink: '/apps/permissions'
      }
    ]
  },
  {
    id: 'eCommerce',
    title: 'eCommerce',
    icon: <ShoppingCart size={20} />,
    children: [
      {
        id: 'shop',
        title: 'Shop',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/shop'
      },
      {
        id: 'detail',
        title: 'Details',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/product-detail'
      },
      {
        id: 'wishList',
        title: 'Wish List',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/wishlist'
      },
      {
        id: 'checkout',
        title: 'Checkout',
        icon: <Circle size={12} />,
        navLink: '/apps/ecommerce/checkout'
      }
    ]
  }
 
 
]
