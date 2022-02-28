// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/VerticalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/vertical'
import axios from 'axios'
import { useEffect, useState } from 'react'

const VerticalLayout = props => {
  const [menuData, setMenuData] = useState([])
  const [children, setChildren] = useState([])

  // For ServerSide navigation
   useEffect(() => {
    axios.get(`http://localhost:8000/api/showMenuById`).then(response =>
     setMenuData(response.data)
     )
     axios.get(`http://localhost:8000/api/showMenu`).then(res =>
     setChildren(res.data)
     )
   
  }, [])
  console.log(menuData)
  console.log(children)


  return (
 

    <Layout menuData={menuData} {...props}>

     {children.props}
    </Layout>
  )
}

export default VerticalLayout
