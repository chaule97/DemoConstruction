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

const localizer = Calendar.momentLocalizer(moment);

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeTab: 0,
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
      let currentClickTeam = +this.props.location.search.slice(9);
      if (res.data && res.data.length > 0) {
        let events = res.data.reduce((acc, cur, index) => {
          if (cur.projects === +this.props.match.params.id) {
            if (cur.date == moment().format("YYYY-MM-DD")) {
              acc.push(cur);
              if (currentClickTeam == cur.team.id)
                this.setState({ activeTab: `${acc.length}` });
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
    this.setState({ openModal: true, dataOfModal: event.teams });
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
    const { projects, openModal, dataOfModal, events } = this.state;
    return (
      <span>
        <section className="content">
          <Nav tabs>
            {events.map((event, index) => {
              return (
                <NavItem
                  key={"tab" + index}
                  className={classnames({
                    active: this.state.activeTab === `${index + 1}`
                  })}
                >
                  <NavLink
                    onClick={() => {
                      this.toggle(`${index + 1}`);
                    }}
                    style={{ color: "black", cursor: "pointer" }}
                  >
                    {event.team.name}
                  </NavLink>
                </NavItem>
              );
            })}
          </Nav>

          <TabContent activeTab={this.state.activeTab}>
            {events.map((event, index) => {
              console.log(event);
              return (
                <TabPane key={index} tabId={`${index + 1}`}>
                  <div className="container">
                    <div className="row" style={{ marginTop: "10px" }}>
                      <div className="form-group col-12 col-md-6">
                        <label>Số lượng công nhân: </label>
                        <input
                          className="form-control"
                          disabled
                          value={event.worker_number}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <label>Tiến độ đạt được: </label>
                        <input
                          className="form-control"
                          disabled
                          value={event.process}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <label>Công việc: </label>
                        <input
                          className="form-control"
                          disabled
                          value={event.task_name}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <label>Ghi chú: </label>
                        <input
                          className="form-control"
                          disabled
                          value={event.content}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <label>Đề xuất vật tư: </label>
                        <input
                          className="form-control"
                          disabled
                          value={event.task_name}
                        />
                      </div>
                      <div className="form-group col-12 col-md-6">
                        <label>Các công việc cần chuẩn bị: </label>
                        <input
                          className="form-control"
                          disabled
                          value={event.job_tomorrow}
                        />
                      </div>
                    </div>
                  </div>
                </TabPane>
              );
            })}
          </TabContent>
        </section>
      </span>
    );
  }
}

export default Dashboard;
