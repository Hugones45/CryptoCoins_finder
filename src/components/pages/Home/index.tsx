import { useEffect, useState, FormEvent } from "react"
import styles from "./home.module.css"
import { BiSearch } from "react-icons/bi"
import { Link, useNavigate } from "react-router-dom"

interface coinsProps {
    symbol: string,
    name: string,
    price: string,
    market_cap: string,
    volume_24h: string,
    delta_24h: string,
    formatedPrice: string,
    formatedMarket: string,
    numberDelta: number
}

interface dataProps {
    coins: coinsProps[]
}

export function Home() {

    const [coins, setCoins] = useState<coinsProps[]>([])
    const [inputValue, setInputValue] = useState("")
    const [loading, setLoading] = useState(true)
    const navigate = useNavigate()

    useEffect(() => {
        function getData() {
            fetch("https://sujeitoprogramador.com/api-cripto/?key=67f9141787211428")

                .then(response => response.json())
                .then((data: dataProps) => {
                    let coinsData = data.coins.slice(0, 15)

                    let price = Intl.NumberFormat("pt-BR", {
                        style: "currency",
                        currency: "BRL"
                    })

                    const formatResult = coinsData.map((item) => {
                        const numberDelta = typeof item.delta_24h === 'string' ? parseFloat(item.delta_24h.replace(",", ".")) : 0;

                        const formated = {
                            ...item,
                            formatedPrice: price.format(Number(item.price)),
                            formatedMarket: price.format(Number(item.market_cap)),
                            numberDelta: numberDelta
                        };
                        return formated;
                    });

                    setLoading(false)
                    setCoins(formatResult)
                })
        }

        getData()
    }, [])

    function handleSearch(e: FormEvent) {
        e.preventDefault()

        if (inputValue === "") return;

        navigate(`/detail/${inputValue}`)
    }


    if (loading) {
        return (

            <div style={{ textAlign: "center", color: "#fff" }}>
                <h1>Carregando informações...</h1>
            </div>

        )

    }

    return (
        <main className={styles.container}>



            <form className={styles.form} onSubmit={handleSearch}>
                <input
                    style={{ paddingLeft: '20px' }}
                    type="text"
                    placeholder="Digite a moeda"
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                />

                <button type="submit"><BiSearch size={30} color="#fff" /></button>
            </form>


            <table>

                <thead>
                    <tr>
                        <th scope="col">Moeda</th>
                        <th scope="col">valor Mercado</th>
                        <th scope="col">Preço</th>
                        <th scope="col">Volume</th>
                    </tr>
                </thead>

                <tbody id="tbody">
                    {coins.map(coin => (
                        <tr key={coin.name} className={styles.tr}>

                            <td className={styles.tdLabel} data-label="Moeda">
                                <Link className={styles.Link} to={`/detail/${coin.symbol}`}>
                                    <span>{coin.name}</span> | {coin.symbol}
                                </Link>
                            </td>

                            <td className={styles.tdLabel} data-label="Mercado">{coin.formatedMarket}</td>

                            <td className={styles.tdLabel} data-label="Preço">{coin.formatedPrice}</td>

                            <td className={Number(coin.numberDelta) >= 0 ? styles.tdProfit : styles.tdLoss} data-label="Volume">
                                <span>{coin.delta_24h}</span>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>


        </main>
    )
}