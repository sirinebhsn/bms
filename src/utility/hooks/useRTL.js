//** React Imports
import { useEffect } from 'react'

// ** Store & Actions
import { handleRTL } from '@store/layout'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export const useRTL = () => {

  // ** Store Vars
  const dispatch = useDispatch()
  const isRtl = useSelector(state => state.layout.isRTL)

  // ** Return a wrapped version of useState's setter function
  const item = localStorage.getItem('i18nextLng')

  const setValue = value => {
    dispatch(handleRTL(value))
  }




  useEffect(() => {
    // ** Get HTML Tag

    const element = document.getElementsByTagName('html')[0]
    // ** If isRTL then add attr dir='rtl' with HTML else attr dir='ltr'
    if (isRtl && item=='ly') {
      <Link to='/dashboard'/>
      element.setAttribute('dir', 'rtl')

    } else if(item !='ly') {
      element.setAttribute('dir', 'ltr')
    }
  }, [isRtl,item])

  return [isRtl , setValue,item]
}