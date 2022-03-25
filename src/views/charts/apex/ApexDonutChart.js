// ** Third Party Components
import { useEffect, useState } from 'react'
import Chart from 'react-apexcharts'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardSubtitle } from 'reactstrap'

const ApexRadiarChart = () => {
  const donutColors = {
    series1: '#ffe700',
    series2: '#00d4bd',
    series3: '#826bf8',
    series4: '#2b9bf4',
    series5: '#FFA1A1'
  }
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT

  useEffect(() => {
    getAdmins();
    getTenants();
    getOwners();
    geteEmp()
  }, [])
  const [a, setA] = useState([]);
  const [t, setTenant] = useState([]);
  const [emp, setEmp] = useState([]);
  const [o, setOwners] = useState([]);


  async function getOwners() {
    let result = await fetch(`${API_ENDPOINT}/api/percentageOwners`);
    result = await result.json();
    setOwners(result)
  }
  async function getAdmins() {
    let result = await fetch(`${API_ENDPOINT}/api/percentageAdmins`);
    result = await result.json();
    setA(result)
  }
  async function geteEmp() {
    let result = await fetch(`${API_ENDPOINT}/api/percentageEmp`);
    result = await result.json();
    setEmp(result)
  }
  async function getTenants() {
    let result = await fetch(`${API_ENDPOINT}/api/percentageTenants`);
    result = await result.json();
    setTenant(result)
  }

  // ** Chart Options
  const options = {
    legend: {
      show: true,
      position: 'bottom'
    },
    labels: ['Tenants', 'Owners', 'Employees', 'Admins'],

    colors: [donutColors.series1, donutColors.series5, donutColors.series3, donutColors.series2],
    dataLabels: {
      enabled: true,
      formatter(val) {
        return `${parseInt(val)}%`
      }
    },
    plotOptions: {
      pie: {
        donut: {
          labels: {
            show: true,
            name: {
              fontSize: '2rem',
              fontFamily: 'Montserrat'
            },
            value: {
              fontSize: '1rem',
              fontFamily: 'Montserrat',
              formatter(val) {
                return `${parseInt(val)}%`
              }
            },
            total: {
              show: true,
              fontSize: '1.5rem',
              label: 'Users',
              formatter() {
                return '100%'
              }
            }
          }
        }
      }
    },
    responsive: [
      {
        breakpoint: 992,
        options: {
          chart: {
            height: 380
          },
          legend: {
            position: 'bottom'
          }
        }
      },
      {
        breakpoint: 576,
        options: {
          chart: {
            height: 320
          },
          plotOptions: {
            pie: {
              donut: {
                labels: {
                  show: true,
                  name: {
                    fontSize: '1.5rem'
                  },
                  value: {
                    fontSize: '1rem'
                  },
                  total: {
                    fontSize: '1.5rem'
                  }
                }
              }
            }
          }
        }
      }
    ]
  }

  // ** Chart Series
  const series = [t, o, emp, a]

  return (
    <Card>
      <CardHeader>
        <div>
          <CardTitle className='mb-75' tag='h4'>
            Users Ratio
          </CardTitle>
          <CardSubtitle className='text-muted'>
            according to their roles</CardSubtitle>
        </div>
      </CardHeader>
      <CardBody>
        <Chart options={options} series={series} type='donut' height={350} />
      </CardBody>
    </Card>
  )
}

export default ApexRadiarChart
