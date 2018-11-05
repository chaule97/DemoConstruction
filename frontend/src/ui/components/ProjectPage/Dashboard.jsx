import React from 'react';

const Dashboard = props => {
    return (
        <section className="content">
        <div className="row">
            <div className="col-md-6">
            <div className="box">
                <div className="box-header with-border">
                <h3 className="box-title">Bordered Table</h3>
                </div>
                <div className="box-body">
                <table className="table table-bordered">
                    <tr>
                    <th style={{width: "10px"}}>#</th>
                    <th>Task</th>
                    <th>Progress</th>
                    <th style={{width: "40px"}}>Label</th>
                    </tr>
                    <tr>
                    <td>1.</td>
                    <td>Update software</td>
                    <td>
                        <div className="progress progress-xs">
                        <div className="progress-bar progress-bar-danger" style={{width: "55%"}}></div>
                        </div>
                    </td>
                    <td><span className="badge bg-red">55%</span></td>
                    </tr>
                    <tr>
                    <td>2.</td>
                    <td>Clean database</td>
                    <td>
                        <div className="progress progress-xs">
                        <div className="progress-bar progress-bar-yellow" style={{width: "70%"}}></div>
                        </div>
                    </td>
                    <td><span className="badge bg-yellow">70%</span></td>
                    </tr>
                    <tr>
                    <td>3.</td>
                    <td>Cron job running</td>
                    <td>
                        <div className="progress progress-xs progress-striped active">
                        <div className="progress-bar progress-bar-primary" style={{width: "30%"}}></div>
                        </div>
                    </td>
                    <td><span className="badge bg-light-blue">30%</span></td>
                    </tr>
                    <tr>
                    <td>4.</td>
                    <td>Fix and squish bugs</td>
                    <td>
                        <div className="progress progress-xs progress-striped active">
                        <div className="progress-bar progress-bar-success" style={{width: "90%"}}></div>
                        </div>
                    </td>
                    <td><span className="badge bg-green">90%</span></td>
                    </tr>
                </table>
                </div>
                <div className="box-footer clearfix">
                <ul className="pagination pagination-sm no-margin pull-right">
                    <li><a >&laquo;</a></li>
                    <li><a >1</a></li>
                    <li><a >2</a></li>
                    <li><a >3</a></li>
                    <li><a >&raquo;</a></li>
                </ul>
                </div>
            </div>
            </div>
            </div>
          </section>
    );
}

export default Dashboard;