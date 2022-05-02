import React, {  useEffect, useMemo, useState } from "react";
import { Bar } from 'react-chartjs-2'
import Box from '../components/box/Box'
import DashboardWrapper, { DashboardWrapperMain, DashboardWrapperRight } from '../components/dashboard-wrapper/DashboardWrapper'
import SummaryBox, { SummaryBoxSpecial } from '../components/summary-box/SummaryBox'
import { colors, data } from '../constants'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
} from 'chart.js'
import OverallList from '../components/overall-list/OverallList'
import RevenueList from '../components/revenue-list/RevenueList'
import { userRequest } from '../requestMethods'
// import { list } from "firebase/storage";
import { useDispatch, useSelector } from "react-redux";
import {  getStats } from "../redux/apiCalls";

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    BarElement,
    Title,
    Tooltip,
    Legend
)

const Dashboard = () => {
    const dispatch = useDispatch();
    const MONTHS = useMemo(
        () => [
            "Jan",
            "Feb",
            "Mar",
            "Apr",
            "May",
            "Jun",
            "Jul",
            "Agu",
            "Sep",
            "Oct",
            "Nov",
            "Dec",
        ],
        []
    );
    const [pStats, setPStats] = useState([{ name: "", Sales: 0, }, { name: "", Sales: 0, }, { name: "", Sales: 0, }]);
    const [datas, setData] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

    // const list = useSelector((state) => state.order.pStats)
    useEffect(() => {
        getStats(dispatch);
        async function fetchData() {
            const res = await userRequest.get("/carts/income");
            const listData= res.data.sort((a, b) => {
                return a._id - b._id
            })
            listData.map((item) => {
                datas[item._id - 1] = item.total
                setData(

                    datas
                )


                setPStats((prev) => [
                    ...prev,
                    { name: MONTHS[item._id - 1], Sales: item.total },
                ])
            }
            );
        }
        fetchData()
    }, [dispatch]);

    const orders = useSelector((state) => state.order.list)
    const summary = [
        {
            title: 'Sales',
            subtitle: 'Total sales last Month',
            value: pStats[pStats.length - 2].Sales,
            percent: Math.round(Math.round(pStats[pStats.length - 2].Sales / pStats[pStats.length - 3].Sales * 100 * 100) / 100)
        },
        {
            title: 'Revenue',
            subtitle: 'Total sales this Month',
            value: pStats[pStats.length - 1].Sales,
            percent: Math.round(Math.round(pStats[pStats.length - 1].Sales / pStats[pStats.length - 2].Sales * 100 * 100) / 100)
        },

    ]
    var sum = 0;
    var labels = [];
    var data = [];
    pStats.forEach(element => {
        sum += element.Sales
        labels.push(element.name)
        data.push(element.Sales)
    });
    const revenueSummary = {
        title: 'Revenue',
        value: Math.round(sum * 100) / 100,
        chartData: {
            labels: labels,
            data: data,
        }
    }
    return (
        <DashboardWrapper>
            <DashboardWrapperMain>
                <div className="row">
                    <div className="col-8 col-md-12">
                        <div className="row">
                            {
                                summary.map((item, index) => (
                                    <div key={`summary-${index}`} className="col-6 col-md-6 col-sm-12 mb">
                                        <SummaryBox item={item} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className="col-4 hide-md">
                        <SummaryBoxSpecial item={revenueSummary} />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Box>
                            <RevenueByMonthsChart datas={datas} />
                        </Box>
                    </div>
                </div>
            </DashboardWrapperMain>
            <DashboardWrapperRight>
                <div className="title mb">Overall</div>
                <div className="mb">
                    <OverallList sum={sum} quantity={orders.length} />
                </div>
                <div className="title mb">Revenue by channel</div>
                <div className="mb">
                    <RevenueList />
                </div>
            </DashboardWrapperRight>
        </DashboardWrapper>
    )
}

export default Dashboard

const RevenueByMonthsChart = (props) => {
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
        labels: data.revenueByMonths.labels,
        datasets: [
            {
                label: 'Revenue',
                data: props.datas
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