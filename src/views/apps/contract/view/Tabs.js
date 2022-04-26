// ** React Imports
import { Fragment } from 'react'

// ** Reactstrap Imports
import { Nav, NavItem, NavLink, TabContent, TabPane } from 'reactstrap'

// ** Icons Imports
import { User, Lock, Bookmark, Bell, Link } from 'react-feather'

// ** User Components

import UserProjectsList from './UserProjectsList'

const UserTabs = ({ active, toggleTab }) => {
  return (
    <Fragment>
 
      <TabContent activeTab={active}>
        <TabPane tabId='1'>
          <UserProjectsList />
        </TabPane>
        
      </TabContent>
    </Fragment>
  )
}
export default UserTabs
