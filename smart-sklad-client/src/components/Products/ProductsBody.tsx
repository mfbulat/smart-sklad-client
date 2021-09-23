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
import {setSelectedItemsId, setShowUpdateProduct} from "../../state/app-reducer";
import AddProductDialog from "../utils/AddProductDialog";

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
    id: keyof ProductType;
    label: string;
    numeric: boolean;
}

const headCells: HeadCell[] = [
    {id: 'name', numeric: false, disablePadding: true, label: 'Name'},
    {id: 'code', numeric: true, disablePadding: false, label: 'Code'},
    {id: 'supplierCode', numeric: false, disablePadding: false, label: 'SCode'},
    {id: 'unit', numeric: false, disablePadding: false, label: 'Unit'},
    {id: 'qt', numeric: true, disablePadding: false, label: 'qt'},
    {id: 'salePrice', numeric: true, disablePadding: false, label: 'Selling Price'},
    {id: 'purchasePrice', numeric: true, disablePadding: false, label: 'Purchase Price'},
];

interface EnhancedTableProps {
    classes: ReturnType<typeof useStyles>;
    numSelected: number;
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof ProductType) => void;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
}

function EnhancedTableHead(props: EnhancedTableProps) {
    const {classes, onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort} = props;
    const createSortHandler = (property: keyof ProductType) => (event: React.MouseEvent<unknown>) => {
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
            top: 60
        },
        nameRow: {
            cursor: "pointer"
        },
    }),
);

export default function ProductsBody() {
    const products = useSelector<AppRootStateType, ProductType[]>((state) => state.products)
    const categoryClickId = useSelector<AppRootStateType>((state) => state.app.categoryClickedId)
    const selected = useSelector<AppRootStateType, string[]>((state) => state.app.selectedItemsId)
    const dispatch = useDispatch()
    const classes = useStyles();
    const [order, setOrder] = React.useState<Order>('asc');
    const [orderBy, setOrderBy] = React.useState<keyof ProductType>('code');
    const [page, setPage] = React.useState(0);
    const [dense, setDense] = React.useState(false);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);
    const showUpdateProduct = useSelector<AppRootStateType, boolean>((state) => state.app.showUpdateProduct)

    const rows = products.filter(p => p.categoryId === categoryClickId)


    const onUpdateProduct = () => {
        dispatch(setShowUpdateProduct(!showUpdateProduct))
        setChouseProduct(initialStateAddProduct)
    };

    const [chouseProduct, setChouseProduct] = useState<ProductType>(initialStateAddProduct)

    const onNameRow = (product: ProductType) => {
        onUpdateProduct()
        setChouseProduct(product)
    }

    const handleRequestSort = (event: React.MouseEvent<unknown>, property: keyof ProductType) => {
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
        // setSelected(newSelected);
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
                        {stableSort(rows, getComparator(order, orderBy))
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row, index) => {
                                const isItemSelected = isSelected(row.id);
                                const labelId = `enhanced-table-checkbox-${index}`;
                                if (row.categoryId === categoryClickId) {
                                    return (
                                        <TableRow
                                            hover
                                            role="checkbox"
                                            aria-checked={isItemSelected}
                                            tabIndex={-1}
                                            key={row.id}
                                            selected={isItemSelected}
                                        >
                                            <TableCell padding="checkbox"
                                                       onClick={(event) => handleClick(event, row.id)}>
                                                <Checkbox
                                                    checked={isItemSelected}
                                                    inputProps={{'aria-labelledby': labelId}}
                                                />
                                            </TableCell>
                                            <TableCell component="th" id={labelId} scope="row"
                                                       padding="none" className={classes.nameRow}
                                                       onClick={() => onNameRow(row)}
                                            >
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="right">{row.code}</TableCell>
                                            <TableCell align="left">{row.supplierCode}</TableCell>
                                            <TableCell align="left">{row.unit}</TableCell>
                                            <TableCell align="right">{row.qt}</TableCell>
                                            <TableCell align="right">{row.salePrice}</TableCell>
                                            <TableCell align="right">{row.purchasePrice}</TableCell>
                                        </TableRow>
                                    );
                                }
                            })}
                        {emptyRows > 0 && (
                            <TableRow style={{height: (dense ? 33 : 53) * emptyRows}}>
                                <TableCell colSpan={6}/>
                            </TableRow>
                        )}
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
