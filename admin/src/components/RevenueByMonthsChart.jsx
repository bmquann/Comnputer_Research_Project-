import React from 'react'
import { Bar } from 'react-chartjs-2'
import { colors } from '../constants'

export default function RevenueByMonthsChart(props) {
    const chartOptions = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            xAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            },
            yAxes: {
                grid: {
                    display: false,
                    drawBorder: false
                }
            }
        },
        plugins: {
            legend: {
                display: false
            },
            title: {
                display: false
            }
        },
        elements: {
            bar: {
                backgroundColor: colors.orange,
                borderRadius: 20,
                borderSkipped: 'bottom'
            }
        }
    }
    
    const chartData = {
        labels: this.props.lables ,
        datasets: [
            {
                label: 'Revenue',
                data: this.props.data
            }
        ]
    }
  return (
    <>
    <div className="title mb">
        Revenue by months
    </div>
    <div>
        <Bar options={chartOptions} data={chartData} height={`300px`} />
    </div>
</>
  )
}
