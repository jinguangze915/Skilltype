import React from 'react'
import {
  string,
  number,
  array,
  func,
  object,
  shape,
  arrayOf,
  oneOfType,
} from 'prop-types'
import merge from 'lodash.merge'
import MuiTable from '@material-ui/core/Table'
import MuiTableHead from '@material-ui/core/TableHead'
import MuiTableBody from '@material-ui/core/TableBody'
import MuiTableRow from '@material-ui/core/TableRow'
import MuiTableCell from '@material-ui/core/TableCell'
import { withStyles } from '@material-ui/core/styles'
import { withTheme } from 'react-jss'

const makeStyled = (Component, styles) => withStyles(styles)(Component)

const defaultStyles = theme => ({
  Table: {
    root: {},
  },
  TableHead: {
    root: {
      backgroundColor: theme.lighterGrey,
    },
  },
  TableBody: {
    root: {},
  },
  TableRow: {
    root: {
      alignItems: 'center',
      alignContent: 'center',
      verticalAlign: 'middle',
    },
    hover: {
      backgroundColor: theme.paleYellow,
    },
  },
  TableCell: {
    root: {
      fontSize: theme.fontSizeNormal,
      width: '150px',
    },
    head: {
      color: theme.black,
      paddingTop: 0,
      paddingBottom: 0,
    },
  },
})

class Table extends React.Component {
  static propTypes = {
    /**
     */
    columns: oneOfType([
      arrayOf(string),
      arrayOf(
        shape({
          name: string.isRequired,
          options: shape({
            customHeadRender: func,
            customBodyRender: func,
            setCellProps: func,
          }),
        })
      ),
    ]).isRequired,
    /** */
    data: oneOfType([arrayOf(array)]).isRequired,
    /** */
    onUpdate: func,
    /**
     * Style object used in pass as overrides to the Material UI Table components.
     *
     * See Table components at the bottom of this page and look at style overrides
     * https://material-ui.com/demos/tables/#tables
     *
     * Each `MUITable{*}` object will be used as a classname override to the underlying Material UI component using `withStyles`. For an example see:
     * https://material-ui.com/customization/overrides/#overriding-with-classes
     */
    styles: shape({
      Table: object,
      TableHead: object,
      TableBody: object,
      TableRow: object,
      TableCell: object,
    }),
    /**
     * Sets the maximum height of the table's containing div.
     * Can be a pixel value (number)
     * Can be a percentage value (string)
     */
    maxHeight: oneOfType([number, string]),
  }

  static defaultProps = {
    onUpdate: () => {},
    maxHeight: 600,
  }

  // TODO: @jacob - Handle all sorts of things here like the state of the updating promise
  state = {
    data: this.props.data,
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.state.data) {
      this.setState({ data: nextProps.data })
    }
  }

  getStyles = (style = {}, theme) => merge(defaultStyles(theme), style)
  updateValue = (rowIndex, columnIndex, value) => {
    const newData = this.state.data
    newData[rowIndex][columnIndex] = value
    this.setState({ data: newData }, () =>
      this.props.onUpdate(newData[rowIndex], rowIndex, columnIndex)
    )
  }

  render() {
    const {
      columns,
      theme,
      styles: stylesOverride,
      maxHeight,
      classes,
    } = this.props
    const { data } = this.state
    const styles = this.getStyles(stylesOverride, theme)

    const Table = makeStyled(MuiTable, styles.Table)
    const TableHead = makeStyled(MuiTableHead, styles.TableHead)
    const TableBody = makeStyled(MuiTableBody, styles.TableBody)
    const TableRow = makeStyled(MuiTableRow, styles.TableRow)
    const TableCell = makeStyled(MuiTableCell, styles.TableCell)

    // Don't render the table without head or data
    if (!columns || !data) {
      return null
    }

    if (!columns.length || !data.length) {
      return null
    }

    return (
      <div style={{ maxHeight, overflowY: 'scroll' }}>
        <Table classes={classes}>
          <TableHead>
            <TableRow>
              {columns.map((column, columnIndex) => {
                const key = `TableHeader-TableCell-0-${columnIndex}`
                const value = typeof column === 'object' ? column.name : column
                const customHeadRender =
                  typeof column === 'object' &&
                  column.options &&
                  column.options.customHeadRender
                return (
                  <TableCell key={key}>
                    {typeof customHeadRender === 'function'
                      ? customHeadRender(value)
                      : value}
                  </TableCell>
                )
              })}
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, rowIndex) => (
              <TableRow key={`TableBody-TableRow-${rowIndex}`}>
                {row.map((value, columnIndex) => {
                  const key = `TableBody-TableCell-${rowIndex}-${columnIndex}`
                  const column = columns[columnIndex]
                  const customBodyRender =
                    column && column.options && column.options.customBodyRender
                  const rowData = data[rowIndex]
                  // eslint-disable-next-line react/jsx-no-bind
                  const updateValue = this.updateValue.bind(
                    this,
                    rowIndex,
                    columnIndex
                  )
                  return (
                    <TableCell key={key}>
                      {typeof customBodyRender === 'function'
                        ? customBodyRender(
                            value,
                            updateValue,
                            rowData,
                            rowIndex,
                            columnIndex
                          )
                        : value}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    )
  }
}

export default withTheme(Table)
