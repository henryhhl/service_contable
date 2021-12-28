
import React, { Component } from 'react';

function Home() {
    return (
        <>
            <HomePrivate />
        </>
    );
};

class HomePrivate extends Component {

    constructor( props ) {
        super( props );
        this.state = {};
    };
    componentDidMount() {
        this.get_data();
    };
    get_data() {};

    render() {
        return (
            <>
                <div className="page-body">
                    <div className="row">

                        <div className="col-xl-3 col-md-6">
                            <div className="card">
                                <div className="card-block">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h4 className="text-c-yellow f-w-600">$30200</h4>
                                            <h6 className="text-muted m-b-0">All Earnings</h6>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="feather icon-bar-chart f-28"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-c-yellow">
                                    <div className="row align-items-center">
                                        <div className="col-9">
                                            <p className="text-white m-b-0">% change</p>
                                        </div>
                                        <div className="col-3 text-right">
                                            <i className="feather icon-trending-up text-white f-16"></i>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card">
                                <div className="card-block">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h4 className="text-c-green f-w-600">290+</h4>
                                            <h6 className="text-muted m-b-0">Page Views</h6>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="feather icon-file-text f-28"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-c-green">
                                    <div className="row align-items-center">
                                        <div className="col-9">
                                            <p className="text-white m-b-0">% change</p>
                                        </div>
                                        <div className="col-3 text-right">
                                            <i className="feather icon-trending-up text-white f-16"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card">
                                <div className="card-block">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h4 className="text-c-pink f-w-600">145</h4>
                                            <h6 className="text-muted m-b-0">Task Completed</h6>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="feather icon-calendar f-28"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-c-pink">
                                    <div className="row align-items-center">
                                        <div className="col-9">
                                            <p className="text-white m-b-0">% change</p>
                                        </div>
                                        <div className="col-3 text-right">
                                            <i className="feather icon-trending-up text-white f-16"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card">
                                <div className="card-block">
                                    <div className="row align-items-center">
                                        <div className="col-8">
                                            <h4 className="text-c-blue f-w-600">500</h4>
                                            <h6 className="text-muted m-b-0">Downloads</h6>
                                        </div>
                                        <div className="col-4 text-right">
                                            <i className="feather icon-download f-28"></i>
                                        </div>
                                    </div>
                                </div>
                                <div className="card-footer bg-c-blue">
                                    <div className="row align-items-center">
                                        <div className="col-9">
                                            <p className="text-white m-b-0">% change</p>
                                        </div>
                                        <div className="col-3 text-right">
                                            <i className="feather icon-trending-up text-white f-16"></i>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-8 col-md-12">
                            <div className="card">
                                <div className="card-header">
                                    <h5>Visitors</h5>
                                    <span className="text-muted">For more details about usage, please
                                        refer <a href="https://www.amcharts.com/online-store/"
                                            target="_blank">amCharts</a> licences.</span>
                                    <div className="card-header-right">
                                        <ul className="list-unstyled card-option">
                                            <li><i className="feather icon-maximize full-card"></i></li>
                                            <li><i className="feather icon-minus minimize-card"></i>
                                            </li>
                                            <li><i className="feather icon-trash-2 close-card"></i></li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="card-block">
                                    <div id="visitor" style={{height: "300px"}}></div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-12">
                            <div className="card">
                                <div className="card-block bg-c-green">
                                    <div id="proj-earning" style={{height: "230px"}}></div>
                                </div>
                                <div className="card-footer">
                                    <h6 className="text-muted m-b-30 m-t-15">Total completed project and
                                        earning</h6>
                                    <div className="row text-center">
                                        <div className="col-6 b-r-default">
                                            <h6 className="text-muted m-b-10">Completed Projects</h6>
                                            <h4 className="m-b-0 f-w-600 ">175</h4>
                                        </div>
                                        <div className="col-6">
                                            <h6 className="text-muted m-b-10">Total Earnings</h6>
                                            <h4 className="m-b-0 f-w-600 ">76.6M</h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-5 col-md-12">
                            <div className="card table-card">
                                <div className="card-header">
                                    <h5>Global Sales by Top Locations</h5>
                                </div>
                                <div className="card-block">
                                    <div className="table-responsive">
                                        <table className="table table-hover table-borderless">
                                            <thead>
                                                <tr>
                                                    <th>#</th>
                                                    <th>Country</th>
                                                    <th>Sales</th>
                                                    <th className="text-right">Average</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><img src="/dist/files/assets/images/widget/GERMANY.jpg"
                                                            alt="" className="img-fluid img-30" /></td>
                                                    <td>Germany</td>
                                                    <td>3,562</td>
                                                    <td className="text-right">56.23%</td>
                                                </tr>
                                                <tr>
                                                    <td><img src="/dist/files/assets/images/widget/USA.jpg"
                                                            alt="" className="img-fluid img-30" /></td>
                                                    <td>USA</td>
                                                    <td>2,650</td>
                                                    <td className="text-right">25.23%</td>
                                                </tr>
                                                <tr>
                                                    <td><img src="/dist/files/assets/images/widget/AUSTRALIA.jpg"
                                                            alt="" className="img-fluid img-30" /></td>
                                                    <td>Australia</td>
                                                    <td>956</td>
                                                    <td className="text-right">12.45%</td>
                                                </tr>
                                                <tr>
                                                    <td><img src="/dist/files/assets/images/widget/UK.jpg"
                                                            alt="" className="img-fluid img-30" /></td>
                                                    <td>United Kingdom</td>
                                                    <td>689</td>
                                                    <td className="text-right">8.65%</td>
                                                </tr>
                                                <tr>
                                                    <td><img src="/dist/files/assets/images/widget/BRAZIL.jpg"
                                                            alt="" className="img-fluid img-30" /></td>
                                                    <td>Brazil</td>
                                                    <td>560</td>
                                                    <td className="text-right">3.56%</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="text-right  m-r-20">
                                        <a href="#!" className="b-b-primary text-primary">View all Sales
                                            Locations </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="card">
                                <div className="card-header">
                                    <h5>New Users</h5>
                                </div>
                                <div className="card-block">
                                    <canvas id="newuserchart" height="250"></canvas>
                                </div>
                                <div className="card-footer ">
                                    <div className="row text-center b-t-default">
                                        <div className="col-4 b-r-default m-t-15">
                                            <h5>85%</h5>
                                            <p className="text-muted m-b-0">Satisfied</p>
                                        </div>
                                        <div className="col-4 b-r-default m-t-15">
                                            <h5>6%</h5>
                                            <p className="text-muted m-b-0">Unsatisfied</p>
                                        </div>
                                        <div className="col-4 m-t-15">
                                            <h5>9%</h5>
                                            <p className="text-muted m-b-0">NA</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-3 col-md-6">
                            <div className="card">
                                <div className="card-block text-center">
                                    <i className="feather icon-mail text-c-lite-green d-block f-40"></i>
                                    <h4 className="m-t-15"><span className="text-c-lite-green">8.62k</span>
                                        Subscribers</h4>
                                    <p className="m-b-10">Your main list is growing</p>
                                    <button className="btn btn-primary btn-sm btn-round">Manage
                                        List</button>
                                </div>
                            </div>
                            <div className="card">
                                <div className="card-block text-center">
                                    <i className="feather icon-twitter text-c-green d-block f-40"></i>
                                    <h4 className="m-t-15"><span className="text-c-blgreenue">+40</span>
                                        Followers</h4>
                                    <p className="m-b-10">Your main list is growing</p>
                                    <button className="btn btn-success btn-sm btn-round">Check them
                                        out</button>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-md-6">
                            <div className="card o-hidden">
                                <div className="card-block bg-c-pink text-white">
                                    <h6>Sales Per Day <span className="f-right"><i
                                                className="feather icon-activity m-r-15"></i>3%</span>
                                    </h6>
                                    <canvas id="sale-chart1" height="150"></canvas>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="row">
                                        <div className="col-6 b-r-default">
                                            <h4>$4230</h4>
                                            <p className="text-muted m-b-0">Total Revenue</p>
                                        </div>
                                        <div className="col-6">
                                            <h4>321</h4>
                                            <p className="text-muted m-b-0">Today Sales</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-6">
                            <div className="card o-hidden">
                                <div className="card-block bg-c-green text-white">
                                    <h6>Visits<span className="f-right"><i
                                                className="feather icon-activity m-r-15"></i>9%</span>
                                    </h6>
                                    <canvas id="sale-chart2" height="150"></canvas>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="row">
                                        <div className="col-6 b-r-default">
                                            <h4>3562</h4>
                                            <p className="text-muted m-b-0">Monthly Visits</p>
                                        </div>
                                        <div className="col-6">
                                            <h4>96</h4>
                                            <p className="text-muted m-b-0">Today Visits</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-md-12">
                            <div className="card o-hidden">
                                <div className="card-block bg-c-blue text-white">
                                    <h6>Orders<span className="f-right"><i
                                                className="feather icon-activity m-r-15"></i>12%</span>
                                    </h6>
                                    <canvas id="sale-chart3" height="150"></canvas>
                                </div>
                                <div className="card-footer text-center">
                                    <div className="row">
                                        <div className="col-6 b-r-default">
                                            <h4>1695</h4>
                                            <p className="text-muted m-b-0">Monthly Orders</p>
                                        </div>
                                        <div className="col-6">
                                            <h4>52</h4>
                                            <p className="text-muted m-b-0">Today Orders</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="col-xl-4 col-md-12">
                            <div className="card quater-card">
                                <div className="card-block">
                                    <h6 className="text-muted m-b-20">This Quarter</h6>
                                    <h4>$3,9452.50</h4>
                                    <p className="text-muted">$3,9452.50</p>
                                    <h5 className="m-t-30">87</h5>
                                    <p className="text-muted">Online Revenue<span
                                            className="f-right">80%</span></p>
                                    <div className="progress">
                                        <div className="progress-bar bg-simple-c-pink"
                                            style={{width: "80%"}}></div>
                                    </div>
                                    <h5 className="m-t-30">68</h5>
                                    <p className="text-muted">Offline Revenue<span
                                            className="f-right">50%</span></p>
                                    <div className="progress">
                                        <div className="progress-bar bg-simple-c-yellow"
                                            style={{width: "50%"}}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-8 col-md-12">
                            <div className="card social-network">
                                <div className="card-header">
                                    <h5>Social Network</h5>
                                </div>
                                <div className="card-block">
                                    <div className="row">
                                        <div className="col-sm-6">
                                            <img src="/dist/files/assets/images/widget/icon-1.png"
                                                alt=" " className="img-responsive p-b-20" />
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Views :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">545,721</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Comments :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">2,256</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Likes :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">4,129</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Subscribe :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">3,451,945</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6">
                                            <img src="/dist/files/assets/images/widget/icon-2.png"
                                                alt=" " className="img-responsive p-b-20" />
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Engagement :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">1,543</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Shares :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">846</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Likes :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">569</p>
                                                </div>
                                            </div>
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Comments :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">156</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="col-sm-6 m-t-0">
                                            <img src="/dist/files/assets/images/widget/icon-3.png"
                                                alt=" " className="img-responsive p-b-10 p-t-10" />
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Tweets :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">103,576</p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-sm-6 m-t-0">
                                            <img src="/dist/files/assets/images/widget/icon-4.png"
                                                alt=" " className="img-responsive p-b-10 p-t-10" />
                                            <div className="row">
                                                <div className="col-5">
                                                    <p className="text-muted m-b-5">Tweets :</p>
                                                </div>
                                                <div className="col-7">
                                                    <p className="m-b-5 f-w-400">103,576</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    }
};

export default Home;
