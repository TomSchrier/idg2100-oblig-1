export default class CoffeeStatus extends HTMLElement {
    constructor() {
        super();

        //We store the shadowRoot as a class property to use it
        this.shadowObj = this.attachShadow({ mode: 'open' });

        this._level;
        this._preparedAt;
        this._temperature;

        this.render();
    };

    getLevel() {
        if (this._level === 0) {
            return 'empty';
        } else if (this._level <= 0.5) {
            return 'almost empty';
        } else if (this._level <= 1.1) {
            return 'almost full';
        } else if (this._level <= 2.2) {
            return 'full';
        };
    };

    getPreparedAt() {
        return new Date(this._preparedAt).toUTCString();
    };

    getTemperature() {
        if (this._temperature >= 54) {
            return `${this._temperature} ℃ – hot`
        } else {
            return `${this._temperature} ℃ – cold`
        };
    };

    setLevel(newLevel) {
        this._level = newLevel;
    };

    setPreparedAt(newPreparedAt) {
        this._preparedAt = newPreparedAt;
    };

    setTemperature(newTemperature) {
        this._temperature = newTemperature;
    };

    setValues(newLevel, newPreparedAt, newTemperature) {
        this.setLevel(newLevel);
        this.setPreparedAt(newPreparedAt);
        this.setTemperature(newTemperature);
        this.render();
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
                max-width: 50%;
                min-width: 100px;
                height: auto;
                margin: auto;
                display: block;
            }
            div {
                border-style: solid;
                padding: 3%;
                margin-bottom: 1%;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                background-color: #b08f70;
                border-radius: 7px;
            }
            .bold-text {
                font-weight: bold;
            }
        </style>
        <div>
            <img src="assets/${this.getLevel().replace(" ", "-")}.png"></span>
            <p><span class="bold-text">Coffee level</span>: ${this.getLevel()}</p>
            <p><span class="bold-text">Prepared at</span>: ${this.getPreparedAt()}</p>
            <p><span class="bold-text">Temperature</span>: ${this.getTemperature()}</p>
        </div>
        `;
        return template;
    };
};

customElements.define("coffee-status", CoffeeStatus);