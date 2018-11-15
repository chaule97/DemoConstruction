import React from "react";
import classnames from "classnames";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Table
} from "reactstrap";
import Calendar from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from "../../../api/api";
import urlApi from "../../../constants/urlApi";
import ViewDetailProcessModal from "./ViewDetailProcessModal";
import { Link, withRouter } from "react-router-dom";
import { Breadcrumb, BreadcrumbItem } from "reactstrap";

const localizer = Calendar.momentLocalizer(moment);

class SubmitDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      activeTab: 0,
      project: {},
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
    let projectId = this.props.match.params.id;
    api.apiGet(urlApi.getListProject + projectId).then(res => {
      if (res) {
        this.setState({ project: res.data });
      }
    });
  };

  getDetail = () => {
    api.apiGet(urlApi.getListSubmit).then(res => {
      let currentClickTeam = +this.props.location.search.split("&")[0].slice(9);
      let currentDate = this.props.location.search.split("&")[1].slice(12);
      if (res.data && res.data.length > 0) {
        let events = res.data.reduce((acc, cur, index) => {
          if (cur.projects === +this.props.match.params.id) {
            if (cur.date == currentDate) {
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
  calcTotalWorker = teams => {
    let total = teams.reduce((acc, cur) => {
      return acc + cur.worker_number;
    }, 0);
    return total;
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
    const { events, project } = this.state;
    let totalWorker = this.calcTotalWorker(events);
    return (
      <span>
        <Breadcrumb>
          <BreadcrumbItem>
            <Link to="/project">DỰ ÁN</Link>
          </BreadcrumbItem>
          {project.name && (
            <BreadcrumbItem active>{project.name.toUpperCase()}</BreadcrumbItem>
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
          <Table responsive bordered className="bg-white">
            <thead>
              <tr>
                <th>#</th>
                <th>Tên đội</th>
                <th>Số lượng công nhân</th>
                <th>Tiến độ đạt được</th>
                <th>Công việc</th>
                <th>Ghi chú</th>
                <th>Đề xuất vật tư</th>
                <th>Các công việc cần chuẩn bị</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event, index) => {
                return (
                  <tr key={`event_${index}`}>
                    <td>{index + 1}</td>
                    <td>{event.team.name}</td>
                    <td>{event.worker_number}</td>
                    <td>{event.process}</td>
                    <td>{event.task_name}</td>
                    <td>{event.content}</td>
                    <td>{event.proposed_materials}</td>
                    <td>{event.job_tomorrow}</td>
                  </tr>
                );
              })}
              <tr>
                <td colSpan="2">
                  <strong>Tổng cộng</strong>
                </td>
                <td colSpan="6">{totalWorker}</td>
              </tr>
            </tbody>
          </Table>
        </section>
      </span>
    );
  }
}

export default withRouter(SubmitDetail);
