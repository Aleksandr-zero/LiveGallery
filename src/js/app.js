import { LiveGallery } from "./liveGallery.js";


const blockLiveGallery = document.querySelector(".live-gallery");

const newLiveGallery = new LiveGallery(blockLiveGallery, {
	sunEffect: {
		turnOn: true, 
		angleOincidence: 1.3
	},
	baseShadowTemplate: 6,
	baseShadowTransparency: 50,
	shadowMultiplicationFactor: 1.25,
	blurShadow: 30
});
newLiveGallery.run();