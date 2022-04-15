// ** Custom Components
import Avatar from '@components/avatar'
import { useEffect, useState } from 'react'

// ** Third Party Components
import Chart from 'react-apexcharts'
import { MoreVertical } from 'react-feather'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardFooter } from 'reactstrap'

const CardEmployeesTasks = ({ colors, trackBgColor }) => {
  const API_ENDPOINT = process.env.REACT_APP_API_ENDPOINT
  const MAX_LENGTH = 30;
  const {t}= useTranslation()
  const [data, setData] = useState([]);
  useEffect(() => {
    getData();
  }, [])
  async function getData() {
    let result = await fetch(`${API_ENDPOINT}/api/getComplainByDate`);
    result = await result.json();
    setData(result)
  }

  const employeesTasks = [
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-9.jpg').default,
      title: 'Ryan Harrington',
      subtitle: 'iOS Developer',
      time: '9hr 20m',
      chart: {
        type: 'radialBar',
        series: [45],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.primary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
      title: 'Louisa Norton',
      subtitle: 'UI Designer',
      time: '4hr 17m',
      chart: {
        type: 'radialBar',
        series: [65],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.danger.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-1.jpg').default,
      title: 'Jayden Duncan',
      subtitle: 'Java Developer',
      time: '12hr 8m',
      chart: {
        type: 'radialBar',
        series: [60],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.success.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-20.jpg').default,
      title: 'Cynthia Howell',
      subtitle: 'Angular Developer',
      time: '3hr 19m',
      chart: {
        type: 'radialBar',
        series: [35],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.secondary.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    },
    {
      avatar: require('@src/assets/images/portrait/small/avatar-s-16.jpg').default,
      title: 'Helena Payne',
      subtitle: 'Marketing',
      time: '9hr 50m',
      chart: {
        type: 'radialBar',
        series: [65],
        height: 30,
        width: 30,
        options: {
          grid: {
            show: false,
            padding: {
              left: -15,
              right: -15,
              top: -12,
              bottom: -15
            }
          },
          colors: [colors.warning.main],
          plotOptions: {
            radialBar: {
              hollow: {
                size: '22%'
              },
              track: {
                background: trackBgColor
              },
              dataLabels: {
                showOn: 'always',
                name: {
                  show: false
                },
                value: {
                  show: false
                }
              }
            }
          },
          stroke: {
            lineCap: 'round'
          }
        }
      }
    }

  ]

  const renderTasks = () => {
    return data.map(task => {
      return (
        <div key={task.compl_id} className='employee-task d-flex justify-content-between align-items-center'>
          <div className='d-flex'>
            <Avatar imgClassName='rounded' className='me-75' img={task.users?.user_image} imgHeight='42' imgWidth='42' />
            <div className='my-auto'>
              <h6 className='mb-0'>{task.compl_title}</h6>
              <small>{task.users?.user_name}</small>
            </div>
          </div>
         
          <div className='d-flex align-items-center'>
            <small className='text-muted me-75'> {`${task.compl_description.substring(0, MAX_LENGTH)}...`}</small>

          </div>
        </div>
      )
    })
  }

  return (
    <Card className='card-employee-task'>
      <CardHeader>
        <CardTitle tag='h4'>{t('Last Complains')}</CardTitle>
        <MoreVertical size={18} className='cursor-pointer' />
      </CardHeader>
      <CardBody>{renderTasks()}</CardBody>
      <CardFooter>
        <div style={{ float: 'right' }} >
          <Link to='/complain/list'> {t('See More')} </Link>
        </div></CardFooter>
    </Card>
  )
}

export default CardEmployeesTasks
