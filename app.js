// from data.js
var tableData = data;

// YOUR CODE HERE!

// Select the submit button
var submit = d3.select("#filter-btn");

submit.on("click", function() {

    // Prevent the page from refreshing
    d3.event.preventDefault();

    // Level 1 attempt commented below
    // Select the input element and get the raw HTML code
    // var inputElement = d3.select("#datetime");

    // Get the value property of the input element
    // var inputValue = inputElement.property("value");

    // console.log(inputValue);

    // Updated level 2 below
    // Create dictionary to hold multiple search criteria inputs
    var inputDict = {}

    // Put criteria into dictionary, if each input exists
    if(d3.select("#datetime").property("value")) {
        inputDict['datetime'] = [d3.select("#datetime").property("value")];
    }
    if(d3.select("#cityfilter").property("value")) {
        inputDict['city'] = [d3.select("#cityfilter").property("value")];
    }
    if(d3.select("#statefilter").property("value")) {
        inputDict['state'] = [d3.select("#statefilter").property("value")];
    }
    if(d3.select("#countryfilter").property("value")) {
        inputDict['country'] = [d3.select("#countryfilter").property("value")];
    }
    if(d3.select("#shapefilter").property("value")) {
        inputDict['shape'] = [d3.select("#shapefilter").property("value")];
    }

    // View contents of inputDict
    console.log(inputDict)

    // Define function to search on contents of inputDict
    function inputSearch(dataSet, filters) {
        const filterKeys = Object.keys(filters);
        //filter only elements passing all criteria
        return dataSet.filter((sighting) => {
          return filterKeys.every(key => {
            return filters[key].includes(sighting[key]);
          })
        })
      }

    // Filter data based on user input values
    // First attempt commented below
    // var filteredData = tableData.filter(sighting => sighting.datetime === inputValue);
    
    var filteredData = inputSearch(tableData, inputDict);
    console.log(filteredData);

    // Remove existing table, if there is one
    // Replace the table body in order to append new search information
    d3.select("#filteredTable").remove();
    d3.select("#ufo-table").append("tbody").attr("id","filteredTable");

    // Build table based on filteredData
    var tbody = d3.select("tbody");

    // Loop through filtered data and add a row for each entry
    filteredData.forEach(sighting => {
        var row = tbody.append("tr");

        // Loop through each entry and get the key and value for each item
        Object.entries(sighting).forEach(([key, value]) => {
        console.log(key, value);

        // Append a cell to the row for each value
        var cell = tbody.append("td");

        // Fill each cell with the corresponding value
        cell.text(value);
        })
    })
})