
import React from "react";
import BootstrapTable from 'react-bootstrap-table-next';

import ToolkitProvider, { Search, CSVExport } from 'react-bootstrap-table2-toolkit';
import paginationFactory from 'react-bootstrap-table2-paginator';


const { ExportCSVButton } = CSVExport;


const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
    },
  },
};

class DataGrid extends React.Component {
  constructor(props) {
    super(props);
    this.state = { selected: [] };

  }

  setSelected(selected) {
    this.setState({ selected });
  }

  getSelected() {
    return this.state.selected;
  }


  // componentDidUpdate() {
  //   console.log("componentDidUpdate")
  // }

  // componentWillUpdate() {
  //   console.log("componentWillUpdate")
  // }

  // componentWillReceiveProps(newprops, oldprops) {
  //   console.log("componentWillReceiveProps");    
  // }

  // componentWillUnmount() {
  //   console.log("componentWillUnmount")
  // }


  handleOnSelect = (row, isSelect) => {
    debugger;
    if (isSelect) {
      this.setState(() => ({
        selected: [...this.state.selected, row[this.props.keyField]]
      }));
    } else {
      this.setState(() => ({
        selected: this.state.selected.filter(x => x !== row[this.props.keyField])
      }));
    }
  }

  handleOnSelectAll = (isSelect, rows) => {
    const ids = rows.map(r => r.id);
    if (isSelect) {
      this.setState(() => ({
        selected: ids
      }));
    } else {
      this.setState(() => ({
        selected: []
      }));
    }
  }
  render() {
    const selectRow = {
      mode: 'checkbox',
      clickToSelect: true,
      selected: this.state.selected,
      onSelect: this.handleOnSelect,
      onSelectAll: this.handleOnSelectAll,
      style: { backgroundColor: '#c8e6c9' },
      hideSelectAll: true
    };
    const sizePerPageOptionRenderer = ({
      text,
      page,
      onSizePerPageChange
    }) => (
        <li
          key={text}
          role="presentation"
          className="dropdown-item"
        >
          <a
            href="#"
            tabIndex="-1"
            role="menuitem"
            data-page={page}
            onMouseDown={(e) => {
              e.preventDefault();
              onSizePerPageChange(page);
            }}
            style={{ color: 'red' }}
          >
            {text}
          </a>
        </li>
      );

    const options = {
      sizePerPageOptionRenderer
    };
    const thatprops = this.props;

    return (
      <div className="content">

        <ToolkitProvider
          keyField={thatprops.keyField}
          columns={thatprops.columns}
          data={thatprops.data}
          exportCSV
        >{
            props => (
              <div>
                <ExportCSVButton {...props.csvProps}>Export CSV!!</ExportCSVButton>
                <hr />
                <BootstrapTable
                  striped
                  hover
                  condensed
                  responsive
                  selectRow={thatprops.selectableRows ? selectRow : null}
                  filter={thatprops.filter} 
                  {...props.baseProps} 
                  pagination={ paginationFactory(options) }
                  />
              </div>
            )
          }
        </ToolkitProvider>



      </div>);
  }

}



export default DataGrid;
