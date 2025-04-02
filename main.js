const err = document.querySelector(".error-message")
const btns = Array.from(document.querySelectorAll(".option"));
const tip = document.getElementById("tip");
const total = document.getElementById("total");
const reset = document.getElementById("reset");

const data = {
    0: 5,
    1: 10,
    2: 15,
    3: 25,
    4: 50,
    5: 0
}

btns.forEach((btn, index) => {
    if (index != btns.length - 1) {
        btn.addEventListener("click", () => {
            btns.forEach((btn) => {
                btn.classList.remove("selected");
            });
            btn.classList.add("selected");
            handler()
        });
    } else {
        btn.addEventListener("click", () => {
            btns.forEach((btn) => {
                btn.classList.remove("selected");
            });
        });
        btn.addEventListener("input", () => {
            data[5] = btn.value;
            handler()
        });
    }
});
bill.addEventListener("input", handler)
people.addEventListener("input", handler);
reset.addEventListener("click", clear)

function handler() {
    const bill = document.getElementById("bill");
    const people = document.getElementById("people");
    const reset = document.getElementById("reset");
    if (people.value == 0) {
        err.classList.add("showed");
        people.classList.add("err");
        reset.classList.remove('active-button')
        reset.setAttribute('disabled', true)
        return;
    }
    err.classList.remove("showed")
    people.classList.remove("err")
    
    let tipPercentage = 0;
    btns.forEach((btn, index) => {
        if (btn.classList.contains("selected") || index == btns.length - 1 && btn.value) tipPercentage = data[index];
    });
    const result = calculateTip(bill.value, tipPercentage, people.value);
    if (result) {
        tip.innerHTML = `$${(result.tipAmount).toFixed(2)}`;
        total.innerHTML = `$${(result.totalAmount).toFixed(2)}`;
        reset.classList.add('active-button')
        reset.removeAttribute('disabled')
    }
}

function calculateTip(bill=0, tipPercentage=0, people=0) {
    try {
        bill = parseFloat(bill);
        tipPercentage = parseFloat(tipPercentage);
        people = parseInt(people);
        const tipAmount = ((bill * tipPercentage) / 100) / people;
        const totalAmount = (bill / people) + tipAmount;
        if (isNaN(tipAmount) || isNaN(tipAmount)) return null
        return { tipAmount, totalAmount };
    } catch (error) {
        alert("add real numbers nigga")
    }
}


function clear() {
    const tip = document.getElementById("tip");
    const total = document.getElementById("total");
    tip.innerHTML = `$0.00`;
    total.innerHTML = `$0.00`;
    reset.classList.remove('active-button')
    reset.setAttribute('disabled', true)
}