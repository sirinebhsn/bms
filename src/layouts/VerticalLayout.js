// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
//import navigation from '@src/navigation/vertical'
import axios from 'axios'
import { useEffect, useState } from 'react'

const VerticalLayout = props => {
  const [menuData, setMenuData] = useState([])
  //const [children, setChildren] = useState([])
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  // For ServerSide navigation
   useEffect(() => {
    axios.get(`${API_ENDPOINT}/api/all`).then(response =>
     setMenuData(response.data)
     )
   
   
  }, [])
  console.log(menuData)


  return (
 
    <Layout menuData={menuData} {...props}>
      {props.children}
    </Layout>
  )
}

export default VerticalLayout
