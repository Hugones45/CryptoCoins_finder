import styles from "./Detail.module.css"
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"

interface CoinProps {
    symbol: string;
    name: string;
    price: string;
    market_cap: string;
    low_24h: string;
    high_24h: string;
    total_volume_24h: string;
    delta_24h: string;
    formatedPrice: string;
    formatedMarket: string;
    formatedLowprice: string;
    formatedHighprice: string;
    error?: string;
}

export function Detail() {

    const { cripto } = useParams()

    const navigate = useNavigate()
    const [detail, setDetail] = useState<CoinProps>()
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        function getData() {
            fetch(`https://sujeitoprogramador.com/api-cripto/coin/?key=67f9141787211428&symbol=${cripto}`)
                .then(res => res.json())
                .then((data: CoinProps) => {

                    let price = Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })

                    const resultData = {
                        ...data,
                        formatedPrice: price.format(Number(data.price)),
                        formatedMarket: price.format(Number(data.market_cap)),
                        formatedLowprice: price.format(Number(data.low_24h)),
                        formatedHighprice: price.format(Number(data.high_24h))
                    }

                    setDetail(resultData)
                    setLoading(false)
                }).catch(rejected => {
                    navigate('/')
                    console.log(rejected)
                })
        }
        getData()
    }, [cripto])

    if (loading) {
        if (loading) {
            return (
                <div className={styles.container}>

                    <h1 className={styles.center}>Carregando Informações...</h1>

                </div>
            )
        }

    }


    return (
        <div className={styles.container}>

            <h1 className={styles.center}>{detail?.name}</h1>
            <p className={styles.center}>{detail?.symbol}</p>

            <section className={styles.content}>
                <p>
                    <strong>Preço:</strong>{detail?.formatedPrice}
                </p>

                <p>
                    <strong>Maior Preço 24h:</strong>{detail?.formatedHighprice}
                </p>

                <p>
                    <strong>Menor Preço 24h:</strong>{detail?.formatedLowprice}
                </p>

                <p>
                    <strong>Menor Preço 24h:</strong>
                    <span className={Number(detail?.delta_24h.replace(",", ".")) >= 0 ? styles.profit : styles.lows}>{detail?.delta_24h}</span>
                </p>

                <p>
                    <strong>Valor mercado:</strong>{detail?.formatedMarket}
                </p>

            </section>

        </div>
    )
}