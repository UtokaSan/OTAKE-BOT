import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Paper from '@mui/material/Paper';
import { visuallyHidden } from '@mui/utils';
import "../../styles/components/cardstable.scss";

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getRarityOrder(rarity) {
    switch (rarity) {
        case 'Admin':
            return 4;
        case 'Legendary':
            return 3;
        case 'Uncommun':
            return 2;
        case 'Commun':
            return 1;
        default:
            return 0;
    }
}

// function getOwnerOrder(name) {
//     switch (name) {
//         case 'not owned':
//             return 1;
//         default:
//             return 0;
//     }
// }

function getComparator(order, orderBy) {
    return order === 'desc'
        ? (a, b) => {
            if (orderBy === 'rarity') {
                return getRarityOrder(b.rarity) - getRarityOrder(a.rarity);
            }
            return descendingComparator(a, b, orderBy);
        }
        : (a, b) => {
            if (orderBy === 'rarity') {
                return getRarityOrder(a.rarity) - getRarityOrder(b.rarity);
            }
            return -descendingComparator(a, b, orderBy);
        };
}

function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

const headCells = [
    {
        id: 'name',
        numeric: false,
        disablePadding: false,
        label: 'Name'
    },
    {
        id: 'attack',
        numeric: true,
        disablePadding: true,
        label: 'Attack'
    },
    {id: 'pv', numeric: true, disablePadding: true, label: 'Pv'},
    {id: 'price', numeric: true, disablePadding: true, label: 'Price'},
    {id: 'rarity', numeric: true, disablePadding: true, label: 'Rarity'},
    {id: 'owner', numeric: true, disablePadding: true, label: 'Owner'},
    {id: 'edit', numeric: true, disablePadding: true, label: 'Edit'},
    {id: 'delete', numeric: true, disablePadding: true, label: 'Delete'}
];

function EnhancedTableHead(props) {
    const {order, orderBy, onRequestSort} = props;
    const createSortHandler = (property) => (event) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <TableCell
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <Box component="span" sx={visuallyHidden}>
                                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                                </Box>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

EnhancedTableHead.propTypes = {
    onRequestSort: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
};

export default function CardsTable({rows, _}) {
    console.log("rows CardsTable: ", rows);

    const [order, setOrder] = React.useState('desc');
    const [orderBy, setOrderBy] = React.useState('rarity');
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [visibleRows, setVisibleRows] = React.useState([]);

    React.useEffect(() => {
        const sortedRows = stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
        setVisibleRows(sortedRows);
    }, [rows, order, orderBy, page, rowsPerPage]);

    // const deleteId = async (id) => {
    //     console.log("id : ", id);
    //     await deleteUser(id);
    //     await reload();
    //     await console.log("finish");
    // };

    const handleRequestSort = (event, property) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table sx={{minWidth: 750}} aria-labelledby="tableTitle"
                           size={'medium'}>
                        <EnhancedTableHead
                            order={order}
                            orderBy={orderBy}
                            onRequestSort={handleRequestSort}
                            rowCount={rows.length}
                        />
                        <TableBody>
                            {visibleRows.map((row, index) => (
                                <TableRow hover key={row.discord_id}
                                          sx={{cursor: 'pointer'}}>
                                    <TableCell
                                        component="th"
                                        className="table__cell__pseudo"
                                        id={`enhanced-table-checkbox-${index}`}
                                        scope="row"
                                    >
                                        <div
                                            className="playerTable__div__container">
                                            <img
                                                src={row.image ? row.image : "https://cdn.whatemoji.org/wp-content/uploads/2020/07/Robot-Emoji.png"}
                                                className={"image__avatar"}
                                                alt={`Card picture of ${row.name}`}
                                            />
                                            <p>{row.name}</p>
                                        </div>
                                    </TableCell>
                                    <TableCell
                                        align="right">{row.attack}</TableCell>
                                    <TableCell
                                        align="right">{row.pv}</TableCell>
                                    <TableCell
                                        align="right">{row.price}</TableCell>
                                    <TableCell align="right">
                                        <div
                                            className={`tag__card tag__card${row.rarity}`}>
                                            {row.rarity}
                                        </div>
                                    </TableCell>
                                    <TableCell align="right">
                                        {row.pseudo_owner ? row.pseudo_owner : "not owned"}
                                    </TableCell>
                                    <TableCell align="right">edit</TableCell>
                                    <TableCell align="right">delete</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{height: 53 * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25]}
                    component="div"
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </Box>
    );
}
