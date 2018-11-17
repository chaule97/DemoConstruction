import React from "react";
import moment from "moment";
import urlApi from "../../../constants/urlApi";

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
    let start = moment(created_at);
    let end = moment(ended_at).isAfter(moment()) ? moment() : moment(ended_at);
    return { start, end };
  }

  calcDashBoard = submits => {
    let totalTeam = {};
    if (submits) {
      submits.forEach(submit => {
        if (!totalTeam[moment(submit.date).month()]) {
          totalTeam[moment(submit.date).month()] = {};
          totalTeam[moment(submit.date).month()][submit.team.id] = true;
        } else {
          if (!totalTeam[moment(submit.date).month()][submit.team.id]) {
            totalTeam[moment(submit.date).month()][submit.team.id] = true;
          }
        }
      });
    }

    this.setState({ teamNumInMonth: totalTeam });
  };

  generateOptionMonth = (start, end) => {
    let options = [];
    options.push(<option key={"month_129312"}>Chọn tháng</option>);
    while (start.isSameOrBefore(end)) {
      options.push(
        <option value={start.month()} key={"month_" + start}>
          Tháng {start.month() + 1}
        </option>
      );
      start.add(1, "month");
    }
    return options;
  };

  handleChangeMonth = month => {
    this.setState({ selectingMonth: month });
  };

  render() {
    const { projects } = this.props;
    const { created_at, ended_at } = this.props.projects;
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
                    value={Object.keys(teamNumInMonth[selectingMonth]).length}
                  />
                </div>
              </div>
              <div className="box-footer">
                <a
                  className="btn btn-primary"
                  href={
                    urlApi.exportReport +
                    `?id=${projects.id}&month=${+selectingMonth + 1}`
                  }
                  download
                >
                  Xuất báo cáo
                </a>
              </div>
            </div>
          </div>
        )}
      </span>
    );
  }
}
