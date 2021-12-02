
import React from "react";
import DataTable from 'react-data-table-component';
import DataTableExtensions from 'react-data-table-component-extensions';
import { Form } from 'react-bootstrap';

import {
  Col
} from "reactstrap";


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

const FilterTextComponent = ({ col, filterText, onFilter, onClear }) => (
  <>
    <Form.Group as={Col} md={3} controlId={col.selector} key={col.selector}>

      <Form.Control type="text"
        id={col.selector}
        placeholder={"Enter " + col.name}
        value={filterText}
        onChange={(e) => onFilter(e, col)} />


    </Form.Group>
  </>
);

const FilterSelectComponent = ({ col, filterText, onFilter, items }) => (
  <>
    <Form.Group as={Col} md={3} controlId={col.selector} key={col.selector}>

      <Form.Control as="select" value={filterText}
        id={col.selector} onChange={(e) => onFilter(e, col)}>
        <option key={0} value={""}>ALL</option>
        {items.map(item => (
          <option key={item.Id} value={item.Id}>{item.Display}</option>
        ))}

      </Form.Control>

    </Form.Group>
  </>
);


class DataTableWithFilter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggledClearRows: false,
      filtereddata: this.props.data,
      data: this.props.data,
      columns: this.props.columns,
      subHeader: false,
      setFilter: []
    }
    this.handleClearRows = this.handleClearRows.bind(this);
  }
  onSelectedRowsChange(state) {
    this.props.onSelectedRows(state.selectedRows);
  }

  handleClearRows() {
    this.setState({ toggledClearRows: !this.state.toggledClearRows });
  }



  componentWillMount() {
    this.setState({
      filtereddata: this.props.data,
      data: this.props.data,
      columns: this.props.columns
    });
    if (this.props.data && this.props.data.length > 0)
      this.fnSubHeder();
  }

  componentWillUpdate() {

  }

  componentWillReceiveProps(newprops, oldprops) {

    this.setState({
      filtereddata: newprops.data,
      data: newprops.data,
      columns: newprops.columns
    });

    //setTimeout(function () {
    this.fnFilteredData(newprops.data);
    //}.bind(this), 500);
    if (newprops.data && newprops.data.length > 0)
      this.fnSubHeder();
  }



  onTextFilter(e, col) {

    let filters = this.state.setFilter;
    filters[col.selector] = e.target.value;
    this.setState({ setFilter: filters });
    console.log("filters", filters);
    //setTimeout(function () {
    this.fnFilteredData(this.state.data, filters);
    //}.bind(this), 500);

  }
  onSelectFilter(e, col) {

    let filters = this.state.setFilter;
    var index = e.target.selectedIndex;
    //debugger;
    if (index == 0) {
      console.log("filters", filters);
      delete filters[col.selector];
    }
    else {
      filters[col.selector] = e.target[index].text;      
    }
    this.setState({ setFilter: filters });
    console.log("filters", filters);
    //setTimeout(function () {
    this.fnFilteredData(this.state.data, filters);
    //}.bind(this), 500);

  }
  handleTextClear() {

  }

  fnSubHeder() {
    let searchables = [];
    let setFilters = [];
    let that = this;
    this.state.columns.forEach(col => {

      if (col.searchable) {

        if (col.type === "dropdown" && col.config && col.config.data) {
          searchables.push(<FilterSelectComponent
            col={col}
            onFilter={that.onSelectFilter.bind(this)}
            filterText={that.state.setFilter[col.selector]}
            items={col.config.data} />);
        }
        else {
          searchables.push(<FilterTextComponent
            col={col}
            onFilter={that.onTextFilter.bind(this)}
            onClear={that.handleTextClear}
            //filterText={that.state.setFilter[col.selector]} 
            />
            );
        }
      }
    });
    if (searchables.length > 0) {
      this.setState({ subHeader: true, subHeaderComponent: searchables });
    }
  }

  fnFilteredData(data, Filter) {
    data = data ?? this.state.data;
    Filter = Filter ?? this.state.setFilter;
    for (var key in Filter) {
      data = this.fnFilteredItems(data, key, Filter[key]);
    }

    this.setState({ filtereddata: data });

  }

  fnFilteredItems(items, filterName, filterValue) {

    if (filterValue == "") {
      return items;
    }

    if (typeof (items) != 'undefined') {
      const filteredItems = items.filter(item => String(item[filterName]).toString().toUpperCase().indexOf(filterValue.toUpperCase()) > -1);
      return filteredItems;
    }
    else {
      return items;
    }

  }


  render() {
    let extention = this.props.extention === undefined ? true : this.props.extention

    if (extention)
      return (
        <div className="content">
          <DataTableExtensions

            columns={this.state.columns}
            data={this.state.filtereddata}
            //filter={this.props.filter}
            filter={false}
            export={this.props.export}
            print={this.props.print}
            exportHeaders={true}
          >

            <DataTable
              defaultSortField={this.props.defaultSortField}
              defaultSortAsc={this.props.defaultSortAsc}
              striped={true}
              noHeader
              fixedHeader={false}
              pagination={this.props.pagination === undefined ? true : this.props.pagination}
              paginationPerPage={100}
              paginationRowsPerPageOptions={[100, 150, 200, 300]}
              dense
              highlightOnHover
              responsive={true}
              overflowY={true}
              customStyles={customStyles}
              selectableRows={this.props.selectableRows === undefined ? false : this.props.selectableRows}
              onSelectedRowsChange={this.onSelectedRowsChange.bind(this)}
              clearSelectedRows={this.state.toggledClearRows}
              selectableRowsNoSelectAll={true}

              subHeader={this.state.subHeader}
              subHeaderAlign={'right'}
              subHeaderComponent={this.state.subHeaderComponent}
            />
          </DataTableExtensions>

        </div>
      );
    else {
      return (
        <div className="content">
          <DataTable
            defaultSortField={this.props.defaultSortField}
            defaultSortAsc={this.props.defaultSortAsc}
            columns={this.state.columns}
            data={this.state.data}
            striped={true}
            noHeader={true}
            pagination={this.props.pagination === undefined ? true : this.props.pagination}
            paginationPerPage={100}
            paginationRowsPerPageOptions={[100, 150, 200, 300]}
            dense
            highlightOnHover
            responsive={true}
            overflowY={true}
            customStyles={customStyles}
            selectableRows={this.props.selectableRows === undefined ? false : this.props.selectableRows}
            onSelectedRowsChange={this.onSelectedRowsChange.bind(this)}
            clearSelectedRows={this.state.toggledClearRows}
            selectableRowsNoSelectAll={true}
          />
        </div>);
    }
  }
}



export default DataTableWithFilter;
