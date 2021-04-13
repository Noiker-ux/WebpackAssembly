require("../styles/index.scss");
require("../img/gitCat.jpg");
const elvenShieldRecipe = {
	leatherStrips: 2,
	ironIngot: 1,
	refinedMoonstone: 4,
};
const elvenGauntletsRecipe = {
	...elvenShieldRecipe,
	leather: 1,
	refinedMoonstone: 4,
};
console.log(elvenShieldRecipe);
console.log(elvenGauntletsRecipe);
class ElementName extends HTMLElement {
	constructor() {
		super();
		console.log("FkYeah");
	}
}

if (!customElements.get("tag-name")) {
	customElements.define("tag-name", ElementName);
}
