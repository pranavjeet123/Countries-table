/*

/----All query selectors to get reference of dom
/----Below Section is reference for event triggering and 

*/
let tableBody = document.querySelector(".content-table >tbody");
let dropdownCount = document.querySelector(".selectEnteries");
var initialDataCount = document.querySelector(".count");
var datasizeCount = document.querySelector(".dataLength");

document.addEventListener("DOMContentLoaded", () => { getCountries(url); });

var data;
var count = 5;

const url = "https://restcountries.eu/rest/v2/all";

/*

/----Asynchronous Ajax made to server
/----Using Async Await
/---- COuntries Item will be returned 
*/

const getCountries = async (url) => {
    const response = await fetch(url)
    if (response.status === 200) {
        data = await response.json()
        let dataLength = data.length;
        const fiveArrayItems = data.slice(0, 5);
        populateCountries(fiveArrayItems);
        initialDataCount.innerHTML = fiveArrayItems.length;
        datasizeCount.innerHTML = dataLength;
        pagination(fiveArrayItems.length, dataLength);
    }
    else {
        throw new Error("unable to fetch response");
    }
}

/*

/----Below function is used to populated table 
/----check if table is having any hardcoded data 
     remove it and then populate data from API

*/
function populateCountries(data) {
    while (tableBody.firstChild) {
        tableBody.removeChild(tableBody.firstChild);
    }
    let i = 1;
    data.forEach((row) => {
        const tr = document.createElement("tr");

        for (let cell in row) {
            if (cell === "name") {
                const td = document.createElement("td");
                td.textContent = row[cell];
                tr.appendChild(td);
            }

            if (cell === "capital") {
                const td = document.createElement("td");
                td.textContent = row[cell];
                tr.appendChild(td);
            }
            if (cell === "currencies") {
                const td = document.createElement("td");
                td.textContent = row[cell][0].name;
                tr.appendChild(td);
            }

            if (cell === "flag") {
                const td = document.createElement("td");
                const image = document.createElement("img");
                image.src = row[cell];
                image.src.height = "100px";
                image.src.width = "100px";
                td.appendChild(image);
                tr.appendChild(td);
            }

            if (cell === "area") {
                const td = document.createElement("td");
                td.textContent = row[cell];
                tr.appendChild(td);
            }

        }

        tableBody.appendChild(tr);
    });
}


let displayNumItems = function (value) {
    let displayData = this.data;
    let dataLength = displayData.length;
    switch (value) {
        case "5": const fiveArrayItems = displayData.slice(0, 5);
            populateCountries(fiveArrayItems);
            initialDataCount.innerHTML = fiveArrayItems.length;
            pagination(value, dataLength);
            break;
        case "10": const tenArrayItems = displayData.slice(0, 10);
            populateCountries(tenArrayItems);
            initialDataCount.innerHTML = tenArrayItems.length;
            pagination(value, dataLength);
            break;
        case "15": const fifArrayItems = displayData.slice(0, 15);
            populateCountries(fifArrayItems);
            initialDataCount.innerHTML = fifArrayItems.length;
            pagination(value, dataLength);
            break;
        case "20": const twentyArrayItems = displayData.slice(0, 20);
            populateCountries(twentyArrayItems);
            initialDataCount.innerHTML = twentyArrayItems.length;
            pagination(value, dataLength);
            break;
        case "25": const twentyfiveArrayItems = displayData.slice(0, 25);
            populateCountries(twentyfiveArrayItems);
            initialDataCount.innerHTML = twentyfiveArrayItems.length;
            pagination(value, dataLength);
            break;
        default: const AfiveArrayItems = displayData.slice(0, 5);
            populateCountries(AfiveArrayItems);
            initialDataCount.innerHTML = fiveArrayItems.length;
            pagination(value, dataLength);
    }
};

/**
 * SEARCH THE HTML table.
 * 
 * @param {searchInput} format the input as first letter capital and all small letters matching with API country name
 * @param {filteredCountries} filtered Array having row value of required country
 *  Alert to provide user about spelling mistake and to provide only country name as such.
 */


let searchHandler = () => {
    let input = document.querySelector(".searchInput").value;
    let searchInput = input.charAt(0).toUpperCase() + input.slice(1).toLowerCase();
    let displayData = this.data;

    let filteredCountries = displayData.filter(function (e) {
        return e.name === searchInput;
    });
    if (filteredCountries.length === 0) {
        alert("OOops! Please enter only country name with correct spelling Or May be record not found- Contact Pranavjeet");

    }
    populateCountries(filteredCountries);
}



/**
 * Sorts a HTML table.
 * 
 * @param {HTMLTableElement} table The table to sort
 * @param {number} column The index of the column to sort
 * @param {boolean} asc Determines if the sorting will be in ascending
 */
function sortTableByColumn(table, column, asc = true) {
    const dirModifier = asc ? 1 : -1;
    const tBody = table.tBodies[0];
    const rows = Array.from(tBody.querySelectorAll("tr"));

    // Sort each row
    const sortedRows = rows.sort((a, b) => {
        const aColText = a.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        const bColText = b.querySelector(`td:nth-child(${column + 1})`).textContent.trim();
        return aColText > bColText ? (1 * dirModifier) : (-1 * dirModifier);
    });

    // Remove all existing TRs from the table
    while (tBody.firstChild) {
        tBody.removeChild(tBody.firstChild);
    }

    // Re-add the newly sorted rows
    tBody.append(...sortedRows);

    // Remember how the column is currently sorted
    table.querySelectorAll("th").forEach(th => th.classList.remove("th-sort-asc", "th-sort-desc"));
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-asc", asc);
    table.querySelector(`th:nth-child(${column + 1})`).classList.toggle("th-sort-desc", !asc);
}

document.querySelectorAll(".content-table th").forEach(headerCell => {
    headerCell.addEventListener("click", () => {
        const tableElement = headerCell.parentElement.parentElement.parentElement;
        const headerIndex = Array.prototype.indexOf.call(headerCell.parentElement.children, headerCell);
        const currentIsAscending = headerCell.classList.contains("th-sort-asc");

        sortTableByColumn(tableElement, headerIndex, !currentIsAscending);
    });
});


/**
 * Paginate a HTML table.
 * 
 * @param {data} Data provided by API
 * @param {value} number of rows displayed per page
 * buttons displayed for pagination
 */


function pagination(value, data) {
    let pagenationUl = document.querySelector(".pagination");
    while (pagenationUl.firstChild) {
        pagenationUl.removeChild(pagenationUl.firstChild);
    }
    let pageNumbers = [];
    for (let i = 1; i <= Math.ceil(data / value); i++) {
        pageNumbers.push(i);
    }
    if (pageNumbers.length === 50) {
        let pageDisplay10 = pageNumbers.splice(0, 10);
        pageDisplay10.forEach((item) => {
            let li = document.createElement("li");
            li.textContent = item;
            pagenationUl.appendChild(li);
        })

    }
}




