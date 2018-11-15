import React from "react";
import moment from "moment";
import ReactExport from "react-data-export";

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const dataSet1 = [
  {
    name: "Johson",
    amount: 30000,
    sex: "M",
    is_married: true
  },
  {
    name: "Monika",
    amount: 355000,
    sex: "F",
    is_married: false
  },
  {
    name: "John",
    amount: 250000,
    sex: "M",
    is_married: false
  },
  {
    name: "Josef",
    amount: 450500,
    sex: "M",
    is_married: true
  }
];

var dataSet2 = [
  {
    name: "Johnson",
    total: 25,
    remainig: 16
  },
  {
    name: "Josef",
    total: 25,
    remainig: 7
  }
];

class Download extends React.Component {
  render() {
    return (
      <ExcelFile
        element={<button className="btn btn-primary">Xuất báo cáo</button>}
      >
        <ExcelSheet data={dataSet1} name="Employees">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Wallet Money" value="amount" />
          <ExcelColumn label="Gender" value="sex" />
          <ExcelColumn
            label="Marital Status"
            value={col => (col.is_married ? "Married" : "Single")}
          />
        </ExcelSheet>
        <ExcelSheet data={dataSet2} name="Leaves">
          <ExcelColumn label="Name" value="name" />
          <ExcelColumn label="Total Leaves" value="total" />
          <ExcelColumn label="Remaining Leaves" value="remaining" />
        </ExcelSheet>
      </ExcelFile>
    );
  }
}

export default class ExportExcel extends React.Component {
  state = {
    teamNumInMonth: {},
    selectingMonth: null
  };

  componentWillReceiveProps(newProps) {
    if (newProps.projects.submits)
      this.calcDashBoard(newProps.projects.submits);
  }
  calcMonthNum(created_at, ended_at) {
    let start = moment(created_at).month();
    let end = moment(ended_at).month();
    return { start, end };
  }

  calcDashBoard = submits => {
    let totalTeam = {};
    if (submits) {
      submits.forEach(submit => {
        if (!totalTeam[moment(submit.date).month()])
          totalTeam[moment(submit.date).month()] = 1;
        else {
          totalTeam[moment(submit.date).month()] += 1;
        }
      });
    }

    this.setState({ teamNumInMonth: totalTeam });
  };
  generateOptionMonth = (start, end) => {
    let options = [];
    options.push(<option key={"month_129312"}>Chọn tháng</option>);
    while (start <= end) {
      options.push(
        <option value={start} key={"month_" + start}>
          Tháng {start + 1}
        </option>
      );
      start += 1;
    }
    return options;
  };

  handleChangeMonth = month => {
    console.log(month);
    this.setState({ selectingMonth: month });
  };

  render() {
    const { submits, created_at, ended_at } = this.props.projects;
    const { teamNumInMonth, selectingMonth } = this.state;
    let { start, end } = this.calcMonthNum(created_at, ended_at);
    return (
      <span>
        <div className="form-group col-sm-2 col-md-4 col-lg-2 sticky-top">
          <select
            className="form-control"
            onChange={e => this.handleChangeMonth(e.target.value)}
          >
            {this.generateOptionMonth(start, end)}
          </select>
        </div>
        {selectingMonth && (
          <div className="col-12 col-md-8 col-lg-10">
            <div className="box">
              <div className="box-body">
                <div className="form-group">
                  <label>Số đội</label>
                  <input
                    disabled
                    className="form-control"
                    value={teamNumInMonth[selectingMonth]}
                  />
                </div>
              </div>
              <div className="box-footer">
                <Download />
              </div>
            </div>
          </div>
        )}
      </span>
    );
  }
}
