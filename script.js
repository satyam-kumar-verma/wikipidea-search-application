// url = "https://apis.ccbp.in/wiki-search?search="

let searchInput = document.getElementById("searchInput");
let loading = document.getElementById("spinner");
let searchResults = document.getElementById("searchResults");

let options = {
    method: "GET",
}

function createAndAppendSearchResult(eachData) {

    let {
        title,
        link,
        description
    } = eachData;

    let elementContainer = document.createElement("div");
    elementContainer.classList.add("result-item");
    searchResults.appendChild(elementContainer);

    let titleEl = document.createElement("a");
    titleEl.classList.add("result-title");
    titleEl.target = "_blank";
    titleEl.href = link;
    titleEl.textContent = title;
    elementContainer.appendChild(titleEl);

    let lineBreak = document.createElement("br");
    elementContainer.appendChild(lineBreak);

    let urlLink = document.createElement("a");
    urlLink.classList.add("result-url");
    urlLink.target = "_blank";
    urlLink.href = link;
    urlLink.textContent = link;
    elementContainer.appendChild(urlLink);

    let breakLine = document.createElement("br");
    elementContainer.appendChild(breakLine);

    let detailedDescription = document.createElement("p");
    detailedDescription.classList.add("link-description");
    detailedDescription.textContent = description;
    elementContainer.appendChild(detailedDescription);

}

function sendAllData(responseData) {
    loading.classList.toggle("d-none");
    for (let eachData of responseData) {
        createAndAppendSearchResult(eachData);
    }
}

function fetchData(event) {
    if (event.key === "Enter") {
        searchResults.textContent = "";

        loading.classList.toggle("d-none");

        let userValue = searchInput.value;
        if (userValue === "") {
            alert("Enter valid input");
            loading.classList.toggle("d-none");
            return 0;
        }

        let url = "https://apis.ccbp.in/wiki-search?search=" + userValue;

        fetch(url, options)
            .then(function(response) {
                return response.json();
            })
            .then(function(responseData) {
                let {
                    search_results
                } = responseData;
                sendAllData(search_results);
            })
    }
}


searchInput.addEventListener("keydown", fetchData);