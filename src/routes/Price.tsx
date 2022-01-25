import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';

interface PriceProps {
    coinId: string
}

interface IHistorical {
    time_open: string;
    time_close: string;
    open: number;
    high: number;
    low: number;
    close: number;
    volume: number;
    market_cap: number;
}

function Price({coinId}: PriceProps) {

    console.log(coinId);

    const { isLoading, data } = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    )

    return (
        <div style={{marginBottom: 50}}>
            {
                isLoading
                ? ( "Loading Price...")
                : (<ApexChart 
                    type="candlestick" 
                    series={[
                        {
                            name: "Price",
                            data: data?.map(price => Object({
                                x: price.time_close,
                                y: [
                                    price.open.toFixed(3),
                                    price.high.toFixed(3),
                                    price.low.toFixed(3),
                                    price.close.toFixed(3)
                                ]
                            }))
                        },
                    ]}
                    options={{
                        theme: { mode: "dark" },
                        chart: {
                            height: 300,
                            width: 500,
                            toolbar: {
                                show: false
                            },
                            background: "transparent",
                        },
                        grid: { show: false },
                        yaxis: { show: false },
                        xaxis: {
                            labels: { show: false },
                            axisTicks: { show: false },
                            axisBorder: { show: false },
                            type: "datetime",
                            categories: data?.map(price => price.time_close)
                        },
                    }}
                />)
            }
        </div>
    )
}

export default Price;





// var options = {
//     series: [{
//         name: 'candle',
//     }],
//     chart: {
//         height: 350,
//         type: 'candlestick',
//     },
//     title: {
//         text: 'CandleStick Chart - Category X-axis',
//         align: 'left'
//     },
//     annotations: {
//         xaxis: [
//         {
//             x: 'Oct 06 14:00',
//             borderColor: '#00E396',
//             label: {
//             borderColor: '#00E396',
//             style: {
//                 fontSize: '12px',
//                 color: '#fff',
//                 background: '#00E396'
//             },
//             orientation: 'horizontal',
//             offsetY: 7,
//             text: 'Annotation Test'
//             }
//         }
//         ]
//     },
//     tooltip: {
//         enabled: true,
//     },
//     xaxis: {
//         type: 'category',
//         labels: {
//         formatter: function(val) {
//             return dayjs(val).format('MMM DD HH:mm')
//         }
//         }
//     },
//     yaxis: {
//         tooltip: {
//         enabled: true
//         }
//     }
//     };