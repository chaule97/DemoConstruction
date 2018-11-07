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
            projects: []
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

    render() {
        const { listProjects } = this.props;
        return (
            <section className="content">
                <div className="row">
                    {listProjects.map((item, index) => {
                        return (
                            <span key={index} className="cursor-pointer" onClick={() => this.viewDashboard()}>
                                <div className="col-md-3 col-sm-6 col-xs-12">
                                    <Link to={'/project/detail'}>
                                        <div className="info-box">
                                            <span className="info-box-icon bg-aqua"><i className="fa fa-cogs"></i></span>

                                            <div className="info-box-content">
                                                <span className="info-box-text">{item.name}</span>
                                                <span className="info-box-number">{item.supervisor.username}</span>
                                            </div>
                                        </div>
                                    </Link>
                                </div>
                            </span>
                        )
                    })}
                </div>
                <div className="right">
                    <Button onClick={() => this.props.createProject()}>Tạo dự án</Button>
                </div>
            </section>
        );
    }
}

export default withRouter(ProjectPage);