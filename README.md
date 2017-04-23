![Unmaintained project](https://img.shields.io/badge/status-unmaintained-red.svg)

**This project is unmaintained.**

Not needed for modern browsers.

---

# kist-redraw

Redraw elements on page for IE.

## Installation

```sh
bower install niksy/kist-redraw
```

## API

### `Element.redraw()`

Redraw elements on page for IE.

### Global options

#### `$.kist.redraw.defaults`

Type: `Object`

##### timeout

Type: `Number`  
Default: `15`

Change timeout between applying and removing redrawing styles.

### Events

#### `complete.kist.redraw`

Triggered when redrawing is complete.

## Examples

```js
$('.block').redraw();
```

## Browser support

IE8. Other browsers ignore plugin changes.

## Acknowledgments
  
* [Forcing IE8 to rerender/repaint :before/:after pseudo elements](http://stackoverflow.com/a/8852418/178058)

## License

MIT © [Ivan Nikolić](http://ivannikolic.com)
