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
        this.setState({viewGridStatus: true})
    }

    onShowListView = () => {
        this.setState({viewGridStatus: false})
    }
    render() {
        const {viewGridStatus} = this.state;
        const { listProjects } = this.props;
        return (
            <div>
                <div className="pull-right m-t-s25 m-r-20 ">
                    <button  className={viewGridStatus ? "btn-transparent font-25": "btn-transparent"} 
                        onClick = {() => this.onShowGridView()}
                    ><i class="fa fa-th-large"></i></button>
                    <button  className={!viewGridStatus ? "btn-transparent font-25": "btn-transparent"}
                         onClick = {() => this.onShowListView()}
                    ><i class="fa fa-list"></i></button>
    
                </div>
            { viewGridStatus ? 
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
         <div className="right">
                    <Button color={'success'} onClick={() => this.props.createProject()}>Tạo dự án</Button>
                </div> 
         </div>
        );
    }
}

export default withRouter(ProjectPage);