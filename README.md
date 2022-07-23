# [LiveGallery](https://zer0s2m.github.io/LiveGallery/app/)

Are you a designer? Photographer? Artist? And do not know how to beautifully
decorate your work on your website?</br>
Don't worry, this library might solve the problem with your portfolio design.

## Getting Started

Connection JS:
```xml
<script src="https://aleksandr-zero.github.io/LiveGallery/LiveGallery/liveGallery.js"></script>
```

Connect default CSS:
```xml
<link rel="stylesheet" href="https://aleksandr-zero.github.io/LiveGallery/LiveGallery/liveGallery.css">
```

### HTML

```xml
<div class="live-gallery">
  <div class="live-gallery-container">
    <!-- your layer -->
    <div class="layer-1 lt">1</div>
    <div class="layer-2 rt">2</div>
    <div class="layer-1 rb">3</div>
    <div class="layer-3 rt">5</div>
    <div class="layer-2 lb">4</div>
    <div class="layer-2 lt">5</div>
    <!-- your layer -->
  </div>
</div>
```

**layer**: are responsible for overlapping blocks.<br>
For example, `layer-1` overlaps all lower-level layers (`layer-2` and `layer-3`), and `layer-2`
does not overlap the higher-level layer, but overlap the lower-level ones.

<span style="text-decoration: underline;">**Your block must have one of the layer class!**</span><br>
<span style="text-decoration: underline;">**Support only goes up to level 3!**</span>

**You set the height for the `live-gallery` block manually**

**Class Location** is responsible for the location of your **layer**.

| Class Location  | Description     |
|-----------------|-----------------|
| `lt` | Entries in **css**: `left: <count>; top: <count>`    |
| `lb` | Entries in **css**: `left: <count>; bottom: <count>` |
| `rt` | Entries in **css**: `right: <count>; top: <count>`   |
| `rb` | Entries in **css**: `right: <count>; bottom: <count>`|

<span style="text-decoration: underline;">**Your layer must contain a location class!**</span>

**Default animations**

| Default animations                     | Description       |
|----------------------------------------|-------------------|
| **class** -> `heartbeat-effect-active` | Adds a heartbeat effect |
| **class** -> `wave-effect`             | Adds a wave effect |

### JS

```js
const blockLiveGallery = document.querySelector(".live-gallery");

const newLiveGallery = new LiveGallery(blockLiveGallery, {
  sunEffect: {
    turnOn: true, 
    angleOincidence: 1
  },
  baseShadowTemplate: 6,
  baseShadowTransparency: 50,
  shadowMultiplicationFactor: 1.25,
  blurShadow: 25
});
newLiveGallery.run();
```

| Option                         | Description     | Default |
|--------------------------------|-----------------|---------|
| `sunEffect` | Sun effect - drop shadow angle by hour. **Parameters**: `{turnOn: true / false , angleOincidence: float(1-12)}` | `false` |
| `baseShadowTemplate` | The base shadow template is responsible for how your shadow will propagate along the x and y axes. The larger the number, the further it will spread. **Parameters**: `float` | `3` |
| `baseShadowTransparency` 		   | Base shadow opacity. **Parameters**: `int(0-100)` | `25` |
| `shadowMultiplicationFactor`   | Responsible for lowering the transparency of the lower layers by multiplying the `baseShadowTransparency`. **Parameters**: `float` | `1` |
| `blurShadow` 					 				 | Blur shadow. **Parameters**: `int` | `15` |
