class DataSource {

    constructor() {
        this.readTextFile('/all-games(13.935 data).json');
    }
    
    readTextFile(file) {
        var axios = require('axios');
        axios.get(file) // JSON File Path
            .then( response => {
            this.json =  response.data
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    getAll() {
        return this.json
    }
}

export default DataSource