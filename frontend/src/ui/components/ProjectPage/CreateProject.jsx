import React from 'react';

const CreateProject = props => {
    return (
        <div>
            <section className="content">
                <div className="row">
                    <div className="col-xs-12">
                        <div className="box">
                            <div className="box-header with-border">
                                <h3 className="box-title">
                                    <i className="fa fa-users m-r-5"></i>
                                    <i className="fa m-r-5"></i> Thêm dự án</h3>
                            </div>
                            <div className="box-body">
                                <form>
                                    <div>
                                        <div className="form-group col-lg-6">
                                            <label>Tên dự án: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" autoComplete="off" className="form-control"
                                                value={props.project.name}
                                                onChange={(e) => props.changeProjectDetailValue('name', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label>Tên công trình: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" autoComplete="off" className="form-control"
                                                value={props.project.contruction_name}
                                                onChange={(e) => props.changeProjectDetailValue('contruction_name', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label>Địa chỉ: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" autoComplete="off" className="form-control"
                                                value={props.project.address}
                                                onChange={(e) => props.changeProjectDetailValue('address', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label>Chủ đầu tư: <span style={{ color: "red" }}>*</span></label>
                                            <input type="text" autoComplete="off" className="form-control"
                                                value={props.project.investor}
                                                onChange={(e) => props.changeProjectDetailValue('investor', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label>Vật tư thi công: <span style={{ color: "red" }}>*</span></label>
                                            <textarea rows="2" type="text" autoComplete="off" className="form-control"
                                                value={props.project.construction_items}
                                                onChange={(e) => props.changeProjectDetailValue('construction_items', e.target.value)}
                                            />
                                        </div>
                                        <div className="form-group col-lg-6">
                                            <label>Vị trí: <span style={{ color: "red" }}>*</span></label>
                                            <textarea rows="2" type="text" autoComplete="off" className="form-control"
                                                value={props.project.position}
                                                onChange={(e) => props.changeProjectDetailValue('position', e.target.value)}
                                            />
                                        </div>
                                        {/* <div className="form-group col-lg-6">
                                            <label>Admin: <span style={{ color: "red" }}>*</span></label>
                                            <select className="form-control"
                                                onChange={(e) => props.changeProjectDetailValue('admin', e.target.value)}
                                            >
                                                <option value="" >-- Select Admin --</option>
                                                {(props.listAdmin || []).map((item, index) => {
                                                    return (
                                                        <option key={index} value={item.id}>{item.username}</option>
                                                    )
                                                })}
                                            </select>
                                        </div> */}
                                        {/* <div className="form-group col-lg-6">
                                            <label>Mô tả:</label>
                                            <textarea rows="4" autoComplete="off" className="form-control"
                                                value={props.project.description}
                                                onChange={(e) => props.changeProjectDetailValue('description', e.target.value)}
                                            />
                                        </div> */}
                                    </div>
                                </form>
                                <div className="form-group col-lg-12">
                                    <button className="btn btn-success pull-right"
                                        onClick={() => props.createProject()}
                                    >Thêm</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
export default CreateProject;