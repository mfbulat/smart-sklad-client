import React, {useState} from 'react';
import {createStyles, makeStyles, Theme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";
import {setSaleDocumentId, setSelectedItemsId, setShowUpdateProduct} from "../../state/app-reducer";
import AddProductDialog from "../utils/AddProductDialog";
import DeleteForeverSharpIcon from '@material-ui/icons/DeleteForeverSharp';
import {removeProduct} from "../../state/products-reducer";
import {useHistory} from 'react-router-dom';

export type ProductType = {
    id: string
    categoryId: number
    name: string
    code: string;
    supplierCode: string;
    unit: "шт" | "пара" | "комп";
    qt: number
    purchasePrice: number
    salePrice: number
}
export type SaleDocumentType = {
    id: string,
    number: string,
    time: string,
    supplier: string,
    sum: number,
    paid: string,
    sent: string,
    printed: string,
    comment: string,
}

const initialStateAddProduct = {
    id: '',
    categoryId: 1,
    name: '',
    code: '',
    supplierCode: '',
    unit: 'шт',
    qt: 0,
    purchasePrice: 0,
    salePrice: 0,
} as ProductType

const initialStateSaleDocument = {
    id: '111',
    number: '',
    time: '',
    supplier: '',
    sum: 0,
    paid: 'paid',
    sent: '',
    printed: 'false',
    comment: '',
} as SaleDocumentType


const headCells: HeadCell[] = [
    {id: 'number', numeric: false, disablePadding: true, label: '№'},
    {id: 'time', numeric: false, disablePadding: true, label: 'Time'},
    {id: 'supplier', numeric: true, disablePadding: false, label: 'Supplier'},
    {id: 'sum', numeric: false, disablePadding: false, label: 'Sum'},
    {id: 'paid', numeric: false, disablePadding: false, label: 'Paid'},
    {id: 'sent', numeric: true, disablePadding: false, label: 'Sent'},
    {id: 'printed', numeric: true, disablePadding: false, label: 'Printed'},
    {id: 'comment', numeric: true, disablePadding: false, label: 'Comment'},
];

function descendingComparator<T>(a: T, b: T, orderBy: keyof T) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}

type Order = 'asc' | 'desc';

function getComparator<Key extends keyof any>(
    order: Order,
    orderBy: Key,
): (a: { [key in Key]: number | string }, b: { [key in Key]: number | string }) => number {
    return order === 'desc'
        ? (a, b) => descendingComparator(a, b, orderBy)
        : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort<T>(array: T[], comparator: (a: T, b: T) => number) {
    const stabilizedThis = array.map((el, index) => [el, index] as [T, number]);
    stabilizedThis.sort((a, b) => {
        const order = comparator(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
}

interface HeadCell {
    disablePadding: boolean;
    id: string;
    label: string;
    numeric: boolean;
}


interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: string) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: string) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
    };

    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" className={classes.head}>
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={rowCount > 0 && numSelected === rowCount}
                        onChange={onSelectAllClick}
                        inputProps={{'aria-label': 'select all desserts'}}
                    />
                </TableCell>
                {headCells.map((headCell) => (
                    <TableCell
                        className={classes.head}
                        key={headCell.id}
                        align={headCell.numeric ? 'right' : 'left'}
                        padding={headCell.disablePadding ? 'none' : 'normal'}
                        sortDirection={orderBy === headCell.id ? order : false}
                    >
                        <TableSortLabel
                            active={orderBy === headCell.id}
                            direction={orderBy === headCell.id ? order : 'asc'}
                            onClick={createSortHandler(headCell.id)}
                        >
                            {headCell.label}
                            {orderBy === headCell.id ? (
                                <span className={classes.visuallyHidden}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </span>
                            ) : null}
                        </TableSortLabel>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
        },
        paper: {
            width: '100%',
            marginBottom: theme.spacing(2),
        },
        table: {
            minWidth: 750,
        },
        visuallyHidden: {
            border: 0,
            clip: 'rect(0 0 0 0)',
            height: 1,
            margin: -1,
            overflow: 'hidden',
            padding: 0,
            position: 'absolute',
            top: 20,
            width: 1,
        },
        head: {
            background: 'white',
            position: "sticky",
            top: 60,
        },
        id: {
            cursor: "pointer"
        },
        time: {
            cursor: "pointer"
        },
    }),
);

type SalesBodyPropsType = {

}

const SalesBody: React.FC<SalesBodyPropsType> = () => {
    const sales = useSelector<AppRootStateType, SaleDocumentType[]>((state) => state.sale)
    const categoryClickId = useSelector<AppRootStateType>((state) => state.app.categoryClickedId)
    const selected = useSelector<AppRootStateType, string[]>((state) => state.app.selectedItemsId)

    const showUpdateProduct = useSelector<AppRootStateType, boolean>((state) => state.app.showUpdateProduct)
    const dispatch = useDispatch()
    const classes = useStyles();

    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<string>('code');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const [deleteProductVisible, setDeleteProductVisible] = React.useState('');

    const history = useHistory()

    const rows = sales
    const rowsHeightStyle = (dense ? 53 : 33) - 4;


    const onUpdateProduct = () => {
        dispatch(setShowUpdateProduct(!showUpdateProduct))
        setChouseProduct(initialStateAddProduct)
    };

    const [chouseProduct, setChouseProduct] = useState<ProductType>(initialStateAddProduct)

    const onNameRow = (saleId: string) => {
        dispatch(setSaleDocumentId(+saleId))
        history.push('/sale');
    }

    const onDeleteProduct = (productId: string) => {
        dispatch(removeProduct(productId))
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: string) => {
        const isAsc = orderBy === property && order === 'asc';
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(property);
    };

    const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.checked) {
            const newSelecteds = rows.map((n) => n.id);
            dispatch(setSelectedItemsId(newSelecteds))
            return;
        }
        dispatch(setSelectedItemsId([]))

    };

    const handleClick = (event: React.MouseEvent<unknown>, id: string) => {
        const selectedIndex = selected.indexOf(id);
        let newSelected: string[] = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }
        dispatch(setSelectedItemsId(newSelected))
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleChangeDense = () => {
        setDense(!dense);
    };

    const isSelected = (name: string) => selected.indexOf(name) !== -1;

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

    return (
        <div className={classes.root}>
            <Paper className={classes.paper}>
                <Table
                    stickyHeader
                    className={classes.table}
                    aria-labelledby="tableTitle"
                    size={!dense ? 'small' : 'medium'}
                    aria-label="enhanced table"
                >
                    <EnhancedTableHead
                        classes={classes}
                        numSelected={selected.length}
                        order={order}
                        orderBy={orderBy}
                        onSelectAllClick={handleSelectAllClick}
                        onRequestSort={handleRequestSort}
                        rowCount={rows.length}
                    />
                    <TableBody>
                        {stableSort(sales, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                return (
                                    <TableRow
                                        hover
                                        role="checkbox"
                                        aria-checked={isItemSelected}
                                        tabIndex={-1}
                                        key={row.id}
                                        selected={isItemSelected}
                                        onMouseEnter={() => setDeleteProductVisible(row.id)}
                                        onMouseLeave={() => setDeleteProductVisible('')}
                                    >
                                        <TableCell padding="checkbox"
                                                   onClick={(event) => handleClick(event, row.id)}>
                                            <Checkbox
                                                checked={isItemSelected}
                                                inputProps={{'aria-labelledby': labelId}}
                                            />
                                        </TableCell>
                                        <TableCell component="th" id={labelId} scope="row"
                                                   padding="none" className={classes.id}
                                                   onClick={() => onNameRow(row.id)}
                                        >
                                            {row.number}
                                        </TableCell>
                                        <TableCell align="right" className={classes.time}
                                                   onClick={() => onNameRow(row.id)}>{row.time}</TableCell>
                                        <TableCell align="left">{row.supplier}</TableCell>
                                        <TableCell align="left">{row.sum}</TableCell>
                                        <TableCell align="right">{row.paid}</TableCell>
                                        <TableCell align="right">{row.sent}</TableCell>
                                        <TableCell align="right">{row.printed}</TableCell>
                                        <TableCell align="right">{row.comment}</TableCell>
                                        <div style={{
                                            position: 'absolute',
                                            height: rowsHeightStyle,
                                            width: rowsHeightStyle,
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            cursor: 'pointer',
                                        }}>
                                            {deleteProductVisible === row.id &&
                                            <DeleteForeverSharpIcon
                                                color="action"
                                                onClick={() => onDeleteProduct(row.id)}
                                            />}
                                        </div>
                                    </TableRow>
                                );
                            })}
                        {
                            emptyRows > 0 && (
                                <TableRow style={{height: rowsHeightStyle * emptyRows}}>
                                    <TableCell colSpan={8}/>
                                </TableRow>
                            )
                        }
                    </TableBody>
                </Table>
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
            <FormControlLabel
                control={<Switch checked={dense} onChange={handleChangeDense}/>}
                label="Dense padding"
            />

            <AddProductDialog
                dialogTitle={"Редактировать товар"}
                showAddProduct={showUpdateProduct}
                onAddProduct={onUpdateProduct}
                product={chouseProduct}
            />
        </div>
    );
}

export default SalesBody;
