// ** Vertical Menu Components
import VerticalNavMenuLink from './VerticalNavMenuLink'
import VerticalNavMenuGroup from './VerticalNavMenuGroup'
import VerticalNavMenuSectionHeader from './VerticalNavMenuSectionHeader'

// ** Utils
import {
  canViewMenuItem,
  canViewMenuGroup,
  resolveVerticalNavMenuItemComponent as resolveNavItemComponent
} from '@layouts/utils'
import { useEffect, useState } from 'react'
import { isUserLoggedIn } from '@utils'

import axios from 'axios'

const VerticalMenuNavItems = props => {
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT
  const [userData, setUserData] = useState(null)
 const timeout=(ms)=>{
    return new Promise((resolve) =>setTimeout(resolve(), ms))
  }

  const getUser = async()=>{
    await timeout(1000)
    if (isUserLoggedIn() !== null) {
    axios.get(`${API_ENDPOINT}/api/auth/user`).then(response => {
      setUserData(response.data)
  } )}}
  useEffect(() => {
    getUser(); 
  },[])
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }
  

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {
    if(userData && userData.user_type == 'a' &&  item.menu_admin=='1'  ||userData && userData.user_type == 'S' &&  item.menu_superuser=='1' 
    || userData && userData.user_type == 'o' && item.menu_owner == '1')
   
  {  const TagName = Components[resolveNavItemComponent(item)]
    if (item.children )  {
      return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.menu_id}{...props} />
    }
    return canViewMenuItem(item) && <TagName key={item.menu_id || item.header} item={item} {...props} />
   } })
 
  
  return RenderNavItems
  
  
}

export default VerticalMenuNavItems
