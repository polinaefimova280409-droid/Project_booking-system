document.addEventListener('DOMContentLoaded', () => {

    const forms = document.querySelectorAll('.validation-form');

    forms.forEach(form => {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            const emailInput = form.querySelector('input[type="email"]');
            const messageInput = form.querySelector('textarea');
            
            const errorBanner = form.querySelector('.error-banner');
            const errorBannerText = form.querySelector('.error-banner-text');

            const emailErrorText = emailInput.nextElementSibling;
            const messageErrorText = messageInput.nextElementSibling;

            let isValid = true;
            let bannerMessage = "";

            errorBanner.style.display = 'none';
            emailErrorText.style.display = 'none';
            messageErrorText.style.display = 'none';
            emailInput.classList.remove('input-error');
            messageInput.classList.remove('input-error');

            const emailValue = emailInput.value.trim();
            const messageValue = messageInput.value.trim();

            if (!emailValue) {
                emailInput.classList.add('input-error');
                emailErrorText.textContent = "Заполните обязательное поле «Электронная почта».";
                emailErrorText.style.display = 'block';
                bannerMessage = "Заполните обязательное поле «Электронная почта».";
                isValid = false;
            } else if (!emailValue.includes('@') || !emailValue.includes('.')) {
                emailInput.classList.add('input-error');
                emailErrorText.textContent = "Введите почту в формате name@example.ru";
                emailErrorText.style.display = 'block';
                bannerMessage = "Укажите полный адрес электронной почты.";
                isValid = false;
            } else if (emailValue.includes(' ')) {
                emailInput.classList.add('input-error');
                emailErrorText.textContent = "Уберите пробелы из адреса электронной почты.";
                emailErrorText.style.display = 'block';
                bannerMessage = "В адресе почты есть недопустимые символы.";
                isValid = false;
            }

            if (!messageValue) {
                messageInput.classList.add('input-error');
                messageErrorText.style.display = 'block';
                if (!isValid) {
                    bannerMessage = "Укажите почту и напишите сообщение.";
                } else {
                    bannerMessage = "Заполните обязательное поле «Сообщение».";
                }
                isValid = false;
            }

            if (!isValid) {
                errorBannerText.textContent = bannerMessage;
                errorBanner.style.display = 'flex';
                return;
            }

            window.location.hash = '#support-sent'; 

            form.reset();
        });
    });
});