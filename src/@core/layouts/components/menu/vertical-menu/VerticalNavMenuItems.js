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


const VerticalMenuNavItems = props => {
  
  const it=window.localStorage.getItem('user_type')
 
  // ** Components Object
  const Components = {
    VerticalNavMenuLink,
    VerticalNavMenuGroup,
    VerticalNavMenuSectionHeader
  }
  

  // ** Render Nav Menu Items
  const RenderNavItems = props.items.map((item, index) => {

    if(it == 'a' &&  item.menu_admin=='1'  ||it == 'S' &&  item.menu_superuser=='1' 
    || it == 'o' && item.menu_owner == '1')
   
  {  const TagName = Components[resolveNavItemComponent(item)]
    if (item.children )  {
      return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.menu_id}{...props} />
    }
    return canViewMenuItem(item) && <TagName key={item.menu_id || item.header} item={item} {...props} />
   } })
 
  
  return RenderNavItems
  
  
}

export default VerticalMenuNavItems
