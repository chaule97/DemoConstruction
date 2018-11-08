import React from 'react';
import { TabContent, TabPane, Nav, NavItem, NavLink, Row, Col } from 'reactstrap';
import classnames from 'classnames';
import Calendar from 'react-big-calendar';
import moment from 'moment';
import "react-big-calendar/lib/css/react-big-calendar.css";
import * as api from '../../../api/api';
import urlApi from '../../../constants/urlApi';
import ViewDetailProcessModal from '../ProjectPage/ViewDetailProcessModal';

const localizer = Calendar.momentLocalizer(moment);

class Dashboard extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            events: [],
            activeTab: '1',
            teams: [],
            admins: [],
            openModal: false,
            dataOfModal: []
        };
        this.toggle = this.toggle.bind(this);
    }

    componentWillMount() {
        this.getTeam()
        this.getDetail()
    }

    getTeam = () => {
        api.apiGet(urlApi.getListTeam).then(res => {
            if (res) {
                this.setState({ teams: res.data })
            }
        }
        )
    }

    getDetail = () => {
        api.apiGet(urlApi.getListTeam + '/' + this.props.match.params.id)
            .then(res => {
                console.log('2', res)
                if (res.data && res.data.submits.length > 0) {
                    let events = res.data.submits.reduce((acc, cur) => {
                        let index = acc.findIndex((event) => {
                            return event.start.isSame(moment(cur.date))
                        })
                        if (index !== -1) {
                            acc[index].projects.push(cur.projects.name)
                            acc[index].title = `+ ${acc[index].projects.length} Project${acc[index].projects.length > 1 ? 's' : ''}`
                        }
                        else {

                            acc.push({
                                start: moment(cur.date),
                                end: moment(cur.date).add(1, 'day'),
                                projects: [cur.projects.name],
                                title: `+ 1 Project`
                            })
                        }
                        return acc
                    }, [])
                    this.setState({ events })
                }
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
        this.setState({ openModal: true, dataOfModal: event.projects })
    }
    closeModal = (event) => {
        this.setState({ openModal: false })
    }

    eventStyleGetter = () => {
        return {
            style: {
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
        const { teams, openModal, dataOfModal } = this.state;
        return (
            <span>

                <section className="content">
                    <Nav tabs>
                        <NavItem className={classnames({ active: this.state.activeTab === '1' })}>
                            <NavLink
                                onClick={() => { this.toggle('1'); }}
                                style={{ color: 'black', cursor: 'pointer' }}
                            >
                                Tổng quan
                        </NavLink>
                        </NavItem>
                        <NavItem className={classnames({ active: this.state.activeTab === '2' })}>
                            <NavLink
                                onClick={() => { this.toggle('2'); }}
                                style={{ color: 'black', cursor: 'pointer' }}
                            >
                                Chi tiết
                            </NavLink>
                        </NavItem>
                    </Nav>
                    <TabContent activeTab={this.state.activeTab}>
                        <TabPane tabId="1">
                            <div className="row" style={{ marginTop: '10px' }}>
                                {(teams || []).map((item, index) => {
                                    return (
                                        <div key={index} className="col-md-3 col-sm-6 col-xs-12">
                                            <div className="info-box">
                                                <span className="info-box-icon bg-aqua"><i className="fa  fa-cogs"></i></span>
                                                <div className="info-box-content">
                                                    <span className="info-box-text">{item.name}</span>
                                                    <span className="info-box-number">{item.note}</span>
                                                </div>
                                            </div>
                                        </div>
                                    )
                                })}
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
                                        onSelectEvent={(event) => this.openModal(event)}
                                        eventPropGetter={(this.eventStyleGetter)}
                                    />
                                </Col>
                            </Row>
                        </TabPane>
                    </TabContent>

                </section>
                <ViewDetailProcessModal
                    openModal={openModal}
                    data={dataOfModal}
                    close={this.closeModal}
                />
            </span>
        );
    }
}

export default Dashboard;