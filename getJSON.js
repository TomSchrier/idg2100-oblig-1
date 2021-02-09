/*Loop through our JSON file and assign the value to
its corresponding web component with the .setValues method*/
function getJSON() {
    fetch('coffee.json')
    .then(response => response.json())
    .then(JSONdata => {
        let components = document.getElementsByTagName("coffee-status");

        for (let index = 0; index < JSONdata.length; index++) {
            if (components[index]) {
                components[index].setValues(JSONdata[index].level, JSONdata[index].preparedAt, JSONdata[index].temperature);
            } else {
                break;
            };
        };
    });
};