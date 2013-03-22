(function(){

    /**
     * Allow underscore use of partials
     */
    _.mixin((function(){
        var partialCache = {};

        var mixin = {
            partial: function(name, data) {
                return partialCache[name](data);
            }
        };

        mixin.partial.declare = function(name, template) {
            partialCache[name] = _.template(template);
        };

        mixin.partial.exists = function(name) {
            return !_.isUndefined(partialCache[name]);
        };

        mixin.partial.remove = function(name) {
            delete partialCache[name];
        };

        return mixin;
    })());

})();