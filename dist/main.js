"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var uiEvents_1 = require("./modules/uiEvents/uiEvents");
var scrollHeader_1 = require("./modules/scrollHeader/scrollHeader");
var fetchData_1 = require("./modules/fetchData/fetchData");

var modal = document.getElementById('modal');
var openModalBtn = document.getElementById('openModalBtn');
var closeBtn = document.querySelector('.close-btn');
var header = document.querySelector('header');
var fetchDataBtn = document.getElementById('fetchDataBtn');

(0, uiEvents_1.setupModal)({ modal: modal, openModalBtn: openModalBtn, closeBtn: closeBtn });

(0, scrollHeader_1.setupScrollHeader)(header);

(0, fetchData_1.setupFetchData)(fetchDataBtn);