describe("Underscore partials", function() {
    it("can declare a new partial", function() {
        var partial = "hello";
        _.template.partial.declare("hello", partial);
        expect(_.template.partial("hello")).toBe("hello");
    });

    it("can overwrite an existing partial", function() {
        var partial = "hello";
        var new_partial = "hello mom!";
        _.template.partial.declare("hello", partial);
        _.template.partial.declare("hello", new_partial);
        expect(_.template.partial("hello")).toBe("hello mom!");
    });

    it("can tell you if a partial exists", function(){
        var partial = "hello";
        _.template.partial.declare("hello", partial);
        expect(_.template.partial.exists("hello")).toBe(true);
    });

    it("can tell you if a partial does not exist", function(){
        expect(_.template.partial.exists("this_partial_does_not_exist")).toBe(false);
    });

    it("can remove a partial", function(){
        var partial = "hello";
        _.template.partial.declare("hello", partial);
        expect(_.template.partial.exists("hello")).toBe(true);

        _.template.partial.remove("hello");
        expect(_.template.partial.exists("hello")).toBe(false);
    });

    it("gives you the full power of Underscore templates in a partial", function(){
        var partial = "Hello <%= name %>";
        _.template.partial.declare("hello", partial);
        expect(_.template.partial("hello", {name: "bob"})).toBe("Hello bob");
    });

    it("let's you use a partial inside of a template", function(){
        var template = "User rating: <%= _.template.partial('star_rating', {rating: 4}) %>";
        var partial = "<%= rating %> stars (<% for(var i = 0; i < rating; i++) { %>*<% } %>)";
        _.template.partial.declare('star_rating', partial);
        template = _.template(template);

        expect(template()).toBe("User rating: 4 stars (****)");
    });

    describe("with template setting", function() {
        beforeEach(function() {
            templateSettings1 = {
              interpolate: /<\@\=([\s\S]+?)\@\>/gim,
              evaluate: /<\@([\s\S]+?)\@\>/gim
            };
            templateSettings2 = {
              interpolate: /<\#\=([\s\S]+?)\#\>/gim,
              evaluate: /<\@([\s\S]+?)\@\>/gim
            };
        });

        it("can declare a new partial", function() {
            var partial = "hello";
            _.template.partial.declare("hello", partial, templateSettings1);
            expect(_.template.partial("hello")).toBe("hello");
        });

        it("can overwrite an existing partial", function() {
            var partial1 = "hello1 <@= name @>!";
            var partial2 = "hello2 <#= name #>!";
            _.template.partial.declare("hello", partial1, templateSettings1);
            _.template.partial.declare("hello", partial2, templateSettings2);
            expect(_.template.partial("hello", {name: "bob"})).toBe("hello2 bob!");
        });

        it("gives you the full power of Underscore templates in a partial", function(){
            var partial = "Hello <@= name @>";
            _.template.partial.declare("hello", partial, templateSettings1);
            expect(_.template.partial("hello", {name: "bob"})).toBe("Hello bob");
        });

        it("let's you use a partial inside of a template", function(){
            var partial = "<@= rating @> stars (<@ for(var i = 0; i < rating; i++) { @>*<@ } @>)";
            var template = "User rating: <#= _.template.partial('star_rating', {rating: 4}) #>";
            _.template.partial.declare('star_rating', partial, templateSettings1);
            template = _.template(template, undefined, templateSettings2);

            expect(template()).toBe("User rating: 4 stars (****)");
        });
    });
});

(function() {
    var jasmineEnv = jasmine.getEnv();
    jasmineEnv.updateInterval = 250;

    /**
    Create the `HTMLReporter`, which Jasmine calls to provide results of each spec and each suite. The Reporter is responsible for presenting results to the user.
    */
    var htmlReporter = new jasmine.HtmlReporter();
    jasmineEnv.addReporter(htmlReporter);

    /**
    Delegate filtering of specs to the reporter. Allows for clicking on single suites or specs in the results to only run a subset of the suite.
    */
    jasmineEnv.specFilter = function(spec) {
        return htmlReporter.specFilter(spec);
    };

    /**
    Run all of the tests when the page finishes loading - and make sure to run any previous `onload` handler

    ### Test Results

    Scroll down to see the results of all of these specs.
    */
    var currentWindowOnload = window.onload;
    window.onload = function() {
        if (currentWindowOnload) {
          currentWindowOnload();
        }

        execJasmine();
    };

    function execJasmine() {
    jasmineEnv.execute();
    }
})();
