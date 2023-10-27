
function fetchData() {
    fetch('companies.json') 
        .then(response => response.json())
        .then(data => {
            companies = data;
            
            const companyList = document.getElementById("companyList");
            companyList.innerHTML = "";
            companies.forEach(company => {
                const checkbox = document.createElement("input");
                checkbox.setAttribute("type", "checkbox");
                checkbox.classList.add("companyCheckbox");
                checkbox.setAttribute("data-name", company.name);
                const label = document.createElement("label");
                label.textContent = company.name;
                const listItem = document.createElement("li");
                listItem.appendChild(checkbox);
                listItem.appendChild(label);
                companyList.appendChild(listItem);
            });
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}


function compareCompanies() {
    const comparisonResults = document.getElementById("comparisonResults");

    if (selectedCompanies.length < 2) {
        comparisonResults.innerHTML = "You should choose at least 2 companies.";
        comparisonResults.style.display = "block";
        return;
    }

    comparisonResults.innerHTML = ""; 

    const table = document.createElement("table");
    table.classList.add("comparisonTable");

    
    const headerRow = document.createElement("tr");
    const headers = ["Name", "Location", "Internship Count", "Requirements", "Sector", "Departments", "Language Requirements"];
    headers.forEach(headerText => {
        const th = document.createElement("th");
        th.textContent = headerText;
        headerRow.appendChild(th);
    });
    table.appendChild(headerRow);

    
    selectedCompanies.forEach(company => {
        const row = document.createElement("tr");
        Object.keys(company).forEach(key => {
            const cell = document.createElement("td");
            cell.textContent = company[key];
            row.appendChild(cell);
        });
        table.appendChild(row);
    });

    comparisonResults.appendChild(table);
    comparisonResults.style.display = "block";
}



function addToFavorites() {
    
}




fetchData();
