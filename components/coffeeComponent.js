export default class CoffeeStatus extends HTMLElement {
    constructor() {
        super();
        // Element functionality written in here

        //We store the shadowRoot as a class property to use it
        this.shadowObj = this.attachShadow({ mode: 'open' });
        this.render();
    };

    render(){
        this.shadowObj.innerHTML = this._getTemplate()
    }
    _getTemplate() {
        const template = `
        <style>
            p {
                font-size: 1.5em;
            }
            img {
                max-width: 100%;
                min-width: 100px;
                height: auto;
            }
        </style>
        <div>
            <img src="assets/coffee.jpg"></span>
            <p>Test</p>
        </div>
        `;
        return template;
    };
};

customElements.define("coffee-status", CoffeeStatus);