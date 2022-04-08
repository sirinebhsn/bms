// ** React Imports
import { useEffect, useState } from 'react'
import { NavLink, useLocation } from 'react-router-dom'

// ** Third Party Components
import classnames from 'classnames'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Badge } from 'reactstrap'
import Icon from 'react-remixicon'
import axios from 'axios'
import { isUserLoggedIn } from '@utils'


const VerticalNavMenuLink = ({
  item,
  activeItem,
  setActiveItem,
  currentActiveItem
}) => {
  // ** Conditional Link Tag, if item has newTab or externalLink props use <a> tag else use NavLink
  const LinkTag = item.externalLink ? 'a' : NavLink

  // ** Hooks
  const { t } = useTranslation()
  const location = useLocation()

 useEffect(() => {
    if (currentActiveItem !== null) {
      setActiveItem(currentActiveItem)
   }
      
    },[location])


  return (
    <li
      className={classnames({
        'nav-item': !item.children,
        disabled: item.disabled,
        active: item.navLink === activeItem
      })}
    >


          <LinkTag
            className='d-flex align-items-center'
            target={item.newTab ? '_blank' : undefined}
            /*eslint-disable */
            {...(item.externalLink === true
              ? {
                href: item.navLink || '/'
              }
              : {
                to: item.navLink || '/',
                isActive: match => {
                  if (!match) {
                    return false
                  }

                  if (
                    match.url &&
                    match.url !== '' &&
                    match.url === item.navLink
                  ) {
                    currentActiveItem = item.navLink
                  }
                }
              })}
            onClick={e => {
              if (
                item.navLink.length === 0 ||
                item.navLink === '#' ||
                item.disabled === true
              ) {
                e.preventDefault()
              }
            }}
          >
            <Icon name={item.menu_icon} type={item.menu_icon_type} />
            {
              item.menu_icon == '' && item.menu_icon_type == '' &&
              <>
                <Icon name='home-3' type='line' />

              </>
            }
            <span className='menu-item text-truncate' >{t(item.menu_name)}</span>

            {item.badge && item.badgeText ? (
              <Badge className='ms-auto me-1' color={item.badge} pill>
                {item.badgeText}
              </Badge>
            ) : null}
          </LinkTag>
      
    </li>
  )
}

export default VerticalNavMenuLink
