// Build the metadata panel
function buildMetadata(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // get the metadata field
    let metadatafield = data.metadata

    //initializes the page with a default
    let idfield = metadatafield.filter(sampleobj=>sampleobj.id==sample)
    let result = idfield[0]

    // Filter the metadata for the object with the desired sample number
    // function updatePlotly() {    //This function is called when a dropdown menu item is selected
      let PANEL = d3.select("#sample-metadata");
      PANEL.html("")
      for (key in result){
        PANEL.append("h6").text(`${key.toUpperCase()}: ${result[key]}`);
      };
});

}

// function to build both charts
function buildCharts(sample) {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {

    // Get the samples field
    let samplesfield = data.samples;
    
    // Filter the samples for the object with the desired sample number
    let field_one = samplesfield.filter(sampleobj=>sampleobj.id==sample)
    let result = field_one[0]
    console.log(result)
    // Get the otu_ids, otu_labels, and sample_values
    let otu_ids = result.otu_ids;
    let otu_labels = result.otu_labels;
    let sample_values = result.sample_values;

    // Build a Bubble Chart
    let bubbletrace = {
      x: otu_ids,
      y: sample_values,
      text: otu_labels,
      mode: "markers", // This specifies that the chart should be a scatter plot with markers.
          marker: {
            size: sample_values,
            color: otu_ids, // The color of each marker is set to the values in the otu_ids array.
            colorscale: "Earth"
    }};
    let bubbledata = [bubbletrace];
    let bubblelayout = {
      title: "Bacteria Cultures Per Sample"
    };
  
//     //  Render the Bubble Chart
    Plotly.newPlot("bubble",bubbledata,bubblelayout);
///////////////////////////////////////////
// let slicedData = filteredresult.slice(0, 10).reverse();
let otu_ids_bar = otu_ids.slice(0, 10).reverse().map(function (item){
  return `otu ${item}`;
});
let otu_labels_bar = otu_labels.slice(0, 10).reverse();
let sample_values_bar = sample_values.slice(0, 10).reverse();

let bartrace = {
      x: sample_values_bar,
      y: otu_ids_bar,
      text: otu_labels_bar,
      type: "bar",
      orientation: "h"
    };
    let bardata = [bartrace];
    let barlayout = {
      title: "Bacteria Cultures Per Sample"
    };  
// plotly.js.horizontalbarchart
    Plotly.newPlot("bar",bardata,barlayout);
  })
}
//     // For the Bar Chart, map the otu_ids to a list of strings for your yticks
//     let trace1 = {
//       x: slicedData.map(object => object.greekSearchResults),
//       y: slicedData.map(object => object.greekName),
//       text: slicedData.map(object => object.greekName),
//       name: "Greek",
//       type: "bar",
//       orientation: "h"
//     };
//     let data = [trace1];
//     let layout = {
//       title: "Greek gods search results",
//       margin: {
//         l: 100,
//         r: 100,
//         t: 100,
//         b: 100
//       }
//     };
//     Plotly.newPlot("plot", data, layout);

//     // Build a Bar Chart
//     // Don't forget to slice and reverse the input data appropriately
//     let trace = {
//       x: "Number of Bacteria",
//       y: //Not sure what goes here
//       type: "bubble"
//     };
//     let data = [trace];
//     let layout = {
//       title: "Bacteria Cultures Per Sample"
//     };

//     // Render the Bar Chart
//     Plotly.newPlot("plot",data2,layout2);
//   });
// }

// Function to run on page load
function init() {
  d3.json("https://static.bc-edx.com/data/dl-1-2/m14/lms/starter/samples.json").then((data) => {
  // console.log(data.names);
    // Get the names field
    let nameslist = data.names
    // Use d3 to select the dropdown with id of `#selDataset`
    let dropdownMenu = d3.select("#selDataset")
    
    
    // Use the list of sample names to populate the select options
    // Hint: Inside a loop, you will need to use d3 to append a new
    // option for each sample name.
    for (let i = 0; i < nameslist.length; i++) {
      const name = nameslist[i];
      dropdownMenu.append("option").property("value",name).text(name)
    }
    
    // Get the first sample from the list
    let firstname = nameslist[0];


    // Build charts and metadata panel with the first sample
    optionChanged(firstname)
  });
}

// Function for event listener
function optionChanged(newSample) {
  // Build charts and metadata panel each time a new sample is selected
  buildCharts(newSample)
  buildMetadata(newSample)
  }
  // Initialize the dashboard
init();
