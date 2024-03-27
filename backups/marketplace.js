window.onload = function () {
    updatePrice();
};

function updatePrice() {
    var price = parseFloat(document.getElementById('itemPrice').innerText);
    var quantity = document.getElementById('itemCounter').value;
    var finalPrice = price * quantity;
    document.getElementById('finalPrice').innerText = "Final Price: $" + finalPrice;
}

function increment() {
    var counter = document.getElementById('itemCounter');
    counter.value = parseInt(counter.value) + 1;
    updatePrice();
}

function decrement() {
    var counter = document.getElementById('itemCounter');
    if (counter.value > 1) {
        counter.value = parseInt(counter.value) - 1;
        updatePrice();
    }
}

function rotEnode(input) {
    return input.replace(/[!-~]/g, function (c) {
        return String.fromCharCode((c.charCodeAt(0) + 14) % 94 + 33);
    });
}

const spell = '36cc6f4082acd41f3d05cc1d43387e70';

function buyNow() {

    var amount = parseInt(document.getElementById('itemCounter').value);
    var finalPrice = parseFloat(document.getElementById('finalPrice').innerText.replace('Final Price: $', ''));

    var hash1 = CryptoJS.MD5(amount.toString()).toString();
    var hash2 = rotEnode((finalPrice + spell).toString());

    var body = {
        amount: amount,
        price: finalPrice,
        hash1: hash1,
        hash2: hash2
    };

    fetch('/buy', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(body)
    })
        .then(response => {
            return response.text().then(text => {
                if (response.ok) {
                    alert(text);  
                } else {
                    alert(text);  
                }
            });
        })
        .catch(error => {
            alert('Server error');
        });

}

