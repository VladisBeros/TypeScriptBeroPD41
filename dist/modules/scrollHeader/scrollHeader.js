"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupScrollHeader = setupScrollHeader;
function setupScrollHeader(header) {
    if (header) {
        window.addEventListener('scroll', function () {
            header.style.backgroundColor = window.scrollY > 50 ? '#555' : '#333';
        });
    }
}
