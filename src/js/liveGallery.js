const classListLocation = ["lt", "lb", "rt", "rb"];

const checkContainsClass = (classList) => {
	/* Проверяет содержит ли класс блока при клике на block "live-gallery".  */

	for (let index = 0; index < classList.length; index++) {
		if ( classList[index].includes("layer") ) {
			return true;
		};
	};
};

const findClasslLocation = (pressedBlock) => {
	/* Находит класс местоположения блока.  */

	for (const classLocation in classListLocation) {
		if (pressedBlock.classList.contains(classListLocation[classLocation])) {
			return classListLocation[classLocation];
		};
	};
};


class LiveGallery {
    /**
	* @param container -> block "live-gallery"
	* @param options -> custom settings
	*/

	constructor(container, options) {
		this.container = container;
		this.options = options;

		this.widthContainerGallery = container.clientWidth;
		this.heightContainerGallery = container.clientHeight;
		this.percentPositionLeft = this.widthContainerGallery / 100;
		this.percentPositionTop = this.heightContainerGallery / 100;


		this.addOptions();
		this.createShadow();
		this.createTableClass();

		this.openBlock = () => {
			/* При клике на указанный блок октрывает его.  */

			if ( !checkContainsClass(event.target.classList) ) {
				return;
			};

			this.pressedBlock = event.target;
			this.createAnimationEmergenceBlock();

			this.removeEventClickGallery();
			document.addEventListener("click", this.closeBlock);
		};

		this.closeBlock = () => {
			/* При клике на неактивный участок или на сам блок то мы его удаляем.  */

			if (event.target === this.pressedBlock) {
				return;
			};

			this.deleteAnimationEmergenceBlock();

			this.removeEventClickGallery();
			this.addEventClickGallery();
		};
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
		this.classAnimates = (this.options.classAnimates) ? this.options.classAnimates : undefined;
	}

	addEventClickGallery() {
		/* Добавляет событие клик на галлерею.  */
		this.container.addEventListener("click", this.openBlock);
	}

	removeEventClickGallery() {
		this.container.removeEventListener("click", this.openBlock);
		document.removeEventListener("click", this.closeBlock);
	}

	createTableClass() {
		/* Содаёт таблицу классов для показа блока.  */

		this.classTable = {
			"lt": [
				"left: 50%",
				"top: 50%",
				"transform: translate(-50%, -50%) scale(1.25)"
			],
			"lb": [
				"left: 50%",
				"bottom: 50%",
				"transform: translate(-50%, 50%) scale(1.25)"
			],
			"rt": [
				"right: 50%",
				"top: 50%",
				"transform: translate(50%, -50%) scale(1.25)"
			],
			"rb": [
				"right: 50%",
				"bottom: 50%",
				"transform: translate(50%, 50%) scale(1.25)"
			]
		};
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

	createAnimationEmergenceBlock() {
		/* Реализует анимацию появление блока в центр (на показ).  */

		const classLocation = findClasslLocation(this.pressedBlock);
		const location = this.classTable[classLocation];

		this.animationPressedBtn = getComputedStyle(this.pressedBlock).animation;

		this.pressedBlock.style.cssText = "animation: none;"
		setTimeout(() => {
			this.pressedBlock.style.cssText = `
				animation: none;
				${location[0]};
				${location[1]};
				${location[2]};
				z-index: 40;
			`;
		}, 0)
	}

	deleteAnimationEmergenceBlock() {
		/* Возвращает блок на прежнее место.  */

		setTimeout(() => {
			this.pressedBlock.removeAttribute("style");
			this.pressedBlock.style.animation = "none";
		}, 0);

		setTimeout(() => {
			this.pressedBlock.style.animation = this.animationPressedBtn;
			this.pressedBlock = undefined;
		}, 501);
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
		this.renderStyle_InHead();

		this.addEventClickGallery();
	}
};


// const blockLiveGallery = document.querySelector(".live-gallery");

// const newLiveGallery = new LiveGallery(blockLiveGallery, {
// 	sunEffect: {
// 		turnOn: true,
// 		angleOincidence: 1.3
// 	},
// 	baseShadowTemplate: 6,
// 	baseShadowTransparency: 50,
// 	shadowMultiplicationFactor: 1.25,
// 	blurShadow: 30
// });
// newLiveGallery.run();
