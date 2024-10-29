"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupFetchData = setupFetchData;
function setupFetchData(fetchDataBtn) {
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
}
