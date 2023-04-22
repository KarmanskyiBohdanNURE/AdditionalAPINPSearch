const APIurl = "https://api.novaposhta.ua/v2.0/json/";
const apiKey = "";
let data = "";

function connectToApiSettlements(strData)
{
    fetch(APIurl, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: strData
        })
    .then(res => res.json())
    .then(data => setTableSettlements(data));
}

function setTableSettlements({data})
{
    const tableContainer = document.getElementById("table-container");
    
    // Отримати кількість рядків і стовпців з масиву даних
    const rows = data.length;
    const columns = Object.keys(data[0]).length;
    
    // Створити таблицю і додати її до контейнера
    const table = document.createElement("table");
    tableContainer.appendChild(table);
    
    // Створити заголовок таблиці
    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");
    
    // Додати заголовки стовпців до заголовка таблиці
    for (const key in data[0]) 
    {
        switch (key) 
        {
            case "Description":
                const tableHeaderCellDescUa = document.createElement("th");
                tableHeaderCellDescUa.textContent = "Адреса";
                tableHeaderRow.appendChild(tableHeaderCellDescUa);
                break;
            case "SettlementTypeDescription":
                const tableHeaderCellDescRu = document.createElement("th");
                tableHeaderCellDescRu.textContent = "Тип населеного пункту";
                tableHeaderRow.appendChild(tableHeaderCellDescRu);
                break;
            case "Latitude":
                const tableHeaderCellW = document.createElement("th");
                tableHeaderCellW.textContent = "Довгота";
                tableHeaderRow.appendChild(tableHeaderCellW);
                break;
            case "Longitude":
                const tableHeaderCellDescTy = document.createElement("th");
                tableHeaderCellDescTy.textContent = "Широта";
                tableHeaderRow.appendChild(tableHeaderCellDescTy);
                break;
            case "Index1":
                const tableHeaderCellL = document.createElement("th");
                tableHeaderCellL.textContent = "Початковий індекс";
                tableHeaderRow.appendChild(tableHeaderCellL);
                break;
            case "Index2":
                const tableHeaderCellH = document.createElement("th");
                tableHeaderCellH.textContent = "Кінцевий індекс";
                tableHeaderRow.appendChild(tableHeaderCellH);
                break;
            case "AreaDescription":
                const tableHeaderCellVW = document.createElement("th");
                tableHeaderCellVW.textContent = "Опис області";
                tableHeaderRow.appendChild(tableHeaderCellVW);
                break;
            case "RegionsDescription":
                const tableHeaderCellFN = document.createElement("th");
                tableHeaderCellFN.textContent = "Район";
                tableHeaderRow.appendChild(tableHeaderCellFN);
                break;
            case "Ref":
                break;
            case "SettlementType":
                break;
            case "SettlementTypeDescriptionRu":
                break;
            case "Region":
                break;
            case "RegionsDescriptionRu":
                break;
            case "DescriptionRu":
                break;
            case "DescriptionTranslit":
                break;
            case "SettlementTypeTranslit":
                break;
            case "Area":
                break;
            case "RegionsDescriptionTranslit":
                break;
            case "AreaDescriptionTranslit":
                break;
            case "AreaDescriptionRu":
                break;
            case "IndexCOATSU1":
                break;
            case "Delivery1":
                break;
            case "Delivery2":
                break;
            case "Delivery3":
                break;
            case "Delivery4":
                break;
            case "Delivery5":
                break;
            case "Delivery6":
                break;
            case "Delivery7":
                break;
            case "Warehouse":
                break;
            case "SpecialCashCheck":
                break;
            case "SettlementTypeDescriptionTranslit":
                break;
            default:
                const tableHeaderCell = document.createElement("th");
                tableHeaderCell.textContent = key;
                tableHeaderRow.appendChild(tableHeaderCell);
                break;
        }
    }
    
    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);
    
    // Створити тіло таблиці
    const tableBody = document.createElement("tbody");

    // Додати рядки з даними до тіла таблиці
    for (let i = 0; i < rows; i++) 
    {
        const tableBodyRow = document.createElement("tr");
    
        for (const key in data[i]) 
        {
            if(key == "SettlementTypeDescriptionRu" || key == "SettlementType" ||
            key == "Region" || key == "RegionsDescriptionRu" || key == "Ref" ||
            key == "DescriptionRu" || key == "DescriptionTranslit" ||
            key == "SettlementTypeTranslit" || key == "Area" || 
            key == "RegionsDescriptionTranslit" || key == "AreaDescriptionTranslit" ||
            key == "IndexCOATSU1" || key == "Delivery1" || 
            key == "Delivery2" || key == "Delivery3" ||
            key == "Delivery4" || key == "Delivery5" || 
            key == "Delivery6" || key == "Delivery7" || 
            key == "Warehouse" || key == "SpecialCashCheck" || 
            key == "SettlementTypeDescriptionTranslit" || key == "AreaDescriptionRu") 
            {
                continue;
            }
            const tableBodyCell = document.createElement("td");
            tableBodyCell.textContent = data[i][key];
            tableBodyRow.appendChild(tableBodyCell);
        }
    
        tableBody.appendChild(tableBodyRow);
    }
    
    table.appendChild(tableBody);
}

function clearTableSettlements()
{
    const tableContainer = document.getElementById("table-container");
    tableContainer.innerHTML = "";
}

function clearTableControllersSettlements()
{
    const tableContainer = document.getElementById("table-controllerDown");
    tableContainer.innerHTML = "";
}

function getSettlements(pageNum, limit)
{
    clearTableSettlements();
    const CityName = document.getElementById("cityName");
    const LIMIT = '' + limit;
    const pageNumber = '' + pageNum;
    data = 
    {
        "apiKey":  apiKey,
        "modelName": "Address",
        "calledMethod": "getSettlements",
        "methodProperties": 
        {
            "Page" : pageNumber,
            "FindByString" : CityName.value,
            "Limit" : LIMIT
        }
    }
    let strData = JSON.stringify(data);
    connectToApiSettlements(strData);
}

function fillTableForGetSettlements()
{
    let pageNum = 1;
    let totalPages = 1000;
    let limit = 20;

    const tableControllerDown = document.getElementById("table-controllerDown");
    tableControllerDown.innerHTML = "";

    // Додавання класів до елементів
    tableControllerDown.classList.add('pagination');

    const prevButton = document.createElement('button');
    prevButton.classList.add('prev-btn');
    prevButton.innerText = 'Назад';

    const pageNumberLabel = document.createElement('label');
    pageNumberLabel.classList.add('page-num');
    pageNumberLabel.innerText = '1';

    prevButton.addEventListener('click', () => 
    {
        if (pageNum > 1) 
        {
            pageNum--;
            pageNumberLabel.innerText = pageNum;
            getSettlements(pageNum, limit);
        }
    });

    tableControllerDown.appendChild(prevButton);

    tableControllerDown.appendChild(pageNumberLabel);

    const nextButton = document.createElement('button');
    nextButton.classList.add('next-btn');
    nextButton.innerText = 'Вперед';
    nextButton.addEventListener('click', () => 
    {
        if (pageNum < totalPages) 
        {
            pageNum++;
            pageNumberLabel.innerText = pageNum;
            getSettlements(pageNum, limit);
        }
    });

    tableControllerDown.appendChild(nextButton);

    const select = document.createElement('select');
    select.classList.add('page-size');
    select.innerHTML = `
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
    `;
    select.addEventListener('change', () => 
    {
        limit = parseInt(select.value);
        pageNum = 1;
        pageNumberLabel.innerText = pageNum;
        getSettlements(pageNum, limit);
    });

    tableControllerDown.appendChild(select);

    getSettlements(pageNum, limit);
}

function connectToApiCities(strData)
{
    fetch(APIurl, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: strData
        })
    .then(res => res.json())
    .then(data => setTableCities(data));
}

function setTableCities({data})
{
    const tableContainer = document.getElementById("table-container2");
    
    // Отримати кількість рядків і стовпців з масиву даних
    const rows = data.length;
    const columns = Object.keys(data[0]).length;
    
    // Створити таблицю і додати її до контейнера
    const table = document.createElement("table");
    tableContainer.appendChild(table);
    
    // Створити заголовок таблиці
    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");
    
    // Додати заголовки стовпців до заголовка таблиці
    for (const key in data[0]) 
    {
        switch (key) 
        {
            case "Description":
                const tableHeaderCellDescUa = document.createElement("th");
                tableHeaderCellDescUa.textContent = "Адреса";
                tableHeaderRow.appendChild(tableHeaderCellDescUa);
                break;
            case "Ref":
                const tableHeaderCellRef = document.createElement("th");
                tableHeaderCellRef.textContent = "Ідентифікатор";
                tableHeaderRow.appendChild(tableHeaderCellRef);
                break;
            case "SettlementTypeDescription":
                const tableHeaderCellDescRu = document.createElement("th");
                tableHeaderCellDescRu.textContent = "Тип населеного пункту";
                tableHeaderRow.appendChild(tableHeaderCellDescRu);
                break;
            case "AreaDescription":
                const tableHeaderCellVW = document.createElement("th");
                tableHeaderCellVW.textContent = "Опис області";
                tableHeaderRow.appendChild(tableHeaderCellVW);
                break;
            case "SettlementType":
                break;
            case "SettlementTypeDescriptionRu":
                break;
            case "SpecialCashCheck":
                break;
            case "DescriptionRu":
                break;
            case "Area":
                break;
            case "AreaDescriptionRu":
                break;
            case "IsBranch":
                break;
            case "Delivery1":
                break;
            case "Delivery2":
                break;
            case "Delivery3":
                break;
            case "Delivery4":
                break;
            case "Delivery5":
                break;
            case "Delivery6":
                break;
            case "Delivery7":
                break;
            case "PreventEntryNewStreetsUser":
                break;
            case "CityID":
                break;
            default:
                const tableHeaderCell = document.createElement("th");
                tableHeaderCell.textContent = key;
                tableHeaderRow.appendChild(tableHeaderCell);
                break;
        }
    }
    
    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);
    
    // Створити тіло таблиці
    const tableBody = document.createElement("tbody");

    // Додати рядки з даними до тіла таблиці
    for (let i = 0; i < rows; i++) 
    {
        const tableBodyRow = document.createElement("tr");
    
        for (const key in data[i]) 
        {
            if(key == "SettlementTypeDescriptionRu" || key == "SettlementType" ||
            key == "DescriptionRu" || key == "Area" || 
            key == "IsBranch" || key == "Delivery1" || 
            key == "Delivery2" || key == "Delivery3" ||
            key == "Delivery4" || key == "Delivery5" || 
            key == "Delivery6" || key == "Delivery7" || 
            key == "PreventEntryNewStreetsUser" || key == "CityID" || 
            key == "AreaDescriptionRu" || key == "SpecialCashCheck") 
            {
                continue;
            }
            const tableBodyCell = document.createElement("td");
            tableBodyCell.textContent = data[i][key];
            tableBodyRow.appendChild(tableBodyCell);
        }
    
        tableBody.appendChild(tableBodyRow);
    }
    
    table.appendChild(tableBody);
}

function clearTableCities()
{
    const tableContainer = document.getElementById("table-container2");
    tableContainer.innerHTML = "";
}

function clearTableControllersCities()
{
    const tableContainer = document.getElementById("table-controllerDown2");
    tableContainer.innerHTML = "";
}

function getCities(pageNum, limit)
{
    clearTableCities();
    const CityName = document.getElementById("cityName");
    const LIMIT = '' + limit;
    const pageNumber = '' + pageNum;
    data = 
    {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "getCities",
        "methodProperties": 
        {
            "Page" : pageNumber,
            "FindByString" : CityName.value,
            "Limit" : LIMIT
        }
     }
    let strData = JSON.stringify(data);
    connectToApiCities(strData);
}

function fillTableForGetCities()
{
    let pageNum = 1;
    let totalPages = 1000;
    let limit = 20;

    const tableControllerDown2 = document.getElementById("table-controllerDown2");
    tableControllerDown2.innerHTML = "";

    // Додавання класів до елементів
    tableControllerDown2.classList.add('pagination');

    const prevButton2 = document.createElement('button');
    prevButton2.classList.add('prev-btn');
    prevButton2.innerText = 'Назад';

    const pageNumberLabel2 = document.createElement('label');
    pageNumberLabel2.classList.add('page-num');
    pageNumberLabel2.innerText = '1';

    prevButton2.addEventListener('click', () => 
    {
        if (pageNum > 1) 
        {
            pageNum--;
            pageNumberLabel2.innerText = pageNum;
            getCities(pageNum, limit);
        }
    });

    tableControllerDown2.appendChild(prevButton2);

    tableControllerDown2.appendChild(pageNumberLabel2);

    const nextButton2 = document.createElement('button');
    nextButton2.classList.add('next-btn');
    nextButton2.innerText = 'Вперед';
    nextButton2.addEventListener('click', () => 
    {
        if (pageNum < totalPages) 
        {
            pageNum++;
            pageNumberLabel2.innerText = pageNum;
            getCities(pageNum, limit);
        }
    });

    tableControllerDown2.appendChild(nextButton2);

    const select = document.createElement('select');
    select.classList.add('page-size');
    select.innerHTML = `
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
    `;
    select.addEventListener('change', () => 
    {
        limit = parseInt(select.value);
        pageNum = 1;
        pageNumberLabel2.innerText = pageNum;
        getCities(pageNum, limit);
    });

    tableControllerDown2.appendChild(select);

    getCities(pageNum, limit);
}

function connectToApiStreets(strData)
{
    fetch(APIurl, 
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: strData
        })
    .then(res => res.json())
    .then(data => setTableStreets(data));
}

function setTableStreets({data})
{
    const tableContainer = document.getElementById("table-container3");
    
    // Отримати кількість рядків і стовпців з масиву даних
    const rows = data.length;
    const columns = Object.keys(data[0]).length;
    
    // Створити таблицю і додати її до контейнера
    const table = document.createElement("table");
    tableContainer.appendChild(table);
    
    // Створити заголовок таблиці
    const tableHeader = document.createElement("thead");
    const tableHeaderRow = document.createElement("tr");
    
    // Додати заголовки стовпців до заголовка таблиці
    for (const key in data[0]) 
    {
        switch (key) 
        {
            case "Description":
                const tableHeaderCellDescUa = document.createElement("th");
                tableHeaderCellDescUa.textContent = "Назва вулиці";
                tableHeaderRow.appendChild(tableHeaderCellDescUa);
                break;
            case "Ref":
                break;
            case "StreetsType":
                const tableHeaderCellDescRu = document.createElement("th");
                tableHeaderCellDescRu.textContent = "Тип вулиці";
                tableHeaderRow.appendChild(tableHeaderCellDescRu);
                break;
            case "StreetsTypeRef":
                const tableHeaderCellW = document.createElement("th");
                tableHeaderCellW.textContent = "Ідентифікатор типу вулиці";
                tableHeaderRow.appendChild(tableHeaderCellW);
                break;
            default:
                const tableHeaderCell = document.createElement("th");
                tableHeaderCell.textContent = key;
                tableHeaderRow.appendChild(tableHeaderCell);
                break;
        }
    }
    
    tableHeader.appendChild(tableHeaderRow);
    table.appendChild(tableHeader);
    
    // Створити тіло таблиці
    const tableBody = document.createElement("tbody");

    // Додати рядки з даними до тіла таблиці
    for (let i = 0; i < rows; i++) 
    {
        const tableBodyRow = document.createElement("tr");
    
        for (const key in data[i]) 
        {
            if(key == "Ref") 
            {
                continue;
            }
            const tableBodyCell = document.createElement("td");
            tableBodyCell.textContent = data[i][key];
            tableBodyRow.appendChild(tableBodyCell);
        }
    
        tableBody.appendChild(tableBodyRow);
    }
    
    table.appendChild(tableBody);
}

function clearTableStreets()
{
    const tableContainer = document.getElementById("table-container3");
    tableContainer.innerHTML = "";
}

function clearTableControllersStreets()
{
    const tableContainer = document.getElementById("table-controllerDown3");
    tableContainer.innerHTML = "";
}

function getStreets(pageNum, limit)
{
    clearTableStreets();
    const CityNameRef = document.getElementById("cityNameRef");
    const CityName = document.getElementById("streetName");
    const LIMIT = '' + limit;
    const pageNumber = '' + pageNum;
    data = 
    {
        "apiKey": apiKey,
        "modelName": "Address",
        "calledMethod": "getStreet",
        "methodProperties": 
        {
            "CityRef" : CityNameRef.value,
            "FindByString" : CityName.value,
            "Page" : pageNumber,
            "Limit" : LIMIT
        }
    }
    let strData = JSON.stringify(data);
    connectToApiStreets(strData);
}

function fillTableForGetStreets()
{
    let pageNum = 1;
    let totalPages = 1000;
    let limit = 20;

    const tableControllerDown2 = document.getElementById("table-controllerDown3");
    tableControllerDown2.innerHTML = "";

    // Додавання класів до елементів
    tableControllerDown2.classList.add('pagination');

    const prevButton2 = document.createElement('button');
    prevButton2.classList.add('prev-btn');
    prevButton2.innerText = 'Назад';

    const pageNumberLabel2 = document.createElement('label');
    pageNumberLabel2.classList.add('page-num');
    pageNumberLabel2.innerText = '1';

    prevButton2.addEventListener('click', () => 
    {
        if (pageNum > 1) 
        {
            pageNum--;
            pageNumberLabel2.innerText = pageNum;
            getStreets(pageNum, limit);
        }
    });

    tableControllerDown2.appendChild(prevButton2);

    tableControllerDown2.appendChild(pageNumberLabel2);

    const nextButton2 = document.createElement('button');
    nextButton2.classList.add('next-btn');
    nextButton2.innerText = 'Вперед';
    nextButton2.addEventListener('click', () => 
    {
        if (pageNum < totalPages) 
        {
            pageNum++;
            pageNumberLabel2.innerText = pageNum;
            getStreets(pageNum, limit);
        }
    });

    tableControllerDown2.appendChild(nextButton2);

    const select = document.createElement('select');
    select.classList.add('page-size');
    select.innerHTML = `
        <option value="20">20</option>
        <option value="50">50</option>
        <option value="100">100</option>
    `;
    select.addEventListener('change', () => 
    {
        limit = parseInt(select.value);
        pageNum = 1;
        pageNumberLabel2.innerText = pageNum;
        getStreets(pageNum, limit);
    });

    tableControllerDown2.appendChild(select);

    getStreets(pageNum, limit);
}

function fillTables()
{
    fillTableForGetSettlements();
    fillTableForGetCities();
}

function fillTablesStreets()
{
    fillTableForGetStreets();
}

function clearAll()
{
    clearTableSettlements();
    clearTableControllersSettlements();
    clearTableCities();
    clearTableControllersCities();
}

function clearStreets()
{
    clearTableStreets();
    clearTableControllersStreets();
}