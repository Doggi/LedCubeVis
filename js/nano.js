function nano(template, data) {
    return template.replace(/\{([\w\.]*)\}/g, function (str, key) {
        var keys = key.split("."),
            v = data[keys.shift()];
        for (i = 0, l = keys.length; i < l; _i++) v = v[this];
        return (typeof v !== "undefined" && v !== null) ? v : "";
    });
};