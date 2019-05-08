class DataSource {

    constructor() {
        this.readTextFile('/all-games(13.935 data).json');
        this.ready = false
    }
    
    readTextFile(file) {
        var axios = require('axios');
        axios.get(file) // JSON File Path
            .then( response => {
            this.json =  response.data
            this.ready = true
            this.transformData(this.json)
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    transformData(json) {
        this.data = []
        var i = 0

        var currentTime = new Date().getTime()

        for (; i < json.length; i++) {
            var releaseDate = new Date(json[i]["releaseDate"])
            if(json[i]["protections"][0] !== undefined && currentTime >= releaseDate.getTime()) {
                
                var title = json[i]["title"]
                var drm = json[i]["protections"][0].toLowerCase()
                var day
                if (json[i].hasOwnProperty("crackDate")) {//cracked
                    var crackedDate = new Date(json[i]["crackDate"])
                    day = this.daysBetween(releaseDate, crackedDate)
                    if (day < 0) {
                        day = 0
                    }
                    
                    var releaseDateMilis = releaseDate.getTime()
                    var year = releaseDate.getFullYear()

                    //currently only shows cracked games
                    var data = {
                        x: title,
                        y: day,
                        drm: drm,
                        releaseDateMilis: releaseDateMilis,
                        releaseDate: json[i]["releaseDate"],
                        year: year
                    }

                    this.data.push(data)

                }
            }

        }
    }

    daysBetween(date1, date2) {
        //Get 1 day in milliseconds
        var one_day=1000*60*60*24;
        // Convert both dates to milliseconds
        var date1_ms = date1.getTime();
        var date2_ms = date2.getTime();
        // Calculate the difference in milliseconds
        var difference_ms = date2_ms - date1_ms;
        // Convert back to days and return
        return Math.floor(difference_ms/one_day); 
    }

    //use this function to get data
    getSeries(filter = {}, sortBy = "none", asc = true) {
        var series = []

        var data
        
        data = this.data

        //item filter
        data = data.filter(function(item) {
            for (var key in filter) {
              if (item[key] === undefined || item[key] !== filter[key])
                return false;
            }
            return true;
        });

        //sort item
        if(sortBy !== "none") {
            var sortFunction = function(a,b) {
                var value

                if(a[sortBy] < b[sortBy]) {
                    value = -1
                } else if(a[sortBy] > b[sortBy]) {
                    value = 1
                } else {
                    value = 0
                }
                if (!asc) {
                    value *= -1
                }
                return value
            }

            data.sort(sortFunction)
        }

        //create series format and return
        var dataseries = {
                data: data
        }
        series.push(dataseries)
        return {
            series: series
        }
    }


}

export default DataSource