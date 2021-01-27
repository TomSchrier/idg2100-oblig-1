export default class CoffeeStatus extends HTMLElement {
    constructor() {
        super();
        // Element functionality written in here

        //We store the shadowRoot as a class property to use it
        this.shadowObj = this.attachShadow({ mode: 'open' });
        
        this.metadata = {
            level: 'level-string',
            prepared_at: 'level-string',
            temprature: 'temprature-string'
        };

        this.render();
    };

    render() {
        this.shadowObj.innerHTML = this._getTemplate();
        console.log(this.metadata);
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
                padding: 3%;
                margin-bottom: 1%;
            }
        </style>
        <div>
            <img src="assets/coffee.jpg"></span>
            <p><b>Coffee level</b>: ${this.metadata.level}</p>
            <p><b>Prepared at</b>: ${this.metadata.prepared_at}</p>
            <p><b>Temprature</b>: ${this.metadata.temprature} °C</p>
        </div>
        `;
        return template;
    };
};

customElements.define("coffee-status", CoffeeStatus);