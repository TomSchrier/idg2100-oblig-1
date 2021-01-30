export default class CoffeeStatus extends HTMLElement {
    constructor() {
        super();
        // Element functionality written in here

        //We store the shadowRoot as a class property to use it
        this.shadowObj = this.attachShadow({ mode: 'open' });

        this._level = '';

        this._preparedAt = '';

        this._temperature = '';

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

    setLevel(newLevel){
        this._level = newLevel;
    };

    setPreparedAt(newPreparedAt){
        this._preparedAt = newPreparedAt;
    };

    setTemperature(newTemperature){
        this._temperature = newTemperature;
    };

    setValues(newLevel, newPreparedAt, newTemperature){
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
                max-width: 100%;
                min-width: 100px;
                height: auto;
            }
            div {
                border-style: solid;
                padding: 3%;
                margin-bottom: 1%;
                box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);
                background-color: #b08f70;
                border-radius: 7px;
            }
        </style>
        <div>
            <img src="assets/coffee.jpg"></span>
            <p>Coffee level: ${this.getLevel()}</p>
            <p>Prepared at: ${this.getPreparedAt()}</p>
            <p>Temperature: ${this.getTemperature()} ℃</p>
        </div>
        `;
        return template;
    };
};

customElements.define("coffee-status", CoffeeStatus);