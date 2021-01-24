const chessBoard = {
    columnNames: ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'],
    fields: {},

    createCell(rowElement, row, column, color) {
        if (column === 'A') {
            const cell = document.createElement('th');
            cell.innerHTML = row;
            cell.style.borderRight = '1px solid #000';
            cell.style.padding = '0.5em';
            rowElement.appendChild(cell);
            this.fields[row] = {};
        }
        const cell = document.createElement('td');
        switch (row) {
            case 8:
                cell.style.borderTop = '1px solid #000';
                switch (column) {
                    case 'A':
                    case 'H':
                        cell.innerHTML = '♜';
                        break;
                    case 'B':
                    case 'G':
                        cell.innerHTML = '♞';
                        break;
                    case 'C':
                    case 'F':
                        cell.innerHTML = '♝';
                        break;
                    case 'D':
                        cell.innerHTML = '♛';
                        break;
                    case 'E':
                        cell.innerHTML = '♚';
                        break;
                }
                break;
            case 1:
                cell.style.borderBottom = '1px solid #000';
                switch (column) {
                    case 'A':
                    case 'H':
                        cell.innerHTML = '♖';
                        break;
                    case 'B':
                    case 'G':
                        cell.innerHTML = '♘';
                        break;
                    case 'C':
                    case 'F':
                        cell.innerHTML = '♗';
                        break;
                    case 'D':
                        cell.innerHTML = '♕';
                        break;
                    case 'E':
                        cell.innerHTML = '♔';
                        break;
                    default:
                        break;
                }
                break;
            case 2:
                cell.innerHTML = '♙';
                break;
            case 7:
                cell.innerHTML = '♟';
                break;
            default:
                break;
        }

        if (column === 'H') {
            cell.style.borderRight = '1px solid #000';
        }
        cell.style.width = '1.5em';
        cell.style.height = '1.5em';
        cell.style.textAlign = 'center';
        cell.style.fontSize = '32px';
        cell.style.lineHeight = '0';
        cell.style.backgroundColor = color;
        rowElement.appendChild(cell);

        // На будущее, вдруг надо сделать ходы и тд...
        this.fields[row][column] = cell;
    },

    createBoard(anchor) {
        let prevField = '';
        const tableElement = document.createElement('table');
        tableElement.style.margin = 'auto';
        tableElement.style.borderSpacing = '0';
        tableElement.style.borderCollapse = 'collapse';
        const tableBody = document.createElement('tbody');
        for (let row = 9; row > 0; row--) {
            const rowElement = document.createElement('tr');
            if (row === 9) {
                const emptyCell = document.createElement('th');
                rowElement.appendChild(emptyCell);
                for (const column of this.columnNames) {
                    const cell = document.createElement('th');
                    cell.style.padding = '0.5em';
                    cell.style.borderBottom = '1px solid #000';
                    cell.innerHTML = column;
                    rowElement.appendChild(cell);
                }
                tableBody.appendChild(rowElement);
            } else {
                if (row % 2 === 0) {
                    prevField = '#fd4800'
                } else {
                    prevField = 'white'
                }
                for (const column of this.columnNames) {
                    if (prevField === 'white') {
                        prevField = '#fd4800';
                    } else {
                        prevField = 'white';
                    }
                    this.createCell(rowElement, row, column, prevField);
                }
                tableBody.appendChild(rowElement);
            }
        }

        tableElement.appendChild(tableBody);
        anchor.appendChild(tableElement);
    },
}
