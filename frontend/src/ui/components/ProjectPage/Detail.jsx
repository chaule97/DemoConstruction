import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
const localizer = Calendar.momentLocalizer(moment);
class DeatailProject extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            activeTab: '1',
            projects: [],
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
        api.apiGet(urlApi.getListProject).then(res => 
            {
                if(res) {
                    this.setState({projects : res.data})
                }
            }
        )
    }

    getDetail = () => {
        api.apiGet(urlApi.getListSubmit)
        .then(res =>
            {
                let events = res.data.map(item => ({
                    start: moment(item.date),
                    end: moment(item.date),
                    title: `${item.content} ${item.note}`
                }))
                this.setState({events})
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

    eventStyleGetter = () => {
        return {
            style : {
                backgroundColor: '#ff9f89',
                borderRadius: '0px',
                opacity: 0.8,
                color: 'black',
                border: '0px',
                display: 'block'
            }
        }
    }

    render() {
        const {projects} = this.state;
        // console.log(projects)
        return (
            <section className="content">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            style={{ color: 'black' , cursor: 'pointer'}}
                        >
                            Tổng quan
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            style={{ color: 'black' , cursor: 'pointer'}}
                        >
                            Chi tiết
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div className="row" style={{ marginTop: '10px' }}>
                            {(projects || []).map((item, index) => {
                                return(
                                    <div className="col-md-3 col-sm-6 col-xs-12">
                                        <div className="info-box">
                                            <span className="info-box-icon bg-aqua"><i className="fa  fa-cogs"></i></span>

                                            <div className="info-box-content">
                                                <span className="info-box-text">{item.name}</span>
                                                <span className="info-box-number">{item.admin.username}</span>
                                            </div>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                        <div className="right">
                            <Button onClick = {() => this.props.createProject()}>Tạo dự án</Button>
                        </div>
                    </TabPane>
                    <TabPane tabId="2">
                        <Row style={{ marginTop: '10px' }}>
                            <Col sm="12">
                                <Calendar
                                    localizer={localizer}
                                    defaultDate={new Date()}
                                    defaultView="month"
                                    events={this.state.events}
                                    style={{ height: "100vh" }}
                                    onSelectEvent = {(event) => this.openModal(event)}
                                    eventPropGetter={(this.eventStyleGetter)}
                                />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

            </section>
        );
    }
}

export default DeatailProject;