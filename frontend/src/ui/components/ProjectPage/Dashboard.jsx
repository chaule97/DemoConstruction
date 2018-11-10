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
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from "recharts";

const localizer = Calendar.momentLocalizer(moment);
const data = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 }
];

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeTab: "1",
      projects: [],
      admins: [],
      openModal: false,
      dataOfModal: []
    };
    this.toggle = this.toggle.bind(this);
  }

  componentWillMount() {
    this.getProject();
    this.getDetail();
  }

  getProject = () => {
    api.apiGet(urlApi.getListProject).then(res => {
      if (res) {
        this.setState({ projects: res.data });
      }
    });
  };

  getDetail = () => {
    api.apiGet(urlApi.getListSubmit).then(res => {
      if (res.data && res.data.length > 0) {
        let events = res.data.reduce((acc, cur) => {
          console.log(cur);
          if (cur.projects === +this.props.match.params.id) {
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
          }
          return acc;
        }, []);
        this.setState({ events });
      }
    });
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

  render() {
    const { projects, openModal, dataOfModal, currentDate } = this.state;
    const projectId = this.props.match.params.id
    console.log(projectId, this.props.match.params.id)
    return (
      <span>
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
                Tổng quan
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
          </Nav>
          <TabContent activeTab={this.state.activeTab}>
            <TabPane tabId="1">
              <section className="sec1">
                <div className="view-dashboard">
                  <div className="row">
                    <div className="blocks col-sm-12 col-md-3 col-lg-3">
                      <div className="view-block">
                        <i
                          class="fas fa-shopping-cart"
                          style={{ fontSize: "1.5em", color: "yellow" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          120
                        </span>
                        <small>NEW ORDERS</small>
                      </div>
                    </div>
                    <div className="blocks col-sm-12 col-md-3 col-lg-3">
                      <div className="view-block">
                        <i
                          class="fas fa-comments"
                          style={{ fontSize: "1.5em", color: "red" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          120
                        </span>
                        <small>NEW ORDERS</small>
                      </div>
                    </div>
                    <div className="blocks col-sm-12 col-md-3 col-lg-3">
                      <div className="view-block">
                        <i
                          class="fas fa-users"
                          style={{ fontSize: "1.5em", color: "green" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          120
                        </span>
                        <small>NEW ORDERS</small>
                      </div>
                    </div>
                    <div className="blocks col-sm-12 col-md-3 col-lg-3">
                      <div className="view-block">
                        <i
                          class="fas fa-search"
                          style={{ fontSize: "1.5em", color: "blue" }}
                        />
                        <span style={{ display: "block", fontSize: "2em" }}>
                          120.5K
                        </span>
                        <small>NEW ORDERS</small>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="sec2">
                <div className="view-dashboard">
                  <div className="view-title">
                    <p>Site Traffic Overview</p>
                    <div className="title-icon">
                      <span className="border-right">
                        <i class="far fa-caret-square-up" />
                      </span>
                      <span className="border-right">
                        <i class="fas fa-cog" />
                      </span>
                    </div>
                  </div>
                  <hr style={{ marginTop: "-5px" }} />
                  <LineChart
                    width={1050}
                    height={300}
                    data={data}
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <XAxis dataKey="name" />
                    <YAxis />
                    <CartesianGrid strokeDasharray="3 3" />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="pv"
                      stroke="#8884d8"
                      activeDot={{ r: 8 }}
                    />
                    <Line type="monotone" dataKey="uv" stroke="#82ca9d" />
                  </LineChart>
                </div>
              </section>
              <section className="sec3">
                <div className="row" style={{ margin: "0 0 0 0" }}>
                  <div className="chart-bgr col-sm-12 col-md-6 col-lg-3">
                    <h6>NEW ORDERS</h6>
                    <div class="chart x-60">
                      <p>60%</p>
                    </div>
                  </div>
                  <div className="chart-bgr col-sm-12 col-md-6 col-lg-3">
                    <h6>NEW ORDERS</h6>
                    <div class="chart x-40">
                      <p>40%</p>
                    </div>
                  </div>
                  <div className="chart-bgr col-sm-12 col-md-6 col-lg-3">
                    <h6>NEW ORDERS</h6>
                    <div class="chart x-60">
                      <p>60%</p>
                    </div>
                  </div>
                  <div className="chart-bgr col-sm-12 col-md-6 col-lg-3">
                    <h6>NEW ORDERS</h6>
                    <div class="chart x-80">
                      <p>80%</p>
                    </div>
                  </div>
                </div>
              </section>
              {/* <div className="row" style={{ marginTop: '10px' }}>
                                {(projects || []).map((item, index) => {
                                    console.log(item);
                                    return (
                                        <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                                            <div className="info-box">
                                                <span className="info-box-icon bg-aqua"><i className="fa  fa-cogs"></i></span>

                                                <div className="info-box-content">
                                                    <span className="info-box-text">{item.name}</span>
                                                    <span className="info-box-number">{item.supervisor.username}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
                            </div> */}
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
