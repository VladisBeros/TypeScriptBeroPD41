var modal = document.getElementById('modal');
var openModalBtn = document.getElementById('openModalBtn');
var closeBtn = document.querySelector('.close-btn');
var header = document.querySelector('header');
var fetchDataBtn = document.getElementById('fetchDataBtn');
if (openModalBtn && closeBtn && modal) {
    openModalBtn.addEventListener('click', function () {
        modal.style.display = 'flex';
    });
    closeBtn.addEventListener('click', function () {
        modal.style.display = 'none';
    });
    window.addEventListener('click', function (event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}
if (header) {
    window.addEventListener('scroll', function () {
        if (window.scrollY > 50) {
            header.style.backgroundColor = '#555';
        }
        else {
            header.style.backgroundColor = '#333';
        }
    });
}
if (fetchDataBtn) {
    fetchDataBtn.addEventListener('click', function () {
        fetch('https://jsonplaceholder.typicode.com/todos/1')
            .then(function (response) { return response.json(); })
            .then(function (json) {
            console.log(json);
            alert("\u0414\u0430\u043D\u043D\u0456: ".concat(json.title));
        })
            .catch(function (error) { return console.error('Помилка:', error); });
    });
}
