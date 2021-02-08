export default class CoffeeStatus extends HTMLElement {
    constructor() {
        super();

        //We store the shadowRoot as a class property to use it
        this.shadowObj = this.attachShadow({ mode: 'open' });

        this._level;
        this._preparedAt;
        this._temperature;
        this._timesUpdated = 0;
    };

    //generates text based on level
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

    getTimesUpdated(){
        return this._timesUpdated;
    }

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

        //populating the shadowDOM with the template after properties are populated
        this.render();
    }

    render() {
        this.shadowObj.innerHTML = this._getTemplate();
        this._setEventListeners();
    };

    _getTemplate() {
        const template = `
        <style>
            p {
                font-size: 1.5em;
            }
            img {
                max-width: 33%;
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
            <button type="button">Refresh</button>
        </div>
        `;
        return template;
    };

    _setEventListeners() {
        this.shadowRoot.querySelector("button").onclick = (evt) => {

            this._timesUpdated++;

            //create custom event called "updated"
            this.dispatchEvent(new CustomEvent("updated", {
                detail: {
                    timesUpdated: this.getTimesUpdated(),
                    preparedAt: this.getPreparedAt()
                }
            }));
        };

        //add custom event called "updated" to our button
        this.addEventListener("updated", (evt) => {
            
            //we can see that the event is unique to each button as the preparedAt matches its element
            console.log(`The coffee prepared at ${evt.detail.preparedAt} has been updated ${evt.detail.timesUpdated} time(s) now.`);
        });
    };
};

customElements.define('coffee-status', CoffeeStatus);