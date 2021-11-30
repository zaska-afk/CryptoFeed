import { useState } from "react";
import ExchangeRate from "./ExchangeRate";
import axios from "axios";

function CurrencyConverter() {
  const currencies = ["BTC", "ETH", "USD", "XRP", "LTC", "ADA"];
  const [chosenPrimaryCurrency, setChosenPrimaryCurrency] = useState("BTC");
  const [chosenSecondaryCurrency, setChosenSecondaryCurrency] = useState("USD");
  const [ammount, setAmount] = useState(1);
  const [exchangeRate, setExchangeRate] = useState(0);
  const [primaryCurrencyExchange, setPrimaryCurrencyExchange] = useState("BTC");
  const [secondaryCurrencyExchange, setSecondaryCurrencyExchange] =
    useState("USD");
  const [result, setResult] = useState(0);

  console.log("prime currency: " + chosenPrimaryCurrency);
  console.log("secondary currency: " + chosenSecondaryCurrency);
  console.log("ammount: " + ammount);

  const convert = () => {
    const options = {
      method: "GET",
      url: "https://alpha-vantage.p.rapidapi.com/query",
      params: {
        from_currency: chosenPrimaryCurrency,
        function: "CURRENCY_EXCHANGE_RATE",
        to_currency: chosenSecondaryCurrency,
      },
      headers: {
        "x-rapidapi-host": "alpha-vantage.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_RAPID_API_KEY,
      },
    };

    axios
      .request(options)
      .then((response) => {
        console.log(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setExchangeRate(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]
        );
        setResult(
          response.data["Realtime Currency Exchange Rate"]["5. Exchange Rate"] *
            ammount
        );
        setPrimaryCurrencyExchange(chosenPrimaryCurrency);
        setSecondaryCurrencyExchange(chosenSecondaryCurrency);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  console.log(exchangeRate);
  return (
    <div className="currency-converter">
      <h2>Currency Converter</h2>
      <div className="input-box">
        <table>
          <tbody>
            <tr>
              <td> Primary Currency: </td>
              <td>
                <input
                  type="number"
                  name="currency-ammount-1"
                  value={ammount}
                  onChange={(e) => setAmount(e.target.value)}
                />
              </td>
              <td>
                {" "}
                <select
                  value={chosenPrimaryCurrency}
                  name="currency-option-1"
                  className="currency-options"
                  onChange={(e) => setChosenPrimaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>{" "}
              </td>
            </tr>
            <tr>
              <td> Secondary Currency: </td>
              <td>
                <input
                  name="currency-ammount-2"
                  value={result}
                  disabled={true}
                />
              </td>
              <td>
                {" "}
                <select
                  value={chosenSecondaryCurrency}
                  name="currency-option-2 "
                  className="currency-options"
                  onChange={(e) => setChosenSecondaryCurrency(e.target.value)}
                >
                  {currencies.map((currency, _index) => (
                    <option key={_index}>{currency}</option>
                  ))}
                </select>{" "}
              </td>
            </tr>
          </tbody>
        </table>
        <button id="convert-button" onClick={convert}>
          Convert
        </button>
      </div>
      <ExchangeRate
        exchangeRate={exchangeRate}
        chosenPrimaryCurrency={primaryCurrencyExchange}
        chosenSecondaryCurrency={secondaryCurrencyExchange}
      />
    </div>
  );
}

export default CurrencyConverter;
