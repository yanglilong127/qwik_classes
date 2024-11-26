import { component$ } from '@builder.io/qwik';
import { qwikify$ } from '@builder.io/qwik-react';
import { Alert, Button, Slider, Table, TableBody, TableCell, TableContainer, TableHead, 
  TableRow 
 } from '@mui/material';
 
export const MUIButton = qwikify$(Button);
export const MUIAlert = qwikify$(Alert);
export const MUISlider = qwikify$(Slider, { eagerness: 'hover' });
export const MUITable = qwikify$(Table);
export const MUITableBody = qwikify$(TableBody);
export const MUITableCell = qwikify$(TableCell);
export const MUITableContainer = qwikify$(TableContainer);
export const MUITableHead = qwikify$(TableHead);
export const MUITableRow = qwikify$(TableRow);

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number,
) {
  return { name, calories, fat, carbs, protein };
}
 
export default component$(() => {
  const rows = [
    createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
    createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
    createData('Eclair', 262, 16.0, 24, 6.0),
    createData('Cupcake', 305, 3.7, 67, 4.3),
    createData('Gingerbread', 356, 16.0, 49, 3.9),
  ];
  return (
    <>
      <MUIButton client:hover>button按钮</MUIButton>
      <MUIAlert severity="warning">警告信息</MUIAlert>

      <MUITableContainer>
        <MUITable sx={{ minWidth: 650 }} aria-label="simple table">
          <MUITableHead>
            <MUITableRow>
              <MUITableCell>Dessert (100g serving)</MUITableCell>
              <MUITableCell align="right">Calories</MUITableCell>
              <MUITableCell align="right">Fat&nbsp;(g)</MUITableCell>
              <MUITableCell align="right">Carbs&nbsp;(g)</MUITableCell>
              <MUITableCell align="right">Protein&nbsp;(g)</MUITableCell>
            </MUITableRow>
          </MUITableHead>
          <MUITableBody>
            {rows.map((row) => (
              <MUITableRow
                key={row.name}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <MUITableCell component="th" scope="row">
                  {row.name}
                </MUITableCell>
                <MUITableCell align="right">{row.calories}</MUITableCell>
                <MUITableCell align="right">{row.fat}</MUITableCell>
                <MUITableCell align="right">{row.carbs}</MUITableCell>
                <MUITableCell align="right">{row.protein}</MUITableCell>
              </MUITableRow>
            ))}
          </MUITableBody>
        </MUITable>
      </MUITableContainer>
    </>
  );
});