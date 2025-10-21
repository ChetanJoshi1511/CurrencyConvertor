import React from 'react'

function InputBox({
    label,
    amount,
    type,
    onAmountChange, //callback function to handle amount change
    amountDisable = false, 
}){
    return(
        <div className="input-group">
                <label htmlFor="amount">{label}</label>
                <input
                    type={type}
                    id="amount"
                    className="amount-input"
                    placeholder={type=="number" ? "Amount" : ""}
                    min="0"
                    step="0.01"
                    disabled={amountDisable}
                    value={amount}
                    onChange={(e)=>{
                        onAmountChange(Number(e.target.value));
                    }}
                ></input>
        </div>
    )
}

export default InputBox;