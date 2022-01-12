import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import {useParams} from 'react-router'
import styled from 'styled-components'

const Container = styled.div`
    padding: 0px 20px;
    max-width: 480px;
    margin: 0 auto;
` 

const Header = styled.header`
    height: 10vh;
    display: flex;
    justify-content: center;
    align-items: center;
`

const Title = styled.h1`
    font-size: 28px;
    color: ${props => props.theme.accentcolor};
`

const Loader = styled.span`
    text-align: center;
    display: block;
`

interface RouteParams {
    coinId: string;
}

interface RouteState {
    name: string;
}

interface InfoData {
    id: string;
    name: string;
    symbol: string;
    rank: number;
    is_new: boolean;
    is_active: boolean;
    type: string;
    tags: object;
    team: object;
    description: string;
    message: string;
    open_source: boolean;
    started_at: string;
    development_status: string;
    hardware_wallet: boolean;
    proof_type: string;
    org_structure: string;
    hash_algorithm: string;
    links: object;
    links_extended: object;
    whitepaper: object;
    first_data_at: string;
    last_data_at: string;
}

interface PriceData {

}

function Coin() {
    const {coinId} = useParams<RouteParams>();
    const [loading, setLoading] = useState(true);
    const {state}  = useLocation<RouteState>();
    const [info, setInfo] = useState({});
    const [priceInfo, setPriceInfo] = useState({});

    useEffect(() => {
        (async () => {
            const infoData = await (
                await fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
            ).json();
            const priceData = await(
                await fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`)
            ).json();
            console.log(infoData);
            console.log(priceData);

            setInfo(infoData);
            setPriceInfo(priceData);
        })();
    }, [])
    
    return <Container>
        <Header>
            <Title>{state?.name || "Loading..."}</Title>
        </Header>
        {loading ? <Loader>Loading...</Loader> : <span>{info}</span>}
    </Container>
}

export default Coin
