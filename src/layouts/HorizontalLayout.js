// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/horizontal'

const HorizontalLayout = props => {
  const [menuData, setMenuData] = useState([])

  // For ServerSide navigation
  useEffect(() => {
    axios.get(`https://bmsback.herokuapp.com/api/all`).then(response =>
     setMenuData(response.data)
     )
   
   
  }, )
  console.log(menuData)

  return (
    <Layout menuData={menuData} {...props} >
            {props.children}

    </Layout>
  )
}

export default HorizontalLayout
