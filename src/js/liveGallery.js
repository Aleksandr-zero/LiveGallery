export class LiveGallery {
    /**
	* @param container -> block "live-gallery"
	* @param options -> custom settings
	*/

	constructor(container, options) {
		this.container = container;
		this.options = options;

		this.addOptions();
		this.createShadow();
	}

	addOptions() {
		/* Устанавливает пользовательские настройки.  */

		this.sunEffect = (this.options.sunEffect.turnOn) ? this.options.sunEffect : false;

		if (this.sunEffect) {
			this.angleOincidence = this.sunEffect.angleOincidence;
		};

		this.baseShadowTemplate = (this.options.baseShadowTemplate) ? this.options.baseShadowTemplate : 3;
		this.baseShadowTransparency = (this.options.baseShadowTransparency) ? this.options.baseShadowTransparency : 25;
		this.shadowMultiplicationFactor = (this.options.shadowMultiplicationFactor) ?
											this.options.shadowMultiplicationFactor : 1;
		this.blurShadow = (this.options.blurShadow) ? this.options.blurShadow : 15;
	}

	addEventClickGallery() {
		/* Добавляет событие клик на галлерею.  */

		this.container.addEventListener("click", () => {
			this.openBlock();
		});
	}

	openBlock() {
		/* При клике на указанный блок октрывает его.  */

		const pressedBlock = event.target;

		pressedBlock.classList.add("live-gallery-item-active");
	}

	createShadow() {
		/* Создаёт тень для слоя.  */

		if (!this.sunEffect) {
			this.boxShadow = `0px 0px ${this.blurShadow}px rgba(0, 0, 0, transparency)`;
			return;
		};

		if (this.angleOincidence === 12) {
			this.boxShadow = `0px ${this.baseShadowTemplate * 3}px ${this.blurShadow}px rgba(0, 0, 0, {{ transparency }})`;

		} else if (this.angleOincidence === 6) {
			this.boxShadow = `0px -${this.baseShadowTemplate * 3}px ${this.blurShadow}px rgba(0, 0, 0, {{ transparency }})`;

		} else if (this.angleOincidence < 6) {
			let positionX = ( this.baseShadowTemplate * this.angleOincidence / 2 ) * ( this.baseShadowTemplate / this.angleOincidence );
			let positionY =  this.baseShadowTemplate * ( this.baseShadowTemplate / this.angleOincidence );

			positionX = Math.round(positionX);
			positionY = Math.round((this.angleOincidence >= 4) ? -(positionY) : positionY);

			this.boxShadow = `-${positionX}px ${positionY}px ${this.blurShadow}px rgba(0, 0, 0, {{ transparency }})`;

		} else if (this.angleOincidence > 6) {
			let positionX = ( this.baseShadowTemplate * this.angleOincidence / 5 ) * ( this.angleOincidence / this.baseShadowTemplate );
			let positionY = ( this.baseShadowTemplate * this.angleOincidence / 3.7 ) * ( this.baseShadowTemplate / this.angleOincidence ) + 4;

			positionX = Math.round(positionX);
			positionY = Math.round((this.angleOincidence <= 9) ? -(positionY) : positionY);
			
			this.boxShadow = `${positionX}px ${positionY}px ${this.blurShadow}px rgba(0, 0, 0, {{ transparency }})`;
		};
	}


	findsBlocksByLayers() {
		/* Находить блоки по слоям.  */

		this.blocksLayer_1 = this.container.querySelectorAll(".layer-1");
		this.blocksLayer_2 = this.container.querySelectorAll(".layer-2");
		this.blocksLayer_3 = this.container.querySelectorAll(".layer-3");
	}


	renderStyle_InHead() {
		/* Рендерит стили для блоков с слоями.  */

		const headDocument = document.querySelector("head");
		const blockStyle = document.createElement("style");

		blockStyle.innerHTML = `
			.layer-1 { box-shadow: ${this.boxShadow.replace(/{{ transparency }}/g, `${this.baseShadowTransparency}%`)}; }
			.layer-2 { box-shadow: ${this.boxShadow.replace(/{{ transparency }}/g, `${this.baseShadowTransparency * this.shadowMultiplicationFactor}%`)}; }
			.layer-3 { box-shadow: ${this.boxShadow.replace(/{{ transparency }}/g, `${this.baseShadowTransparency * this.shadowMultiplicationFactor}%`)}; }
		`;

		headDocument.append(blockStyle);
	}


	run() {
		this.findsBlocksByLayers();
		this.renderStyle_InHead();

		this.addEventClickGallery();
	}
};
