document.addEventListener('DOMContentLoaded', () => {
    const btnSearch = document.getElementById('btn-search');
    const inputName = document.getElementById('search-name');
    const selectType = document.getElementById('search-type');
    const inputDate = document.getElementById('search-date');

    if (btnSearch) {
        btnSearch.addEventListener('click', () => {

            const nameVal = encodeURIComponent(inputName.value.trim()); 
            const typeVal = selectType.value;
            const dateVal = inputDate.value;

            let url = `catalog.html?type=${typeVal}`;

            if (nameVal) {
                url += `&q=${nameVal}`;
            }

            if (dateVal) {
                url += `&date=${dateVal}`;
            }

            window.location.href = url;
        });
    }
});