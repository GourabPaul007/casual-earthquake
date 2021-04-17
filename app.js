const form = document.querySelector("#form");
form.addEventListener("submit", function (e) {
    e.preventDefault;
    const ul = document.querySelector("#earthquake-list");
    ul.innerHTML = "";
    //getting values from inputs
    const start = document.querySelector("#start");
    let startDate = start.value || "2021-03-15";
    const end = document.querySelector("#end");
    let endDate = end.value || "2021-03-16";

    fetchData(startDate, endDate);
})

//To fetch data from server
async function fetchData(startDate = "2021-03-10", endDate = "2021-03-15") {
    try {
        console.log(startDate, endDate);
        // startDate ??= "2021-03-10";
        // endDate ??= "2021-03-15";
        var url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=${startDate}&endtime=${endDate}&minmag=5`;
        console.log(url);

        const eq = await axios.get(url);
        console.log(eq);
        return processData(eq.data, 10);
    }
    catch (e) {
        console.log(e);
    }
}

function processData(eqData, n) {   //to process which data is shown
    for (let i in eqData.features) {    //features is array
        let place = eqData.features[i].properties.place;
        let mag = eqData.features[i].properties.mag;
        let time = eqData.features[i].properties.time;
        let url = eqData.features[i].properties.url;

        let unix_timestamp = time;
        // Create a new JavaScript Date object based on the timestamp
        // multiplied by 1000 so that the argument is in milliseconds, not seconds.
        var date = new Date(unix_timestamp * 1000);
        // Hours part from the timestamp
        var hours = date.getHours();
        // Minutes part from the timestamp
        var minutes = "0" + date.getMinutes();
        // Seconds part from the timestamp
        var seconds = "0" + date.getSeconds();

        // Will display time in 10:30:23 format
        var formattedTime = date;
        //+ ':' + hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
        console.log(formattedTime);


        showData(`${place} - ${mag} - ${formattedTime}`);
    }
}
function showData(data) {
    let li = document.createElement("LI");
    li.classList.add("list-group-item");
    li.innerText = (data + "");

    const ul = document.querySelector("#earthquake-list");
    ul.appendChild(li);
}