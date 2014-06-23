(function() {
    /**
     * Allow underscore use of partials
     */
    var partialCache = {};

    var partial = function(name, data) {
        return partialCache[name](data);
    };

    partial.declare = function(name, template, templateSettings) {
        partialCache[name] = _.template(template, undefined, templateSettings);
    };

    partial.exists = function(name) {
        return _.isFunction(partialCache[name]);
    };

    partial.remove = function(name) {
        delete partialCache[name];
    };

    _.mixin({
        partial: partial
    });
})();
