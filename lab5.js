var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var ArticleValidator = {
    validate: function (data) {
        var errors = [];
        if (!data.title || data.title.length < 5) {
            errors.push('Заголовок має бути не менше 5 символів.');
        }
        if (!data.body) {
            errors.push('Тіло не може бути порожнім.');
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
        };
    },
};
var ProductValidator = {
    validate: function (data) {
        var errors = [];
        if (data.price <= 0) {
            errors.push('Ціна має бути більше 0.');
        }
        if (data.stock < 0) {
            errors.push('Запас не може бути від’ємним.');
        }
        return {
            isValid: errors.length === 0,
            errors: errors,
        };
    },
};
var articleOperations = {
    create: function (content) { return (__assign(__assign({}, content), { id: Math.random().toString(36).substr(2, 9), createdAt: new Date(), updatedAt: new Date(), status: 'draft' })); },
    read: function (id) { return null; },
    update: function (id, content) { return null; },
    delete: function (id) { return true; },
    list: function () { return []; },
};
