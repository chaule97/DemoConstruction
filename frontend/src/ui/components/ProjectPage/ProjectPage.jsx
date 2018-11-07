import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
import * as PATH from '../../../constants/routeConstants';

const localizer = Calendar.momentLocalizer(moment);
class ProjectPage extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            events: [],
            activeTab: '1',
            admins: [],
            projects: [],
            viewGridStatus: true,
        };
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        this.getProject()
        this.getDetail()
    }

    getProject = () => {
        api.apiGet(urlApi.getListProject).then(res => {
            if (res) {
                this.setState({ projects: res.data })
            }
        }
        )
    }

    getDetail = () => {
        api.apiGet(urlApi.getListSubmit)
            .then(res => {
                let events = res.data.map(item => ({
                    start: moment(item.date),
                    end: moment(item.date),
                    title: `${item.content} ${item.note}`
                }))
                this.setState({ events })
            }
            )
    }

    toggle(tab) {
        if (this.state.activeTab !== tab) {
            this.setState({
                activeTab: tab
            });
        }
    }

    openModal = (event) => {
        this.props.openModal(event)
    }

    viewDashboard = () => {
        this.props.history.push(PATH.PROJECT_DETAIL_URL)
    }

    onShowGridView = () => {
        this.setState({ viewGridStatus: true })
    }

    onShowListView = () => {
        this.setState({ viewGridStatus: false })
    }
    render() {
        const { viewGridStatus } = this.state;
        const { listProjects } = this.props;
        return (
            <div>
                <div className="pull-right m-t-s25 m-r-20 ">
                    <button className={viewGridStatus ? "btn-transparent font-25" : "btn-transparent"}
                        onClick={() => this.onShowGridView()}
                    ><i className="fa fa-th-large"></i></button>
                    <button className={!viewGridStatus ? "btn-transparent font-25" : "btn-transparent"}
                        onClick={() => this.onShowListView()}
                    ><i className="fa fa-list"></i></button>

                </div>
                {viewGridStatus ?
                    <section className="content">
                        <br />
                        <div className="row">
                            <div onClick={() => this.props.createProject()} className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project" style={{ cursor: 'pointer' }}>
                                <div className="card">
                                    <div className="card-body">
                                        <div className="icon-add" style={{ zIndex: '10' }}>
                                            <i className="glyphicon glyphicon-plus"></i>
                                            <span style={{ paddingTop: '5px' }}>Thêm</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {listProjects.map((item, index) => {
                                return (
                                    <span key={index} className="cursor-pointer" onClick={() => this.viewDashboard()}>
                                        <div className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project" style={{ paddingBottom: '10px' }}>
                                            <div className="card">
                                                <div className="card-body">
                                                    <div className="project-content" style={{ zIndex: '10' }}>
                                                        <h3 class="card-title">{item.name}</h3>
                                                        <h4 class="card-subtitle mb-2 text-muted">{item.supervisor.username}</h4>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </span>
                                )
                            })}
                        </div>
                    </section>
                    :
                    <div>
                        <section className="content">
                            <div className="row">
                                <div className="col-xs-12">
                                    <div className="box">
                                        <div className="box-header with-border">
                                            <h3 className="box-title">
                                                <i className="fa fa-user m-r-5"></i>
                                                <i className="fa m-r-5"></i> Dự án</h3>

                                        </div>
                                        <div className="box-body">
                                            <table className="table table-bordered table-striped">
                                                <thead>
                                                    <tr>
                                                        <th>Tên dự án</th>
                                                        <th>Giám sát</th>
                                                        <th>Ngày khởi tạo</th>
                                                        <th></th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                    {listProjects.map((item, index) => {
                                                        return (
                                                            <tr key={index}>
                                                                <td>{item.name}</td>
                                                                <td>{item.supervisor.username}</td>
                                                                <td>{moment().format("DD-MM-YYYY")}</td>
                                                                <td>
                                                                    <Button color={'info'}>Chi tiết</Button> &nbsp;
                                                                    <Button color={'success'}>Báo cáo</Button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })}

                                                </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </section>
                    </div>}
            </div>
        );
    }
}

export default withRouter(ProjectPage);