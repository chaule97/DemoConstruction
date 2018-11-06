import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Card, Button, CardTitle, CardText, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
const localizer = Calendar.momentLocalizer(moment);
class ProjectPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: "Click here to open modal"
                }
            ],
            activeTab: '1'
        };
        this.toggle = this.toggle.bind(this);
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

    render() {
        return (
            <section className="content">
                <Nav tabs>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '1' })}
                            onClick={() => { this.toggle('1'); }}
                            style={{ color: 'black' }}
                        >
                            Dashboard
                        </NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink
                            className={classnames({ active: this.state.activeTab === '2' })}
                            onClick={() => { this.toggle('2'); }}
                            style={{ color: 'black' }}
                        >
                            Detail
            </NavLink>
                    </NavItem>
                </Nav>
                <TabContent activeTab={this.state.activeTab}>
                    <TabPane tabId="1">
                        <div className="row" style={{ marginTop: '10px' }}>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="info-box">
                                    <span className="info-box-icon bg-aqua"><i className="fa fa-envelope-o"></i></span>

                                    <div className="info-box-content">
                                        <span className="info-box-text">Messages</span>
                                        <span className="info-box-number">1,410</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="info-box">
                                    <span className="info-box-icon bg-green"><i className="fa fa-flag-o"></i></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Bookmarks</span>
                                        <span className="info-box-number">410</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="info-box">
                                    <span className="info-box-icon bg-green"><i className="fa fa-flag-o"></i></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Bookmarks</span>
                                        <span className="info-box-number">410</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="info-box">
                                    <span className="info-box-icon bg-green"><i className="fa fa-flag-o"></i></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Bookmarks</span>
                                        <span className="info-box-number">410</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="info-box">
                                    <span className="info-box-icon bg-green"><i className="fa fa-flag-o"></i></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Bookmarks</span>
                                        <span className="info-box-number">410</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-3 col-sm-6 col-xs-12">
                                <div className="info-box">
                                    <span className="info-box-icon bg-green"><i className="fa fa-flag-o"></i></span>
                                    <div className="info-box-content">
                                        <span className="info-box-text">Bookmarks</span>
                                        <span className="info-box-number">410</span>
                                    </div>
                                </div>
                            </div>
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
                                />
                            </Col>
                        </Row>
                    </TabPane>
                </TabContent>

            </section>
        );
    }
}

export default ProjectPage;