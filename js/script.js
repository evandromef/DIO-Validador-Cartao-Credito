const form = document.getElementById('card-form');
const input = document.getElementById('card-number');
const resultDiv = document.getElementById('result');

// Permitir apenas números no input
input.addEventListener('input', function () {
    this.value = this.value.replace(/\D/g, '');
});

// Bandeiras e regex de identificação
const cardBrands = [
    {
        name: 'Mastercard',
        regex: /^(5[1-5][0-9]{14}|2(2[2-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[01][0-9]{13}|720[0-9]{12}))$/,
        icon: 'img/logo_master.jpg'
    },
    {
        name: 'Visa',
        regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
        icon: 'img/logo_visa.jpg'
    },
    {
        name: 'American Express',
        regex: /^3[47][0-9]{13}$/,
        icon: 'img/logo_american_express.jpg'
    },
    {
        name: 'Diners Club',
        regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
        icon: 'img/logo_diners.jpg'
    },
    {
        name: 'Discover',
        regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
        icon: 'img/logo_discover.jpg'
    },
    {
        name: 'EnRoute',
        regex: /^(2014|2149)[0-9]{11}$/,
        icon: 'img/logo_enroute.jpg'
    },
    {
        name: 'JCB',
        regex: /^(?:2131|1800|35\d{3})\d{11}$/,
        icon: 'img/logo_jcb.jpg'
    },
    {
        name: 'Voyager',
        regex: /^8699[0-9]{11}$/,
        icon: 'img/logo_voyager.jpg'
    },
    {
        name: 'HiperCard',
        regex: /^(606282\d{10}(\d{3})?)|(3841\d{15})$/,
        icon: 'img/logo_hiper.jpg'
    },
    {
        name: 'Aura',
        regex: /^50[0-9]{14,17}$/,
        icon: 'img/logo_aura.jpg'
    }
];

// Algoritmo de Luhn
function isValidCardNumber(number) {
    let sum = 0;
    let shouldDouble = false;
    for (let i = number.length - 1; i >= 0; i--) {
        let digit = parseInt(number.charAt(i));
        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) digit -= 9;
        }
        sum += digit;
        shouldDouble = !shouldDouble;
    }
    return sum % 10 === 0;
}

form.addEventListener('submit', function (e) {
    e.preventDefault();
    const cardNumber = input.value.trim();

    if (!/^\d{12,19}$/.test(cardNumber)) {
        showInvalid();
        return;
    }

    if (!isValidCardNumber(cardNumber)) {
        showInvalid();
        return;
    }

    const brand = cardBrands.find(b => b.regex.test(cardNumber));
    if (brand) {
        resultDiv.innerHTML = `<img src="${brand.icon}" alt="${brand.name}"> ${brand.name}`;
    } else {
        showInvalid();
    }
});

function showInvalid() {
    resultDiv.innerHTML = `<span style="color:#c00;">Número de cartão de crédito inválido, verifique e tente novamente</span>`;
}