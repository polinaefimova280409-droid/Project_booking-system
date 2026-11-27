```markdown
Листинги ключевого кода
```
1. Валидация формы обратной связи (validation.js)
Фрагмент кода, отвечающий за проверку введенной почты и вывод ошибки:

```javascript
if (!emailValue.includes('@') || !emailValue.includes('.')) {
    emailInput.classList.add('input-error');
    emailErrorText.textContent = "Введите почту в формате name@example.ru";
    emailErrorText.style.display = 'block';
    bannerMessage = "Укажите полный адрес электронной почты.";
    isValid = false;
}
```
2. Логика фильтрации каталога ресурсов (catalog.js)
Функция собирает данные из всех полей ввода (тип, поиск, характеристики) и перебирает все карточки. Реализована особая логика для параметра «Вместимость»: если пользователь ищет количество мест, карточки с оборудованием автоматически скрываются.

```javascript
const applySidebarFilters = () => {
    const typeValue = typeSelect ? typeSelect.value : 'all';
    const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';
    const capacityText = capacityInput ? capacityInput.value.trim().toLowerCase() : "";
    const featuresText = featuresInput ? featuresInput.value.trim().toLowerCase() : "";

    cards.forEach(card => {
        const badge = card.querySelector('.type-badge');
        const cardType = badge ? (badge.classList.contains('aud') ? 'aud' : 'eq') : '';

        const cardTitle = card.querySelector('h3').innerText.toLowerCase();
        const cardSpecs = card.querySelector('.item-specs').innerText.toLowerCase();
        const cardFeatures = card.querySelector('.item-features').innerText.toLowerCase();

        const matchesType = (typeValue === 'all' || typeValue === cardType);
        const matchesText = cardTitle.includes(searchText);
        const matchesFeatures = featuresText === "" || cardFeatures.includes(featuresText);

        let matchesCapacity = true;
        if (capacityText !== "") {
            if (cardType === 'eq') {
                matchesCapacity = false;
            } else {
                matchesCapacity = cardSpecs.includes(capacityText);
            }
        }

        if (matchesType && matchesText && matchesCapacity && matchesFeatures) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
};
