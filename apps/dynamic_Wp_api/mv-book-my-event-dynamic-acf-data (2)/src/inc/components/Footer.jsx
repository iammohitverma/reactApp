import React from 'react';
import { Link } from "react-router-dom";
function Footer() {
    return (
        <>
            <footer className="site_footer pt_100">
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-12">
                            <div className="footer_logo_wrap">
                                <h2 className="g-hdng footer_logo"><Link style={{ color:"#000" }} to="/">Bookmyevent</Link></h2>
                                <p>Your ultimate platform for discovering and hosting unforgettable events. Connect, explore, and celebrate with ease. Let's make every moment special!</p>
                                <div className="social">
                                    <p>Follow us on</p>
                                    <a href="https://www.facebook.com/TechmindSoftwares/" target='_blank'
                                    ><img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/footer_facebook.svg" alt="facebook"
                                        /></a>
                                    <a href="https://www.instagram.com/techmindsoftwares/" target='_blank'
                                    ><img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/footer_instagram.svg" alt="instagram"
                                        /></a>
                                    <a href="https://twitter.com/techmindindia" target='_blank'
                                    ><img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/footer_twiter.svg" alt="twitter"
                                        /></a>
                                </div>
                            </div>
                        </div>
                        <div className="col-md-8 col-12">
                            <div className="inner_wrap">
                                <div className="footer_menus">
                                    <div className="inner_row">
                                        <div className="inner_wrap">
                                            
                                        </div>
                                        <div className="inner_wrap">
                                           
                                        </div>
                                        <div className="inner_wrap">
                                            <h4 className="title">Quick links</h4>
                                            <ul>
                                                <li><Link to="/contact">Contact us</Link></li>
                                                <li><Link to="/blogs">Blogs</Link></li>
                                                <li><Link to="/events">Events</Link></li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                                <div className="bottom_footer">
                                    <div className="coyprights">
                                        <p>© 2023 Bookmyevent Powered by <a href="https://techmind.co.in/" target="_blank">Techmind Softwares</a></p>
                                        <div className="bottom_links">
                                            <a href="https://techmind.co.in/terms-conditions/" target='_blank'>Terms & Conditions</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    );
}

export default Footer;
