document.addEventListener('DOMContentLoaded', () => {

    const tabs = document.querySelectorAll('.tab-btn');
    const cards = document.querySelectorAll('.item-card');

    const searchInput = document.getElementById('filter-search');
    const typeSelect = document.getElementById('filter-type');

    const btnApply = document.getElementById('btn-apply-filters');
    const btnReset = document.getElementById('btn-reset-filters');

    const applyFilters = () => {

        const activeTab = document.querySelector('.tab-btn.active');
        const activeTabValue = activeTab ? activeTab.getAttribute('data-filter') : 'all';

        const selectValue = typeSelect ? typeSelect.value : 'all';

        const currentFilterType = selectValue !== 'all' ? selectValue : activeTabValue;

        const searchText = searchInput ? searchInput.value.trim().toLowerCase() : '';

        cards.forEach(card => {
            const badge = card.querySelector('.type-badge');
            const cardType = badge ? (badge.classList.contains('aud') ? 'aud' : 'eq') : '';
            const cardTitle = card.querySelector('h3').innerText.toLowerCase();

            const matchesType = (currentFilterType === 'all' || currentFilterType === cardType);

            const matchesText = cardTitle.includes(searchText);

            if (matchesType && matchesText) {
                card.style.display = 'flex';
            } else {
                card.style.display = 'none';
            }
        });
    };

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filterValue = tab.getAttribute('data-filter');
            if (typeSelect) typeSelect.value = filterValue;
            
            applyFilters();
        });
    });

    if (typeSelect) {
        typeSelect.addEventListener('change', () => {
            const selectedValue = typeSelect.value;

            tabs.forEach(t => t.classList.remove('active'));
            const targetTab = document.querySelector(`.tab-btn[data-filter="${selectedValue}"]`);
            if (targetTab) targetTab.classList.add('active');
            
            applyFilters();
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters); 
    }

    if (btnApply) {
        btnApply.addEventListener('click', applyFilters);
    }

    if (btnReset) {
        btnReset.addEventListener('click', () => {
            if (searchInput) searchInput.value = '';
            if (typeSelect) typeSelect.value = 'all';
            tabs.forEach(t => t.classList.remove('active'));
            const allTab = document.querySelector('.tab-btn[data-filter="all"]');
            if (allTab) allTab.classList.add('active');
            
            applyFilters();
        });
    }