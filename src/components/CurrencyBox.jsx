import React, { useState } from "react";
import InputBox from './InputBox.jsx';
import useCurrencyInfo from '../hooks/useCurrencyInfo';

function CurrencyConverter() {

    //define the currency list and sort in alpha order
    const currencyList = ["AUD - Australian Dollar", "CHF - Swiss Franc",
        "CNY - Chinese Yuan", "INR - Indian Rupee", "CAD - Canadian Dollar", "GBP - British Pound"
        , "USD - US Dollar", "EUR - Euro", "JPY - Japanese Yen"];
    currencyList.sort();

    //define the states of the variables of UI
    const [amount, setAmount] = useState(1);
    const [convertFrom, setConvertFrom] = useState("USD - US Dollar");
    const [convertTo, setConvertTo] = useState("INR - Indian Rupee");

    //get the currencyInfo from custom created hook
    const inputCurr = convertFrom.substring(0, 3).toLowerCase();
    const outputCurr = convertTo.substring(0, 3).toLowerCase();
    const currencyInfo = useCurrencyInfo(inputCurr);

    //conversion rate
    const conversionRate = Number(currencyInfo[outputCurr]);

    // Calculate result directly - no need for state
    const result = conversionRate && amount ? amount * conversionRate : 0;

    return (
        <div className="container">
            <h1 className="converter-title">Currency Converter</h1>

            <InputBox
                label="Input Amount:"
                type="number"
                amount={amount}
                onAmountChange={(amount)=>{
                    setAmount(amount)
                }}
            ></InputBox>

            <div className="currency-selectors">
                <select id="fromCurrency" className="currency-select"
                    value={convertFrom}
                    onChange={(e) => {
                        setConvertFrom(e.target.value);
                    }}>
                    {currencyList.map((currency) => {
                        return (
                            <option key={currency} value={currency}
                            >{currency}</option>
                        )
                    })}
                </select>

                <button className="swap-button"
                    id="swapButton"
                    onClick={() => {
                        const temp = convertFrom
                        setConvertFrom(convertTo)
                        setConvertTo(temp)
                    }}>⇄
                </button>

                <select id="toCurrency" className="currency-select"
                    value={convertTo}
                    onChange={(e) => {
                        setConvertTo(e.target.value);
                    }}>
                    {currencyList.map((currency) => {
                        return (
                            <option key={currency} value={currency}
                            >{currency}</option>
                        )
                    })}
                </select>
            </div>

            <InputBox
                label="Result: "
                type="text"
                amountDisable
                amount={result.toFixed(4)}
            ></InputBox>

            <div className="exchange-rate" id="exchangeRate">
                1 {convertFrom.substring(0, 3)} = {conversionRate ? conversionRate.toFixed(4) : "Loading..."} {convertTo.substring(0, 3)}
            </div>
        </div>
    )
};

export default CurrencyConverter;