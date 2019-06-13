const table = document.querySelector('table');
let sortingType = 'asc';

const titleClickHandler = e => {
    let columnNumber = e.target.cellIndex;
    let columnType = e.target.getAttribute('data-type');
    let allTh = [...document.querySelectorAll('th')];
    sortingType = sortingType === 'asc' ? 'desc' : 'asc';
    
    for (let i = 0; i < allTh.length; i++) {
        allTh[i].className = '';
    }

    e.target.classList.add(sortingType);

    sortColumn(columnNumber, columnType, sortingType);
};

function sortColumn(columnNumber, columnType, sortingType) {
    const tbody = table.querySelector('tbody');

    let rowsArr = Array.from(tbody.rows);

    let compareFunc;

    if (columnType === 'number') {
        if (sortingType === 'asc') {
            compareFunc = (rowA, rowB) => {
                return rowA.cells[columnNumber].innerHTML - rowB.cells[columnNumber].innerHTML;
            };
        } else {
            compareFunc = (rowA, rowB) => {
                return rowB.cells[columnNumber].innerHTML - rowA.cells[columnNumber].innerHTML;
            };
        }
    } else if (columnType === 'string') {
        if (sortingType === 'asc') {
            compareFunc = (rowA, rowB) => {
                return rowA.cells[columnNumber].innerHTML === rowB.cells[columnNumber].innerHTML ? 
                0 : rowA.cells[columnNumber].innerHTML > rowB.cells[columnNumber].innerHTML ? 1 : -1;
            }
        } else {
            compareFunc = (rowA, rowB) => {
                return rowA.cells[columnNumber].innerHTML === rowB.cells[columnNumber].innerHTML ? 
                0 : rowA.cells[columnNumber].innerHTML > rowB.cells[columnNumber].innerHTML ? -1 : 1;
            }
        }
    }

    rowsArr.sort(compareFunc);

    table.removeChild(tbody);

    for (let i = 0; i < rowsArr.length; i ++) {
        tbody.appendChild(rowsArr[i]);
    }
    
    table.appendChild(tbody);
}

table.tHead.addEventListener('click', titleClickHandler);