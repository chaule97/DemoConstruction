import React from "react";

const Login = props => {
  return (
    <div className="login-box">
      <div className="login-logo">
        {window.location.hash.indexOf("admin") != -1 ? (
          <a>
            <b>Management</b> Admin
          </a>
        ) : (
            <b>Supervisor</b>
          )}
      </div>
      <div className="login-box-body">
        <p className="login-box-msg">Đăng nhập để bắt đầu phiên làm việc</p>

        <form onSubmit={e=>{props.login(e)}}>
          <div className="form-group has-feedback">
            <input
              type="text"
              className="form-control"
              placeholder="Username"
              value={props.data.username}
              onChange={e => props.changeData("username", e.target.value)}
            />
            <span className="glyphicon glyphicon-envelope form-control-feedback" />
          </div>
          <div className="form-group has-feedback">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={props.data.password}
              onChange={e => props.changeData("password", e.target.value)}
            />
            <span className="glyphicon glyphicon-lock form-control-feedback" />
          </div>
          <div className="row text-align-center">
            {props.isEmpty && (
              <p className="color-red">
                Vui lòng điền đầy đủ Username và Password
              </p>
            )}
            {props.failLogin && (
              <p className="color-red">Sai Username hoặc Password</p>
            )}
          </div>
          <div className="row">
            <div className="col-xs-8">
              <div className="checkbox icheck">
                <input type="checkbox" style={{ marginLeft: 0, marginRight: '8px', position: 'unset' }} />
                <span>
                  Ghi nhớ tài khoản
              </span>

              </div>
            </div>
            <div className="col-xs-4">
              <button
                className="btn btn-primary btn-block btn-flat color-white"
                type='submit'
              >
                Đăng nhập
            </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
