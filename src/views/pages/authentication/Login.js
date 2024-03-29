// ** React Imports
import { Fragment, useState} from 'react'
import { Link, useHistory } from 'react-router-dom'

// ** Custom Hooks
import { useSkin } from '@hooks/useSkin'


// ** Third Party Components
import { toast, Slide } from 'react-toastify'
import { Coffee } from 'react-feather'
import Avatar from '@components/avatar'


// ** Reactstrap Imports
import { Row, Col, Form, Input, Label, Button, CardText, CardTitle, Table,Container } from 'reactstrap'

// ** Styles
import '@styles/react/pages/page-authentication.scss'
import axios from 'axios'

const ToastContent = ({ user_name, user_type }) => (
  <Fragment>
    <div className='toastify-header'>
      <div className='title-wrapper'>
        <Avatar size='sm' color='success' icon={<Coffee size={12} />} />
        <h6 className='toast-title fw-bold'>Welcome, {user_name}</h6>
      </div>
    </div>
    <div className='toastify-body'>
      {
        user_type == 'S' &&
        <>
          <span>You have successfully logged in as  Super admin user to BMS. </span>

        </>
      }
      {
        user_type == 'a' &&
        <>
          <span>You have successfully logged in as an Admin user to BMS. </span>

        </>
      }
    </div>
  </Fragment>
)



const Login = () => {
  const { skin } = useSkin()
  const illustration = skin === 'dark' ? 'profil.png' : 'profil.png',
    source = require(`@src/assets/images/pages/${illustration}`).default
    const logo = skin === 'dark' ? 'logo-startnow.png' : 'logo-startnow.png',
    sourceLogo = require(`@src/assets/images/logo/${logo}`).default
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const MAX_LENGTH = 5;

  const state = {

    tableValues:[
    {
      email: 'start-now@start-now.tn',
      password: 'Syrine004#*'
    },
    {
      email: 'start-now@start-now.tn',
      password: 'Syrine004#*'
    }
  ]
  }



  const updateFormFromTable = () => {
    setEmail(state.tableValues.email)
    setPassword(state.tableValues.password)


  }
  const navigate = useHistory()

  const login = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    axios.get(`${API_ENDPOINT}/sanctum/csrf-cookie`).then(() => {
      axios.post(`${API_ENDPOINT}/api/auth/login`, formData).then(response => {

        if (response.data.status == 200) {
          localStorage.setItem("accessToken", response.data.accessToken)
          localStorage.setItem("email", response.data.email)
          localStorage.setItem("user_name", response.data.user_name)
          localStorage.setItem("user_id", response.data.user_id)
          localStorage.setItem("user_type", response.data.user_type)
          localStorage.setItem("building_id", response.data.building_id)

          navigate.push('/dashboard');
          toast.success(
            <ToastContent user_name=
              {response.data.user_name || 'John Doe'} user_type={response.data.user_type || 'admin'} />,
            { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
          )
          // console.log(response.data)
        }


      });
    })


  };

  // const API_ENDPOINT =process.env.REACT_APP_API_ENDPOINT

  //const [email, setEmail] = useState('');
  //const [password, setPassword] = useState('');
  /* const redirect = props.location.search
   ? props.location.search.split('=')[1]
   : '/dashboard';*/

  /*const userSignin = useSelector((state) => state.userSignin || {})
 const  {userInfo, accessToken} = userSignin;
 const dispatch = useDispatch();
 const history=useHistory()
  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(signin(email, password));
    history.push('/dashboard');
 
   
  };*/

  /*useEffect(() => {
   if (localStorage.getItem('userInfo'))
   {
 
   }
 
  }, [history,userInfo]);*/

  return (
    <div className='auth-wrapper auth-cover'>
      <Row className='auth-inner m-0'>
        <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
          <img  style={{height:28}} src={sourceLogo} alt='logo'/>
          <h2 className='brand-text text-primary ms-1'>BMS</h2>
        </Link>
        <Col className='d-none d-lg-flex align-items-center p-6' lg='7' sm='12'>
          <div className='w-700 d-lg-flex align-items-center justify-content-center px-40'>
            <img className='img-fluid' src={source} style={{height:600}} alt='Login Cover' />
          </div>
        </Col>
        <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='5' sm='12'>
          <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
            <CardTitle tag='h2' className='fw-bold mb-1'>
              Welcome to BMS! 🕍

            </CardTitle>
            <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>

            <Form className='auth-login-form mt-2' onSubmit={login}>
              <div className='mb-1'>
                <Label className='form-label' for='email'>
                  Email
                </Label>
                <input id='email' type='email' className="form-control" value={email}
                  onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
              </div>

              <div className='mb-1'>
                <div className='d-flex justify-content-between'>
                  <Label className='form-label' for='password' >
                    Password
                  </Label>
                  <Link to='/forgot-password'>
                    <small>Forgot Password?</small>
                  </Link>
                </div>
                <input type='password' id='password' className="form-control"

                  onChange={(e) => setPassword(e.target.value)} placeholder="Password" value={password} /><br />
              </div>
              <div className='form-check mb-1'>
                <Input type='checkbox' id='remember-me' />
                <Label className='form-check-label' for='remember-me'>
                  Remember Me
                </Label>
              </div>
              <Button type='submit' color='primary' block>
                Sign in
              </Button>

            </Form>
            <br />
            <br />
            <Container >
              <Table hover bordered responsive >
                <thead>
                  <tr>
                    <th> Email</th>
                    <th> PASSWORD</th>
                    <th> Type</th>
                    <th> Click here </th>

                  </tr>
                </thead>
                {(state.tableValues).map((el)=>

                <tbody>
                  <tr>

                    <td >{el.email}</td>
                    <td >{`${el.password.substring(0, MAX_LENGTH)}...`}</td>
                    <td> S.Admin</td>
                    <td>  <Button onClick={updateFormFromTable} tag={Label} className='mb-75 me-75' size='sm' color='primary'>
                      Click here

                    </Button></td>
                  </tr>


                </tbody>
                )}
              </Table>
            </Container>
            </Col>
          </Col>


      </Row>

    </div>

  );


}
export default Login

    // ** Hooks
/* e.preventDefault();
 const formData = new FormData();
 formData.append('email', email);
 formData.append('password', password);

 axios.get(`${API_ENDPOINT}/sanctum/csrf-cookie`).then(() => {
   axios.post(`${API_ENDPOINT}/api/auth/login`, formData).then(response => { 
 
     if (response.data.status == 200) {
       localStorage.setItem("accessToken", response.data.accessToken)
       localStorage.setItem("email", response.data.email)
       localStorage.setItem("password", response.data.password)
       localStorage.setItem("user_name", response.data.user_name)
     
     
       navigate.push('/dashboard');
       toast.success(
         <ToastContent user_name={response.data.user_name || 'John Doe'} user_type={response.data.user_type || 'admin'} />,
         { icon: false, transition: Slide, hideProgressBar: true, autoClose: 2000 }
       )
     // console.log(response.data)
     }
 

   });
 })


};
return (
 <div className='auth-wrapper auth-cover'>
   <Row className='auth-inner m-0'>
     <Link className='brand-logo' to='/' onClick={e => e.preventDefault()}>
       <svg viewBox='0 0 139 95' version='1.1' height='28'>
         <defs>
           <linearGradient x1='100%' y1='10.5120544%' x2='50%' y2='89.4879456%' id='linearGradient-1'>
             <stop stopColor='#000000' offset='0%'></stop>
             <stop stopColor='#FFFFFF' offset='100%'></stop>
           </linearGradient>
           <linearGradient x1='64.0437835%' y1='46.3276743%' x2='37.373316%' y2='100%' id='linearGradient-2'>
             <stop stopColor='#EEEEEE' stopOpacity='0' offset='0%'></stop>
             <stop stopColor='#FFFFFF' offset='100%'></stop>
           </linearGradient>
         </defs>
         <g id='Page-1' stroke='none' strokeWidth='1' fill='none' fillRule='evenodd'>
           <g id='Artboard' transform='translate(-400.000000, -178.000000)'>
             <g id='Group' transform='translate(400.000000, 178.000000)'>
               <path
                 d='M-5.68434189e-14,2.84217094e-14 L39.1816085,2.84217094e-14 L69.3453773,32.2519224 L101.428699,2.84217094e-14 L138.784583,2.84217094e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L6.71554594,44.4188507 C2.46876683,39.9813776 0.345377275,35.1089553 0.345377275,29.8015838 C0.345377275,24.4942122 0.230251516,14.560351 -5.68434189e-14,2.84217094e-14 Z'
                 id='Path'
                 className='text-primary'
                 style={{ fill: 'currentColor' }}
               ></path>
               <path
                 d='M69.3453773,32.2519224 L101.428699,1.42108547e-14 L138.784583,1.42108547e-14 L138.784199,29.8015838 C137.958931,37.3510206 135.784352,42.5567762 132.260463,45.4188507 C128.736573,48.2809251 112.33867,64.5239941 83.0667527,94.1480575 L56.2750821,94.1480575 L32.8435758,70.5039241 L69.3453773,32.2519224 Z'
                 id='Path'
                 fill='url(#linearGradient-1)'
                 opacity='0.2'
               ></path>
               <polygon
                 id='Path-2'
                 fill='#000000'
                 opacity='0.049999997'
                 points='69.3922914 32.4202615 32.8435758 70.5039241 54.0490008 16.1851325'
               ></polygon>
               <polygon
                 id='Path-2'
                 fill='#000000'
                 opacity='0.099999994'
                 points='69.3922914 32.4202615 32.8435758 70.5039241 58.3683556 20.7402338'
               ></polygon>
               <polygon
                 id='Path-3'
                 fill='url(#linearGradient-2)'
                 opacity='0.099999994'
                 points='101.428699 0 83.0667527 94.1480575 130.378721 47.0740288'
               ></polygon>
             </g>
           </g>
         </g>
       </svg>
       <h2 className='brand-text text-primary ms-1'>BMS</h2>
     </Link>
     <Col className='d-none d-lg-flex align-items-center p-5' lg='8' sm='12'>
       <div className='w-100 d-lg-flex align-items-center justify-content-center px-5'>
         <img className='img-fluid' src={source} alt='Login Cover' />
       </div>
     </Col>
     <Col className='d-flex align-items-center auth-bg px-2 p-lg-5' lg='4' sm='12'>
       <Col className='px-xl-2 mx-auto' sm='8' md='6' lg='12'>
         <CardTitle tag='h2' className='fw-bold mb-1'>
           Welcome to BMS! 🕍

         </CardTitle>
         <CardText className='mb-2'>Please sign-in to your account and start the adventure</CardText>
         <Alert color='primary'>
           <div className='alert-body font-small-2'>
             <p>
               <small className='me-50'>
                 <span className='fw-bold'>S.Admin:</span> start-now@start-now.tn | Syrine004#*
               </small>
             </p>
             <p>
               <small className='me-50'>
                 <span className='fw-bold'>Admin:</span> start@gmail.com | Syrine004#*
               </small>
             </p>
           </div>
           <HelpCircle
             id='login-tip'
             className='position-absolute'
             size={18}
             style={{ top: '10px', right: '10px' }}
           />
           <UncontrolledTooltip target='login-tip' placement='left'>
             This is just for ACL demo purpose.
           </UncontrolledTooltip>
         </Alert>
         <Form className='auth-login-form mt-2' onSubmit={login}>
           <div className='mb-1'>
             <Label className='form-label' for='email'>
               Email
             </Label>
             <input id='email' type='email' className="form-control"
               onChange={(e) => setEmail(e.target.value)} placeholder="Email" /><br />
           </div>
           <div className='mb-1'>
             <div className='d-flex justify-content-between'>
               <Label className='form-label' for='password'>
                 Password
               </Label>
               <Link to='/forgot-password'>
                 <small>Forgot Password?</small>
               </Link>
             </div>
             <input type='password' id='password' className="form-control"  
             
               onChange={(e) => setPassword(e.target.value)} placeholder="Password" /><br />
           </div>
           <div className='form-check mb-1'>
             <Input type='checkbox' id='remember-me' />
             <Label className='form-check-label' for='remember-me'>
               Remember Me
             </Label>
           </div>
           <Button type='submit' color='primary' block>
             Sign in
           </Button>
         </Form>
         <p className='text-center mt-2'>
           <span className='me-25'>New on our platform?</span>
           <Link to='/register'>
             <span>Create an account</span>
           </Link>
         </p>
         <div className='divider my-2'>
           <div className='divider-text'>or</div>
         </div>
         <div className='auth-footer-btn d-flex justify-content-center'>
           <Button color='facebook'>
             <Facebook size={14} />
           </Button>
           <Button color='twitter'>
             <Twitter size={14} />
           </Button>
           <Button color='google'>
             <Mail size={14} />
           </Button>
           <Button className='me-0' color='github'>
             <GitHub size={14} />
           </Button>
         </div>
       </Col>
     </Col>
   </Row>
 </div>
)
}*/

