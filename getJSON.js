function getJSON() {
    fetch('coffee.json')
        .then(response => response.json())
        .then(JSONdata => {
            let components = document.getElementsByTagName("coffee-status");
            
            JSONdata.forEach(populate);
            function populate(item, index) {
                components[index].setValues(item.level, item.preparedAt, item.temperature);
              };
        });
};