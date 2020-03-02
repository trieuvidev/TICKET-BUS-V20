import React, { Component, Fragment } from "react";
import "../../assets/css/user.css";

class HomeBody extends Component {
  render() {
    return (
      <Fragment>
        <section className="home__body">
          <div className="main__home__body container">
            <div className="row content__body">
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="content__about-us">
                  <div className="about__us__item">
                    <h6>ABOUT US</h6>
                    <h2>ESTABLISH 2006 - 2020</h2>
                    <div className="description">
                      Volutpat dis urna senectus est dictum suscipit curae proin
                      iacu maecenas, vel placerat lacus facilisis ad egestas
                      susp vulputate mollis risus, litora eget elementum eu eros
                      fermentm cubii ornare interdum. Arcu pellentesque iaculis
                      malesuada neque mollis vel, urna nam venenatis nostra
                      metus, nullam torquent.
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                <div className="container hot__deals">
                  <div className="row">
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                      <div className="image__hot__deals">
                      <img src={require("../../dist/img/banner-hot-deals.png")} alt=""/>
                      </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="image__hot__deals">
                    <img src={require("../../dist/img/banner-hot-deals.png")} alt=""/>
                    </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="image__hot__deals">
                    <img src={require("../../dist/img/banner-hot-deals.png")} alt=""/>
                    </div>
                    </div>
                    <div className="col-sm-6 col-md-6 col-lg-6 col-xl-6">
                    <div className="image__hot__deals">
                    <img src={require("../../dist/img/banner-hot-deals.png")} alt=""/></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Fragment>
    );
  }
}

export default HomeBody;
