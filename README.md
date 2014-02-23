# Kist Redraw

Redraw elements on page (particularly for IE).

## Usage

1. Include jQuery and plugin (CSS and JS).

    ```html
    <link rel="stylesheet" href="dist/kist-redraw.min.css" />
    <script src="jquery.min.js"></script>
    <script src="dist/kist-redraw.min.js">
    ```

2. Initialize plugin.

    ```javascript
    $('.element').KistRedraw();
    ```

## Options

#### `timeout`

Type: `Number`
Default value: `50`

Timeout between applying and removing redrawing styles.

## Global options

#### `$.KistRedraw.defaults.timeout`

Type: `Number`
Default value: `50`

Globally change timeout between applying and removing redrawing styles.

## Events

#### `redrawComplete.kist.dochopper`

Attached to: calling element

Triggered when redrawing is fully complete.
