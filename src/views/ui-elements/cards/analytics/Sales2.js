// ** Third Party Components
import Chart from 'react-apexcharts'
import { Settings } from 'react-feather'
import { useTranslation } from 'react-i18next'

// ** Reactstrap Imports
import { Card, CardHeader, CardTitle, CardBody, CardText } from 'reactstrap'

const Sales2 = props => {
  const{t}=useTranslation()
  const options = {
      chart: {
        toolbar: { show: false },
        zoom: { enabled: false },
        type: 'line',
        dropShadow: {
          enabled: true,
          top: 18,
          left: 2,
          blur: 5,
          opacity: 0.2
        },
        offsetX: -10
      },
      stroke: {
        curve: 'smooth',
        width: 4
      },
      grid: {
        borderColor: '#ebe9f1',
        padding: {
          top: -20,
          bottom: 5,
          left: 20
        }
      },
      legend: {
        show: false
      },
      colors: ['#df87f2'],
      fill: {
        type: 'gradient',
        gradient: {
          shade: 'dark',
          inverseColors: false,
          gradientToColors: [props.primary],
          shadeIntensity: 1,
          type: 'horizontal',
          opacityFrom: 1,
          opacityTo: 1,
          stops: [0, 100, 100, 100]
        }
      },
      markers: {
        size: 0,
        hover: {
          size: 5
        }
      },
      xaxis: {
        labels: {
          offsetY: 5,
          style: {
            colors: '#b9b9c3',
            fontSize: '0.857rem',
            fontFamily: 'Montserrat'
          }
        },
        axisTicks: {
          show: false
        },
        categories: [t('Jan'), t('Feb'), t('Mar'), t('Apr'), t('May'), t('Jun'), t('July'), t('Aug'), t('Sep'), t('Oct'), t('Nov'), t('Dec')],
        axisBorder: {
          show: false
        },
        tickPlacement: 'on'
      },
      yaxis: {
        tickAmount: 5,
        labels: {
          style: {
            colors: '#b9b9c3',
            fontSize: '0.857rem',
            fontFamily: 'Montserrat'
          },
          formatter(val) {
            return val > 999 ? `${(val / 1000).toFixed(1)}k` : val
          }
        }
      },
      tooltip: {
        x: { show: false }
      }
    },
    series = [
      {
        name: t('Monthly Deposit Bill Graph For Year 2022'),
        data: [140, 180, 150, 205, 160, 295, 125, 255, 205, 305, 240, 295]
      }
    ]
  return (
    <Card>
      <CardHeader className='align-items-start'>
        <div>
          <CardTitle className='mb-25' tag='h4'>
          {t('Monthly Deposit Bill Graph For Year 2022')}

          </CardTitle>
        </div>
        <Settings size={18} className='text-muted cursor-pointer' />
      </CardHeader>
      <CardBody className='pb-0'>
        <Chart options={options} series={series} type='line' height={240} />
      </CardBody>
    </Card>
  )
}
export default Sales2
