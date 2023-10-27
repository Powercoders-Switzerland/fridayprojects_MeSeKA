
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
                const imgSrc = document.createElement("img");
                imgSrc.src=company.imgSrc;
               
                const listItem = document.createElement("li");
                listItem.appendChild(checkbox);
                listItem.appendChild(imgSrc);
                companyList.appendChild(listItem);

            });
            addCompaniesEventListener();
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}

const selectedCompanies = [];



function addCompaniesEventListener() {
    const companyCheckboxes = document.querySelectorAll(".companyCheckbox");

    companyCheckboxes.forEach(checkbox => {
        checkbox.addEventListener("click", function() {
            const companyName = this.getAttribute("data-name");
    
            if (this.checked) {
                
                selectCompany(companyName);
            } else {
                
                deselectCompany(companyName);
            }
        });
    });
}



function selectCompany(companyName) {
    const company = companies.find(company => company.name === companyName);
    if (company) {
        selectedCompanies.push(company);
 
    }
}

function deselectCompany(companyName) {
    const index = selectedCompanies.findIndex(company => company.name === companyName);
    if (index !== -1) {
        selectedCompanies.splice(index, 1);
      
    }
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








fetchData();
