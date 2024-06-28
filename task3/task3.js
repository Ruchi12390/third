const dropList = document.querySelectorAll(".drop-list select");
const fromCurrency = document.querySelector(".from-currency");
const toCurrency = document.querySelector(".to-currency");
const getButton = document.querySelector(".get-exchange-rate");

for (let i = 0; i < dropList.length; i++) {
    for (let code in country_code) {
        let selected = (i === 0 && code === "USD") || (i === 1 && code === "NPR") ? "selected" : "";
        let optionTag = `<option value="${code}" ${selected}>${code}</option>`;
        dropList[i].insertAdjacentHTML("beforeend", optionTag);
    }
    dropList[i].addEventListener("change", e => {
        loadFlag(e.target);
    });
}

function loadFlag(element) {
    for (let code in country_code) {
        if (code === element.value) {
            let imgTag = element.parentElement.querySelector("img");
            imgTag.src = `https://flagsapi.com/${country_code[code]}/flat/64.png`;
        }
    }
}

window.addEventListener("load", () => {
    getExchangeRate();
});

getButton.addEventListener("click", e => {
    e.preventDefault();
    getExchangeRate();
});

function getExchangeRate() {
    const amount = document.querySelector(".amount input");
    const exchangeRateTxt = document.querySelector(".exchange-rate");
    let amountVal = parseFloat(amount.value);
    
    if (isNaN(amountVal) || amountVal <= 0) {
        amount.value = "1";
        amountVal = 1;
    }
    exchangeRateTxt.innerText = "Getting exchange rate...";
    let url = `https://v6.exchangerate-api.com/v6/8f162dfb710228c973a8745e/latest/${fromCurrency.value}`;
    
    fetch(url)
        .then(response => response.json())
        .then(result => {
            let exchangeRate = result.conversion_rates[toCurrency.value];
            let totalExchangeRate = (amountVal * exchangeRate).toFixed(2);
            exchangeRateTxt.innerText = `${amountVal} ${fromCurrency.value} = ${totalExchangeRate} ${toCurrency.value}`;
        })
        .catch(error => {
            exchangeRateTxt.innerText = "Failed to fetch exchange rate. Please try again later.";
        });
}
