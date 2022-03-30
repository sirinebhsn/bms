// ** Menu Components Imports
import HorizontalNavMenuLink from './HorizontalNavMenuLink'
import HorizontalNavMenuGroup from './HorizontalNavMenuGroup'
import {
  resolveHorizontalNavMenuItemComponent as resolveNavItemComponent,
  canViewMenuGroup,
  canViewMenuItem
} from '@layouts/utils'

const HorizontalNavMenuItems = props => {
  // ** Components Object
  const Components = {
    HorizontalNavMenuGroup,
    HorizontalNavMenuLink
  }

  // ** Render Nav Items
  const RenderNavItems = props.items.map((item, index) => {
    const TagName = Components[resolveNavItemComponent(item)]
    if (item.children && item.thirdChild)  {
      return canViewMenuGroup(item) && <TagName item={item} index={index} key={item.menu_parentid} {...props} />
    }
    return canViewMenuItem(item) && <TagName item={item} index={index} key={item.menu_id} {...props} />
  })

  return RenderNavItems
}

export default HorizontalNavMenuItems
