import React, { Component } from "react";
import { Link } from 'react-router-dom';

class LastTeamSubmit extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { subTeams } = this.props;
        console.log(subTeams)
        return (
            <div>
                {
                    subTeams && Object.keys(subTeams).map((dateId, i) => {
                        return (
                            <div key={i} className="col-md-12">
                                <div className="date"><h3>{dateId}<hr /></h3></div>
                                <div className="row">
                                    {
                                        Object.keys(subTeams[dateId]).map((teamInfo, i) => {
                                            return (
                                                <div key={i} className="col-lg-3 col-md-3 col-sm-4 col-xs-12 add-project">
                                                    <Link to={`team/${subTeams[dateId][teamInfo].id}`}>
                                                        <div
                                                            className="card"
                                                        >
                                                            <div className="card-body">
                                                                <div className="project" style={{ padding: "30px" }}>
                                                                    <h3 className="card-title" style={{ color: 'black' }}>{subTeams[dateId][teamInfo].name}</h3>
                                                                    <h4 className="card-subtitle mb-2 text-muted">
                                                                        {subTeams[dateId][teamInfo].note}
                                                                    </h4>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        )
    }
}
export default LastTeamSubmit;