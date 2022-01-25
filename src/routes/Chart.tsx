// import { useParams } from 'react-router';

import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from 'react-apexcharts';


interface ChartProps {
    coinId: string;
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

function Chart({coinId}: ChartProps) {
    // const params = useParams();
    // console.log(params.coinId);
    console.log(coinId);

    const {isLoading, data} = useQuery<IHistorical[]>(
        ["ohlcv", coinId],
        () => fetchCoinHistory(coinId),
        {
            refetchInterval: 10000,
        }
    );

    return  <div style={{marginBottom: 50}}>
                {
                    isLoading 
                    ? ("Loading chart...") 
                    : (<ApexChart 
                            type="line" 
                            series={[
                                {
                                    name: "Price",
                                    data: data?.map(price => price.close),
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
                                stroke: {
                                    curve: "smooth",
                                    width: 5,
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
                                fill: {
                                    type: "gradient",
                                    gradient: {
                                        gradientToColors: ["#0be881"],
                                        stops: [0, 100]
                                    },
                                },
                                colors: ["#0fbcf9"],
                                tooltip: {
                                    y: {
                                        formatter: (value) => `$ ${value.toFixed(2)}`
                                    },
                                }
                            }}
                        />)
                }
            </div>
    
}

export default Chart;