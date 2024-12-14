import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
// import module
import Accordion from 'react-bootstrap/Accordion';

import ImgCompo from '../../../global/singleImage';

function EventListing({ siteUrl, props }) {
    //console.log(props);
    const [PostItem, setPostItems] = useState([]);

    const PostType = props.post_type;
    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                // fetch all Post items
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${PostType}`);
                let items;
                if (Array.isArray(response.data)) {
                    items = response.data.map((item) => item);
                } else {
                    // If it's not an array, wrap it in an array
                    items = [response.data];
                }
                // Extract the data from each response and update state
                //const items = responses.map((response) => response.data);
                setPostItems(items);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [PostType]);
   //console.log(PostItem);
    return (
        <>
            <section className="event_section events pt_100 pb_100">
                <div className="event_section_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="event_sec_filter_wrap">
                                    <div className="sec_heading">
                                        <h3 className="hdng">Filter</h3>
                                        <a href="#">Clear All</a>
                                    </div>
                                    <div className="filters_wrap">
                                        <div className="accordion accordion-flush" id="filter_accordions">
                                            <Accordion defaultActiveKey="0" flush>
                                                <Accordion.Item eventKey="0">
                                                    <Accordion.Header>
                                                        <h3>Category</h3>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li>
                                                                <label htmlFor="business">
                                                                    <input type="checkbox" name="business" id="business" />
                                                                    Business
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="educational">
                                                                    <input type="checkbox" name="educational" id="educational" />
                                                                    Educational
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="entertainment">
                                                                    <input type="checkbox" name="entertainment" id="entertainment" />
                                                                    Entertainment
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="others">
                                                                    <input type="checkbox" name="others" id="others" />
                                                                    Others
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="1">
                                                    <Accordion.Header>
                                                        <h3>Date Range</h3>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <div className="form_wrap">
                                                            <div className="from_date">
                                                                <label htmlFor="from">From</label>
                                                                <input type="date" name="from" id="from" />
                                                            </div>
                                                            <div className="to_date">
                                                                <label htmlFor="to">To</label>
                                                                <input type="date" name="to" id="to" />
                                                            </div>
                                                        </div>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                <Accordion.Item eventKey="2">
                                                    <Accordion.Header>
                                                        <h3>Venue</h3>
                                                    </Accordion.Header>
                                                    <Accordion.Body>
                                                        <ul>
                                                            <li>
                                                                <label htmlFor="business">
                                                                    <input type="checkbox" name="business" id="business" />
                                                                    Business
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="educational">
                                                                    <input type="checkbox" name="educational" id="educational" />
                                                                    Educational
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="entertainment">
                                                                    <input type="checkbox" name="entertainment" id="entertainment" />
                                                                    Entertainment
                                                                </label>
                                                            </li>
                                                            <li>
                                                                <label htmlFor="others">
                                                                    <input type="checkbox" name="others" id="others" />
                                                                    Others
                                                                </label>
                                                            </li>
                                                        </ul>
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                            </Accordion>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-9">
                                <div className="event_sec_cards_wrap">
                                    <div className="sec_heading mb_50">
                                        <h3 className="hdng g-hdng">{props.section_heading}</h3>
                                    </div>
                                    <div className="sec_content mb_100">
                                        <div className="row">
                                            {PostItem.map((item) => (

                                                <div className="col-md-6" key={item.id}>
                                                    <div className="event_cards_wrap">
                                                        <div className="cards">
                                                            <div className="card_image">
                                                                <ImgCompo siteUrl={siteUrl} ImageId={item.featured_media} />
                                                                {/* <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png" alt="image" /> */}
                                                            </div>
                                                            <div className="card_description">
                                                                <ul>
                                                                    <li className="g-btn">Education</li>
                                                                </ul>
                                                                <h3 className="title">{item.title.rendered}</h3>
                                                                <div className="location">
                                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                    <p>Hotel Center Park, Chandigarh</p>
                                                                </div>
                                                            </div>
                                                            <div className="card_bottom_description">
                                                                <div className="timing">
                                                                    <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                    <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                                </div>
                                                                <div className="booking">
                                                                    <Link to={`/event/${item.link.split('/').filter(Boolean).pop()}`}>Book Now</Link>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            {/* <div className="col-md-6">
                                                <div className="event_cards_wrap">
                                                    <div className="cards">
                                                        <div className="card_image">
                                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png" alt="image" />
                                                        </div>
                                                        <div className="card_description">
                                                            <ul>
                                                                <li className="g-btn">Education</li>
                                                            </ul>
                                                            <h3 className="title">Online Classes for all</h3>
                                                            <div className="location">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                <p>Hotel Center Park, Chandigarh</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_bottom_description">
                                                            <div className="timing">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                            </div>
                                                            <div className="booking">
                                                                <Link to="/eventdetail">Book Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="event_cards_wrap">
                                                    <div className="cards">
                                                        <div className="card_image">
                                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png" alt="image" />
                                                        </div>
                                                        <div className="card_description">
                                                            <ul>
                                                                <li className="g-btn">Art & craft</li>
                                                            </ul>
                                                            <h3 className="title">Paint and Draw Classes</h3>
                                                            <div className="location">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                <p>Hotel Center Park, Chandigarh</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_bottom_description">
                                                            <div className="timing">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                            </div>
                                                            <div className="booking">
                                                                <Link to="/eventdetail">Book Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="event_cards_wrap">
                                                    <div className="cards">
                                                        <div className="card_image">
                                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png" alt="image" />
                                                        </div>
                                                        <div className="card_description">
                                                            <ul>
                                                                <li className="g-btn">Education</li>
                                                            </ul>
                                                            <h3 className="title">Online Classes for all</h3>
                                                            <div className="location">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                <p>Hotel Center Park, Chandigarh</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_bottom_description">
                                                            <div className="timing">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                            </div>
                                                            <div className="booking">
                                                                <Link to="/eventdetail">Book Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="event_cards_wrap">
                                                    <div className="cards">
                                                        <div className="card_image">
                                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png" alt="image" />
                                                        </div>
                                                        <div className="card_description">
                                                            <ul>
                                                                <li className="g-btn">Art & craft</li>
                                                            </ul>
                                                            <h3 className="title">Paint and Draw Classes</h3>
                                                            <div className="location">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                <p>Hotel Center Park, Chandigarh</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_bottom_description">
                                                            <div className="timing">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                            </div>
                                                            <div className="booking">
                                                                <Link to="/eventdetail">Book Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="event_cards_wrap">
                                                    <div className="cards">
                                                        <div className="card_image">
                                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png" alt="image" />
                                                        </div>
                                                        <div className="card_description">
                                                            <ul>
                                                                <li className="g-btn">Education</li>
                                                            </ul>
                                                            <h3 className="title">Online Classes for all</h3>
                                                            <div className="location">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                <p>Hotel Center Park, Chandigarh</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_bottom_description">
                                                            <div className="timing">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                            </div>
                                                            <div className="booking">
                                                                <Link to="/eventdetail">Book Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-6">
                                                <div className="event_cards_wrap">
                                                    <div className="cards">
                                                        <div className="card_image">
                                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png" alt="image" />
                                                        </div>
                                                        <div className="card_description">
                                                            <ul>
                                                                <li className="g-btn">Art & craft</li>
                                                            </ul>
                                                            <h3 className="title">Paint and Draw Classes</h3>
                                                            <div className="location">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="icon" />
                                                                <p>Hotel Center Park, Chandigarh</p>
                                                            </div>
                                                        </div>
                                                        <div className="card_bottom_description">
                                                            <div className="timing">
                                                                <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="icon" />
                                                                <p>Aug 15 | 7PM - September 15 | 2PM</p>
                                                            </div>
                                                            <div className="booking">
                                                                <Link to="/eventdetail">Book Now</Link>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div> */}
                                        </div>
                                    </div>
                                    {/* <div className="view_more_btn">
                                <a href="#">View More</a>
                            </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default EventListing;
