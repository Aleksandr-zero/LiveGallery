# LiveGallery

Are you a designer? Photographer? Artist? And do not know how to beautifully
decorate your work on your website?</br>
Don't worry, this library might solve the problem with your portfolio design.

## Getting Started

```xml
<div class="live-gallery">
	<div class="live-gallery-container">
		<!-- your layer -->
		<div class="layer-1">1</div>
		<div class="layer-2">2</div>
		<div class="layer-1">3</div>
		<div class="layer-3">5</div>
		<div class="layer-2">4</div>
		<div class="layer-2">5</div>
		<!-- your layer -->
	</div>
</div>
```

**layer**: are responsible for overlapping blocks.</br>
For example, `layer-1` overlaps all lower-level layers (`layer-2` and `layer-3`), and `layer-2`
does not overlap the higher-level layer, but overlap the lower-level ones.

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
| `baseShadowTransparency` 		 | Base shadow opacity. **Parameters**: `int(0-100)` | `25` |
| `shadowMultiplicationFactor`   | Responsible for lowering the transparency of the lower layers by multiplying the `baseShadowTransparency`. **Parameters**: `float` | `1` |
| `blurShadow` 					 | Blur shadow. **Parameters**: `int` | `15` |
