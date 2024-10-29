"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupModal = setupModal;
function setupModal(_a) {
    var modal = _a.modal, openModalBtn = _a.openModalBtn, closeBtn = _a.closeBtn;
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
}
