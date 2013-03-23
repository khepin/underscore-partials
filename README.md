Travis status: [![Build Status](https://travis-ci.org/khepin/underscore-partials.png?branch=master)](https://travis-ci.org/khepin/underscore-partials)

# Allows you to use partial templates within Underscore templates

This lets you define some templates that can be used within other templates.

This is useful for small templates that need to be repeated in many places.

Example:
```html
<!-- star_rating.tmpl -->
<% for (var i = 0; i < rating; i++) { %>
    *
<% } %>

<!-- main.tmpl -->
<h1><%= product.name %></h1>
<div><%= _.partial('star_rating', {rating: product.rating}) %></div>
```

```javascript
var template = _.template(main.tmpl);
_.partial.declare('star_rating', star_rating.tmpl);
template({product: {name: "DVD Player", rating: 3}});
```

Will output
```html
<h1>DVD Player</h1>
<div>***</div>
```

# API

```javascript
// Declare a partial
_.partial.declare('partial_name', partialString);

// Use a partial
_.partial('partial_name');
// or
_.partial('partial_name', partial_data);

// Check if a partial exists
_.partial.exists('partial_name');

// Remove a partial that was declared before
_.partial.remove('partial_name');

```

# Contributing

## Setup the dependencies:

    bower install underscore
    bower install jasmine

## Setup Grunt

    npm install

## Run the test suite

    grunt jasmine

# Licence

This software is released under the MIT open source licence