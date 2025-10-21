import { useEffect, useState } from "react";

function useCurrencyInfo(currency){
    const [data,setData] = useState({});
    useEffect(()=>{
        fetch(
        `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
        )
        .then((res)=>{
            if(!res.ok) throw new Error(`HTTP Error! status: ${res.status}`);
            return res.json();
        })
        .then((res)=>{
            setData(res[currency]);
        }).catch((err)=>{
            console.error("Fetch error:",err);
            setData({}); //reset state on error
        });
    },
    [currency]
    );
    console.log(data);
    return data;
}

export default useCurrencyInfo;