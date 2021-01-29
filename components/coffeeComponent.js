export default class CoffeeStatus extends HTMLElement {
    constructor() {
        super();
        // Element functionality written in here

        //We store the shadowRoot as a class property to use it
        this.shadowObj = this.attachShadow({ mode: 'open' });

        this._level = 'Full';

        this._preparedAt = '29 jan 08:02';

        this._temperature = 'hot';

        this.render();
    };

    getLevel() {
        return this._level;
    };

    getPreparedAt() {
        return this._preparedAt;
    };

    getTemperature() {
        return this._temperature;
    }

    render() {
        this.shadowObj.innerHTML = this._getTemplate();
    };

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
            div{
                border-style: solid;
                padding: 1%;
                margin-bottom: 1%;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                background-color: #b08f70;
            }
        </style>
        <div>
            <img src="assets/coffee.jpg"></span>
            <p><b>Coffee level</b>: ${this.getLevel()}</p>
            <p><b>Prepared at</b>: ${this.getPreparedAt()}</p>
            <p><b>Temperature</b>: ${this.getTemperature()}</p>
        </div>
        `;
        return template;
    };
};

customElements.define("coffee-status", CoffeeStatus);