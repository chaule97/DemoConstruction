import React from "react";
import {
  TabContent,
  TabPane,
  Nav,
  NavItem,
  NavLink,
  Row,
  Col
} from "reactstrap";
import classnames from "classnames";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import ViewDetailProcessModal from "./ViewDetailProcessModal";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";
import { Link } from "react-router-dom";
import * as PATH from "../../../constants/routeConstants";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";
import EditProjectContainer from "../../containers/ProjectPage/EditProjectContainer";

const localizer = Calendar.momentLocalizer(moment);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeTab: "1",
      projects: {},
      admins: [],
      openModal: false,
      dataOfModal: []
    };
    this.toggle = this.toggle.bind(this);
  }

  componentDidMount() {
    this.getProject();
  }

  getProject = () => {
    let projectId = this.props.match.params.id;
    api.apiGet(urlApi.getListProject + projectId).then(res => {
      if (res) {
        this.setState({ projects: res.data }, () => {
          const { submits } = this.state.projects;
          let events = submits.reduce((acc, cur) => {
            let index = acc.findIndex(event => {
              return event.start.isSame(moment(cur.date));
            });
            if (index !== -1) {
              acc[index].teams.push(cur.team);
              acc[index].title = `+ ${acc[index].teams.length} Team${
                acc[index].teams.length > 1 ? "s" : ""
              }`;
            } else {
              acc.push({
                start: moment(cur.date),
                end: moment(cur.date).add(1, "day"),
                teams: [cur.team],
                title: `+ 1 Team`
              });
            }
            return acc;
          }, []);
          this.setState({ events });
        });
      }
    });
  };
  goBack = () => {
    this.props.history.push();
  };

  toggle(tab) {
    if (this.state.activeTab !== tab) {
      this.setState({
        activeTab: tab
      });
    }
  }

  openModal = event => {
    this.setState({
      openModal: true,
      dataOfModal: event.teams,
      currentDate: event.start.format("YYYY-MM-DD")
    });
    const projectId = this.props.match.params.id;
    this.props.history.push(
      `${PATH.PROJECT_URL}/${projectId}/detail?current=${
        event.teams[0].id
      }&currentDate=${event.start.format("YYYY-MM-DD")}`
    );
  };
  closeModal = event => {
    this.setState({ openModal: false });
  };

  eventStyleGetter = () => {
    return {
      style: {
        backgroundColor: "#ff9f89",
        borderRadius: "0px",
        opacity: 0.8,
        color: "black",
        border: "0px",
        display: "block"
      }
    };
  };

  calcDashBoard = () => {
    const { submits } = this.state.projects;
    const { created_at, ended_at } = this.state.projects;
    let teamAppearance = {};
    let startDuration = 0;
    let endDuration = 0;
    if (submits) {
      submits.forEach(submit => {
        if (submit.team.id) teamAppearance[submit.team.id] = true;
      });
      startDuration = moment().diff(moment(created_at), "days");
      endDuration = moment(ended_at).diff(moment(), "days");
    }
    let totalTeam = Object.keys(teamAppearance).length;

    return { totalTeam, startDuration, endDuration };
  };
  calcDataLineChar = () => {
    let data = [];

    const { submits } = this.state.projects;
    const { created_at, ended_at } = this.state.projects;
    let teamAppearance = {};
    if (submits) {
      let firstDateCurrentMonth =
        moment()
          .startOf("month")
          .diff(moment(created_at)) < 0
          ? moment(created_at)
          : moment().startOf("month");
      let lastDate =
        moment()
          .endOf("month")
          .diff(moment(ended_at)) < 0
          ? moment().endOf("month")
          : moment(ended_at);
      let currentLastDate;
      while (!firstDateCurrentMonth.isAfter(lastDate)) {
        let teamNum = 0;
        let workerNum = 0;
        submits.forEach(submit => {
          if (!currentLastDate) currentLastDate = moment(submit.date);
          else if (currentLastDate.isAfter(moment(submit.date))) {
            currentLastDate = moment(submit.date);
          }
          if (submit.date == firstDateCurrentMonth.format("YYYY-MM-DD")) {
            teamNum += 1;
            workerNum += submit.worker_number;
          }
        });
        data.push({
          name: firstDateCurrentMonth.format("DD-MM-YYYY"),
          "Tổng số công nhân": workerNum,
          "Tổng số đội": teamNum
        });
        firstDateCurrentMonth.add(1, "day");
      }
      data = data.filter(row => {
        return !moment(row.name, "DD-MM-YYYY").isAfter(currentLastDate);
      });
    }
    return data;
  };

  render() {
    const { projects, openModal, dataOfModal, currentDate } = this.state;
    const projectId = this.props.match.params.id;
    let dataCircleChart = this.calcDashBoard();
    let dataLineChart = this.calcDataLineChar();
    return (
      <span>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/project">DỰ ÁN</Link>
          </BreadcrumbItem>

          {projects.name && (
            <BreadcrumbItem active>
              {projects.name.toUpperCase()}
            </BreadcrumbItem>
          )}
        </Breadcrumb>
        <h4
          className="cursor-pointer link-back content-header"
          onClick={() => this.props.history.goBack()}
        >
          {" "}
          <i className="fa fa-angle-double-left" /> Back
        </h4>
        <section className="content">
          <Nav tabs>
            <NavItem
              className={classnames({ active: this.state.activeTab === "1" })}
            >
              <NavLink
                onClick={() => {
                  this.toggle("1");
                }}
                style={{ color: "black", cursor: "pointer" }}
              >
                Thống kê
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({ active: this.state.activeTab === "2" })}
            >
              <NavLink
                onClick={() => {
                  this.toggle("2");
                }}
                style={{ color: "black", cursor: "pointer" }}
              >
                Chi tiết
              </NavLink>
            </NavItem>
            <NavItem
              className={classnames({ active: this.state.activeTab === "3" })}
            >
              <NavLink
                onClick={() => {
                  this.toggle("3");
                }}
                style={{ color: "black", cursor: "pointer" }}
              >
                Thông tin
              </NavLink>
            </NavItem>
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <section className="sec1">
                <div className="view-dashboard">
                  <div className="row">
                    <div className="blocks col-sm-12 col-md-4">
                      <div className="view-block">
                        <i
                          className="fas fa-users"
                          style={{ fontSize: "1.5em", color: "yellow" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          {dataCircleChart.totalTeam}
                        </span>
                        <small>Tổng số đội</small>
                      </div>
                    </div>
                    <div className="blocks col-sm-12 col-md-4">
                      <div className="view-block">
                        <i
                          className="fas fa-calendar"
                          style={{ fontSize: "1.5em", color: "red" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          {dataCircleChart.startDuration}
                        </span>
                        <small>Số ngày đã bắt đầu</small>
                      </div>
                    </div>
                    <div className="blocks col-sm-12 col-md-4">
                      <div className="view-block">
                        <i
                          className="fas fa-calendar"
                          style={{ fontSize: "1.5em", color: "green" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          {dataCircleChart.endDuration}
                        </span>
                        <small>Số ngày còn lại</small>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="sec2">
                <div className="view-dashboard">
                  <div className="view-title">
                    <p>Tháng {moment().month() + 1}</p>
                  </div>
                  <hr style={{ marginTop: "-5px" }} />
                  <LineChart
                    width={1050}
                    height={300}
                    data={dataLineChart}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="Tổng số công nhân"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      type="monotone"
                      dataKey="Tổng số đội"
                      stroke="#82ca9d"
                    />
                  </LineChart>
                </div>
              </section>
            </TabPane>
            <TabPane tabId="2">
              <Row style={{ marginTop: "10px" }}>
                <Col sm="12">
                  <Calendar
                    localizer={localizer}
                    defaultDate={new Date()}
                    defaultView="month"
                    events={this.state.events}
                    onSelectEvent={event => this.openModal(event)}
                    eventPropGetter={this.eventStyleGetter}
                  />
                </Col>
              </Row>
            </TabPane>
            <TabPane tabId="3">
              <Row style={{ marginTop: "10px" }}>
                <Col sm="12">
                  <EditProjectContainer project={projects} />
                </Col>
              </Row>
            </TabPane>
          </TabContent>
        </section>
        <ViewDetailProcessModal
          projects={projectId}
          openModal={openModal}
          data={dataOfModal}
          close={this.closeModal}
          currentDate={currentDate}
        />
      </span>
    );
  }
}

export default Dashboard;
