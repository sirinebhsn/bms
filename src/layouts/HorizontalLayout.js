// ** Core Layout Import
// !Do not remove the Layout import
import Layout from '@layouts/HorizontalLayout'

// ** Menu Items Array
import navigation from '@src/navigation/horizontal'

const HorizontalLayout = props => {
  const [menuData, setMenuData] = useState([])
  const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  // For ServerSide navigation
  useEffect(() => {
    getMenu()
   
   
  }, [])
const getMenu=()=>{
  axios.get(`${API_ENDPOINT}/api/all`).then(response =>
    setMenuData(response.data)
    )

}
  return (
    <Layout menuData={menuData} {...props} >
            {props.children}

    </Layout>
  )
}

export default HorizontalLayout
