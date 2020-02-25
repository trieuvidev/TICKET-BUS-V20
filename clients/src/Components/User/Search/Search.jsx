import React, { Component, Fragment } from "react";
import "./Search.css";
class Search extends Component {
  render() {
    return (
      <Fragment>
        <section className="banner__search">
          <div className="banner"></div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 title__banner">
            <h1 className="title__h1">DU LỊCH KHẮP NƠI CÙNG VEXERE</h1>
            {/* <span className="description">
              Website mua bán vé xe online nhanh nhất
            </span> */}
          </div>
          <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 search__trips">
            <form action="">
              <div className="container">
                <div className="row">
                <div className="col-sm-12 col-md-12 col-lg-12 col-xl-12 search__trips">
            <form action="">
              <div className="container">
                <div className="row">
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 from__trips">
                        <select className="from__trip">
                          <option selected value="1">Chọn điểm đi</option>
                          <option value="2">Quảng Ngãi</option>
                          <option value="3">Sài Gòn</option>
                        </select>
                    </div>
                    <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 to__trips">
                    <select className="to">
                          <option selected value="1">Chọn điểm đến</option>
                          <option value="2">Quảng Ngãi</option>
                          <option value="3">Sài Gòn</option>
                        </select>
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 calendar__trips">
                      <select className="calendar">
                          <option selected value="1">Chọn ngày</option>
                        </select>
                      </div>
                      <div className="col-sm-3 col-md-3 col-lg-3 col-xl-3 button__search">
                      <button className="btn__search">Tìm Vé Xe</button>
                      </div>
                </div>
              </div>
            </form>
            </div>
                </div>
              </div>
            </form>
            </div>
        </section>
      </Fragment>
    );
  }
}

export default Search;
