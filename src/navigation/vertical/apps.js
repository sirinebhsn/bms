// ** Icons Import
import { Mail, Users, MessageSquare, CheckSquare, Calendar, FileText, Circle, ShoppingCart, User, Shield, Home, PlusCircle, List } from 'react-feather'

export default [
 
  {
    id: 'floors',
    title: 'Floor Informations',
    icon: <Home size={48} color="blue" />,
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
        icon: <PlusCircle size={24} />,

      }
    ]
  },
  {
    id: 'units',
    title: 'Units Informations',
    icon: <Home size={48} color="blue" />,
    navLink: '/apps/units/listUnits'

  },
  {
    id: 'owners',
    title: 'Owner Informations',
    icon: <User size={48} color="blue" />,
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
    id: 'tenants',
    title: 'Tenant Informations',
    icon: <Users size={48} color="blue" />,
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
