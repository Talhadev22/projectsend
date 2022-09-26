(function () {
    'use strict';

    admin.parts.login2faInputs = function () {

        $(document).ready(function () {
            // Adapted from Jinul's answer at
            // https://stackoverflow.com/questions/41698357/how-to-partition-input-field-to-appear-as-separate-input-fields-on-screen
            function OTPInput() {
                const otp_input_1 = document.querySelector('#otp_inputs #n1');
                if (typeof(otp_input_1) != 'undefined' && otp_input_1 != null){
                    otp_input_1.onpaste = pasteOTP;
                }

                const inputs = document.querySelectorAll('#otp_inputs > *[id]');
                for (let i = 0; i < inputs.length; i++) {
                    inputs[i].addEventListener('input', function (event) {
                        handleOTPNumericInput(event, this);
                    });

                    inputs[i].addEventListener('keyup', function (event) {
                        handleOTPNumericInput(event, this);
                    });

                    inputs[i].addEventListener('paste', function (event) {
                        handleOTPNumericInput(event, this);
                    });
                }
            }
            OTPInput();
        });

        function handleOTPNumericInput(event, el) {
            if (event.key !== 'undefined' && event.key != 'Backspace') {
                if (!isNumeric(event.target.value)) {
                    el.value = '';
                    el.focus();
                    return;
                }
            }
            if (!event.target.value || event.target.value == '') {
                if (event.target.previousSibling.previousSibling) {
                    event.target.previousSibling.previousSibling.focus();
                }
            } else {
                if (event.target.nextSibling.nextSibling) {
                    event.target.nextSibling.nextSibling.focus();
                }
            }
        }

        function pasteOTP(event) {
            event.preventDefault();
            let elm = event.target;
            let pasteVal = event.clipboardData.getData('text').split("");
            if (pasteVal.length > 0) {
                while (elm) {
                    elm.value = pasteVal.shift();
                    elm = elm.nextSibling.nextSibling;
                }
                const last = document.getElementById('n6').focus();
            }
        }
    };
})();