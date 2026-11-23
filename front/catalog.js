document.addEventListener('DOMContentLoaded'), () => {}
    const cards = document.querySelectorAll('.item-card');
    
    const searchInput = document.getElementById('filter-search');
    const typeSelect = document.getElementById('filter-type');
    const dateInput = document.getElementById('filter-date');
    const timeInput = document.getElementById('filter-time');
    const capacityInput = document.getElementById('filter-capacity');
    const featuresInput = document.getElementById('filter-features');
    
    const btnApply = document.getElementById('btn-apply-filters');
    const btnReset = document.getElementById('btn-reset-filters');
    const counterText = document.getElementById('results-counter');

    const defaultDate = "2026-11-16";

    const scheduleData = {
        "Лаборатория 305": ["10:00-11:30", "12:00-13:30"],
        "Проектор Epson": ["10:00-11:30"],
        "Переговорная 118": ["10:00-11:30", "14:00-15:30"],
        "Лаборатория 208": ["10:00-11:30"],
        "Комплект Arduino Uno": ["10:00-11:30"],
        "Шлем VR Meta Quest": ["10:00-11:30"],
        "Аудитория 304": ["14:00-15:30"],
    };

    const getFormattedDate = () => {
        const d = new Date(dateInput.value || defaultDate);
        const months = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
        return `${d.getDate()} ${months[d.getMonth()]}`;
    };

    const getNoun = (number, one, two, five) => {
        let n = Math.abs(number);
        n %= 100;
        if (n >= 5 && n <= 20) return five;
        n %= 10;
        if (n === 1) return one;
        if (n >= 2 && n <= 4) return two;
        return five;
    };

    const updateCounter = () => {
        let visibleCount = 0;
        cards.forEach(card => {
            if (card.style.display !== 'none') visibleCount++;
        });

        const selectedTime = timeInput ? timeInput.value : "";
        const formattedDate = getFormattedDate();

        let counterString = `${visibleCount} ${getNoun(visibleCount, 'ресурс', 'ресурса', 'ресурсов')} • ${formattedDate}`;
        if (selectedTime) counterString += `, ${selectedTime}`;
        
        if (counterText) counterText.textContent = counterString;
    };

    const updateCardStatuses = () => {
        const selectedTime = timeInput ? timeInput.value : "";
        
        cards.forEach(card => {
            const originalTitle = card.querySelector('h3').innerText;
            const statusSpan = card.querySelector('.item-status');
            const actionLink = card.querySelector('.item-action');
            
            let isBusy = false;
            if (selectedTime && scheduleData[originalTitle]) {
                if (scheduleData[originalTitle].includes(selectedTime)) {
                    isBusy = true;
                }
            }

            if (selectedTime) {
                if (isBusy) {
                    statusSpan.textContent = "Занято в выбранное время";
                    statusSpan.className = "item-status busy";
                    actionLink.innerHTML = "Другое время &rarr;";
                    actionLink.className = "item-action muted";
                } else {
                    statusSpan.textContent = "Свободно в выбранное время";
                    statusSpan.className = "item-status free";
                    actionLink.innerHTML = "Выбрать время &rarr;";
                    actionLink.className = "item-action";
                }
            } else {
                statusSpan.textContent = "Выберите время";
                statusSpan.className = "item-status";
            }
        });
    };

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

        updateCardStatuses();
        updateCounter();
    };

    if (btnApply) {
        btnApply.addEventListener('click', applySidebarFilters);
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (typeSelect) typeSelect.value = 'all';
            if (dateInput) dateInput.value = defaultDate; 
            if (timeInput) timeInput.value = ''; 
            if (capacityInput) capacityInput.value = '';
            if (featuresInput) featuresInput.value = '';
            
            applySidebarFilters();
        });
    }

    if (dateInput) dateInput.addEventListener('change', updateCounter);

    if (!dateInput.value) dateInput.value = defaultDate;

    const urlParams = new URLSearchParams(window.location.search);
    const typeParam = urlParams.get('type');
    const searchParam = urlParams.get('q'); 

    if (typeParam && typeSelect) typeSelect.value = typeParam;
    
    if (searchParam && searchInput) {
        searchInput.value = decodeURIComponent(searchParam);
    }

    applySidebarFilters();
    if (window.location.search !== "") {
        window.history.replaceState({}, document.title, window.location.pathname);
    };