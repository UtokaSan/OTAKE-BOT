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

// function createData(id, name, rarity, calories, fat, carbs, protein, readMore) {
//     return {id, name, rarity, calories, fat, carbs, protein, readMore};
// }

// const rows = [
//     createData(1, 'Loading', "Loading", "Loading", "Loading", "Loading", "Loading",
//         <a
//             href="http://google.com">Loading</a>),
//     createData(2, 'Donut', "Uncommun", 452, 25.0, 51, 4.9, <a
//         href="http://google.com">Read more</a>),
// createData(3, 'Eclair', "Commun", 262, 16.0, 24, 6.0, <a
//     href="http://google.com">Read more</a>),
// createData(4, 'Frozen yoghurt', "Commun", 159, 6.0, 24, 4.0, <a
//     href="http://google.com">Read more</a>),
// createData(5, 'Gingerbread', "Uncommun", 356, 16.0, 49, 3.9, <a
//     href="http://google.com">Read more</a>),
// createData(6, 'Honeycomb', "Legendary", 408, 3.2, 87, 6.5, <a
//     href="http://google.com">Read more</a>),
// createData(7, 'Ice cream sandwich', "Commun", 237, 9.0, 37, 4.3, <a
//     href="http://google.com">Read more</a>),
// createData(8, 'Jelly Bean', "Commun", 375, 0.0, 94, 0.0, <a
//     href="http://google.com">Read more</a>),
// createData(9, 'KitKat', "Commun", 518, 26.0, 65, 7.0, <a
//     href="http://google.com">Read more</a>),
// createData(10, 'Lollipop', "Commun", 392, 0.2, 98, 0.0, <a
//     href="http://google.com">Read more</a>),
// createData(11, 'Marshmallow', "Commun", 318, 0, 81, 2.0, <a
//     href="http://google.com">Read more</a>),
// createData(12, 'Nougat', "Commun", 360, 19.0, 9, 37.0, <a
//     href="http://google.com">Read more</a>),
// createData(13, 'Oreo', "Commun", 437, 18.0, 63, 4.0, <a
//     href="http://google.com">Read more</a>),
// ];

function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) return -1;
    if (b[orderBy] > a[orderBy]) return 1;
    return 0;
}

function getRarityOrder(rarity) {
    switch (rarity) {
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

function getData() {

}

const headCells = [
    {
        id: 'pseudo',
        numeric: false,
        disablePadding: false,
        label: 'Pseudo'
    },
    {
        id: 'money',
        numeric: false,
        disablePadding: false,
        label: 'Money'
    },
    {id: 'status', numeric: true, disablePadding: false, label: 'Status'},
    {id: 'delete', numeric: true, disablePadding: false, label: 'Delete'},
    {id: 'readMore', numeric: true, disablePadding: false, label: 'Read more'}

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

export default function BasicTable({rows}) {
    const [order, setOrder] = React.useState('desc'); // or 'desc'
    const [orderBy, setOrderBy] = React.useState('rarity');

    const [selected, setSelected] = React.useState([]);
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    console.log("rows : ", rows);

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

    const visibleRows = React.useMemo(() => {
        return stableSort(rows, getComparator(order, orderBy)).slice(
            page * rowsPerPage,
            page * rowsPerPage + rowsPerPage
        );
    }, [order, orderBy, page, rowsPerPage]);


    return (
        <Box sx={{width: '100%'}}>
            <Paper sx={{width: '100%', mb: 2}}>
                <TableContainer>
                    <Table sx={{minWidth: 750}} aria-labelledby="tableTitle"
                           size={dense ? 'small' : 'medium'}>
                        <EnhancedTableHead order={order} orderBy={orderBy}
                                           onRequestSort={handleRequestSort}
                                           rowCount={rows.length}/>
                        <TableBody>
                            {visibleRows.map((row, index) => (
                                <TableRow hover key={row.id}
                                          sx={{cursor: 'pointer'}}>
                                    <TableCell component="th"
                                               id={`enhanced-table-checkbox-${index}`}
                                               scope="row" padding="none">
                                        {row.pseudo}
                                    </TableCell>
                                    <TableCell
                                        align="left">{row.money}</TableCell>
                                    {/*<TableCell*/}
                                    {/*    align="left">{row.rarity}</TableCell>*/}
                                    <TableCell
                                        align="right">{row.status}</TableCell>
                                    <TableCell
                                        align="right">delete</TableCell>
                                    <TableCell
                                        align="right">readmore</TableCell>
                                </TableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow
                                    style={{height: (dense ? 33 : 53) * emptyRows}}>
                                    <TableCell colSpan={6}/>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination rowsPerPageOptions={[5, 10, 25]}
                                 component="div" count={rows.length}
                                 rowsPerPage={rowsPerPage} page={page}
                                 onPageChange={handleChangePage}
                                 onRowsPerPageChange={handleChangeRowsPerPage}/>
            </Paper>
        </Box>
    );
}