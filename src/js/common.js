(function () {
    rangeSliderAction();
    formAction();
    mobMenuAction();

    $('#select-price').select2({
        allowClear: false,
        minimumResultsForSearch: Infinity
    });
})(window, document);


function rangeSliderAction() {
    let slider = document.getElementById('slider-round');

    noUiSlider.create(slider, {
        start: 1000,
        animate: false,
        step: 1000,
        connect: 'lower',
        range: {
            min: 1000,
            max: 3000
        }
    });
    slider.noUiSlider.on('update', function (values, handle) {
        let valElem = document.querySelector('#valueRange');

        let value = values[handle];
        valElem.innerHTML = Math.round(value);
    });
}

function formAction() {
    let forms = document.querySelectorAll('form');

    for (let form of forms) {
        form.addEventListener('submit', function (e) {
            e.preventDefault()
            if(validationForm(this) == true) {
                window.open('https://www.google.com/', '_blank')
            }
        });
    }

    function validationForm(form) {
        let result = true;
        let inputs = form.querySelectorAll('input');

        for (let input of inputs) {
            if (input.value == '' && input.type != 'checkbox') {
                input.closest('.field').classList.add('error');
                createMessage(errorMessage('name'));
                result = false;
                return result
            }
            if (input.value.length < 5 && input.type != 'checkbox') {
                input.closest('.field').classList.add('error');
                createMessage(errorMessage('short'));
                result = false;
                return result;
            }

            if (input.type == 'checkbox' && !input.checked) {
                createMessage(errorMessage('checkbox'));
                result = false;
                return result;
            }
        }
        return result
    }

    function createMessage(text) {
        clearTimeout(removeBlock)

        if (document.querySelector('.message-block') == null) {
            let div = document.createElement('div');
            div.classList.add('message-block')
            document.body.append(div);
        }

        let elem = document.querySelector('.message-block');

        elem.innerHTML = text;

        const animSet = {
            duration: 300,
            easing: "cubic-bezier(.21,.27,.46,.97)"
        }

        elem.animate([{
            transform: `translate(-50%, 50%)`,
        },],animSet).onfinish = () => {
            elem.style.transform = `translate(-50%, 50%)`;
        };


        let removeBlock = setTimeout(()=> {
            elem.animate([{
                transform: `translate(-50%, -100%)`,
            },],animSet).onfinish = () => {
                elem.style.transform = `translate(-50%, -100%)`;
            };
        }, 5000)
    }

    function errorMessage(err){
        let typeOfMessage = {
            short:'Name length must be more than 5 characters',
            name:'Please enter full name',
            checkbox:'Check checkbox'
        };
        return typeOfMessage[err];
    }
}

function mobMenuAction() {
    let hmBtn = document.querySelector('#hmBtn');
    let closePanel = document.querySelector('#closePanel');

    hmBtn.addEventListener('click', () => {
        document.body.classList.add('menu-open')
    })
    closePanel.addEventListener('click', () => {
        document.body.classList.remove('menu-open')
    })

    document.addEventListener('click', function(event) {
        if (!hmBtn.contains(event.target)
            && !document.querySelector('.m-panel').contains(event.target)) {
            document.body.classList.remove('menu-open')
        }
    });
}
