import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";
// import required modules
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

import ImgTag from '../../../global/singleImage';

function EventTab({ siteUrl, props }) {
    const postType = props.post_type_name;
    const [filteredData, setFilteredData] = useState([]);
    // const [tagsArray, setTagsArray] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`${siteUrl}wp-json/wp/v2/${postType}/`);
                
                // Filter the response data based on category ID
                const filtered = response.data.filter(item => {
                    // Check if events-category exists and includes the category ID 2
                    return item['events-category']?.some(cat => cat === props.upcoming_events[0]);
                });

                // console.log('Filtered Data:', filtered);
                setFilteredData(filtered); // Store filtered data in state

                // Extract and transform the tags
                // const allTags = filtered.map(item => item['events-tag']?.join(', ') || '');
                // console.log(allTags);

                // setTagsArray(allTags);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [siteUrl, postType]);
    console.log(filteredData);

    const formatDate = (date) => {
        const options = { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    };
    // Function to get tomorrow's date
    const getTomorrowDate = () => {
        const tomorrow = new Date();
        tomorrow.setDate(tomorrow.getDate() + 1);
        return formatDate(tomorrow);
    };

    // Function to get the upcoming weekend (next Saturday-Sunday)
    const getWeekendDates = () => {
        const weekendStart = new Date();
        const weekendEnd = new Date();
        weekendStart.setDate(weekendStart.getDate() + ((6 - weekendStart.getDay()) % 7)); // next Saturday
        weekendEnd.setDate(weekendStart.getDate() + 1); // next Sunday
        return `${formatDate(weekendStart)} - ${formatDate(weekendEnd)}`;
    };

    // Function to get the current month name
    const getCurrentMonth = () => {
        const month = new Date();
        const options = { month: 'short', year: 'numeric' }; // Short month format with year
        return month.toLocaleDateString('en-US', options); // Format it as "Aug 2023"
    };


    const getTodayAndTomorrow = () => {
        const today = new Date();
        const tomorrow = new Date();
        tomorrow.setDate(today.getDate() + 1); // Get tomorrow's date

        return { today, tomorrow };
    };

    // Function to check if a date is on the upcoming weekend (Saturday or Sunday)
    const isWeekend = (date) => {
        const day = date.getDay();
        const today = new Date();
        const saturday = new Date(today);
        const sunday = new Date(today);

        saturday.setDate(today.getDate() + (6 - today.getDay() + 7) % 7);
        sunday.setDate(saturday.getDate() + 1);
        
        if (saturday.toDateString() == date.toDateString() || sunday.toDateString() == date.toDateString()){
            return day === 6 || day === 0; 
        }
        
      
    };

    
    const categorizeEvents = (events) => {
        const { today, tomorrow } = getTodayAndTomorrow();

        const eventsData = {
            today: [],
            tomorrow: [],
            weekend: [],
            month: [],
        };

        events.forEach(event => {
            event.acf.sections
                && Array.isArray(event.acf.sections)
                && event.acf.sections
                    .filter((section) => section.acf_fc_layout === "upcoming_event")
                    .map((upcoming_event) => {
                        // Assuming the date is in the `upcoming_event_date` property
                        if (upcoming_event.upcoming_event_date) {
                            const dateStr = `${upcoming_event.upcoming_event_date.slice(0, 4)}-${upcoming_event.upcoming_event_date.slice(4, 6)}-${upcoming_event.upcoming_event_date.slice(6, 8)}`;
                            const date = new Date(dateStr);
                            
                            // Now we check the date
                            if (date.toDateString() === today.toDateString()) {
                                eventsData.today.push(event);
                            } else if (date.toDateString() === tomorrow.toDateString()) {
                                eventsData.tomorrow.push(event);
                            } else if (isWeekend(date)) {
                                eventsData.weekend.push(event);
                            } if (date.getMonth() === today.getMonth()) {
                                eventsData.month.push(event);
                            }
                        }
                    });
                    
        
            // const eventDate = new Date(`${event.acf.sections[0].upcoming_event_date.slice(0, 4)}-${event.acf.sections[0].upcoming_event_date.slice(4, 6)}-${event.acf.sections[0].upcoming_event_date.slice(6, 8)}`);

            // // Check if the event is today
            // if (eventDate.toDateString() === today.toDateString()) {
            //     eventsData.today.push(event);
            // }

            // // Check if the event is tomorrow
            // else if (eventDate.toDateString() === tomorrow.toDateString()) {
            //     eventsData.tomorrow.push(event);
            // }

            // // Check if the event is on the upcoming weekend
            // else if (isWeekend(eventDate)) {
            //     eventsData.weekend.push(event);
            // }

            // // Check if the event is in the current month
            // if (eventDate.getMonth() === today.getMonth()) {
            //     eventsData.month.push(event);
            // }
        });

        return eventsData;
    };

    const categorizedEvents = categorizeEvents(filteredData);
    //console.log(categorizedEvents.month);
   
    return (
        <>
            <section className="event_section">
                <div className="container">
                    <div className="event_tabs_heading mb_100">
                        <div className="sec_heading mb_20">
                            <h3 className="hdng g-hdng">Event this week</h3>
                        </div>
                        <div className="event_tabs">
                            <Tabs
                                defaultActiveKey="month"
                                id="event-tabs"
                                className="mb-3"
                            >
                                <Tab eventKey="month" title={
                                    <div className="nav_link_wrap">
                                        <div className="heading">
                                            <h3 className="hdng">This Month</h3>
                                            <p>{getCurrentMonth()}</p> {/* Current Month */}
                                        </div>
                                        <div className="icon">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender.svg" alt="icon" />
                                        </div>
                                    </div>
                                }>
                                    {renderEventCards(categorizedEvents.month, 'Month Events', siteUrl)}
                                </Tab>
                                <Tab eventKey="today" title={
                                    <div className="nav_link_wrap">
                                        <div className="heading">
                                            <h3 className="hdng">Today</h3>
                                            <p>{formatDate(new Date())}</p> {/* Current Date */}
                                        </div>
                                        <div className="icon">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender.svg" alt="icon" />
                                        </div>
                                    </div>
                                }>
                                    {renderEventCards(categorizedEvents.today, 'Today Events', siteUrl)}
                                </Tab>
                                <Tab eventKey="tomorrow" title={
                                    <div className="nav_link_wrap">
                                        <div className="heading">
                                            <h3 className="hdng">Tomorrow</h3>
                                            <p>{getTomorrowDate()}</p> {/* Tomorrow's Date */}
                                        </div>
                                        <div className="icon">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender.svg" alt="icon" />
                                        </div>
                                    </div>
                                }>
                                    {renderEventCards(categorizedEvents.tomorrow, 'Tomorrow Events', siteUrl)}
                                </Tab>
                                <Tab eventKey="weekend" title={
                                    <div className="nav_link_wrap">
                                        <div className="heading">
                                            <h3 className="hdng">Weekend</h3>
                                            <p>{getWeekendDates()}</p> {/* Upcoming Weekend */}
                                        </div>
                                        <div className="icon">
                                            <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender.svg" alt="icon" />
                                        </div>
                                    </div>
                                }>
                                    {renderEventCards(categorizedEvents.weekend, 'Weekend Events', siteUrl)}
                                </Tab>
                            </Tabs>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}
// const eventsData = {
//     today: [
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png",
//             category: "Education",
//             title: "Online Classes for all",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png",
//             category: "Art & Craft",
//             title: "Paint and Draw Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event03.png",
//             category: "Sports",
//             title: "Basketball Training Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//     ],
//     tomorrow: [
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png",
//             category: "Education",
//             title: "Online Classes for all",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png",
//             category: "Art & Craft",
//             title: "Paint and Draw Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event03.png",
//             category: "Sports",
//             title: "Basketball Training Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//     ],
//     weekend: [
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png",
//             category: "Education",
//             title: "Online Classes for all",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png",
//             category: "Art & Craft",
//             title: "Paint and Draw Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event03.png",
//             category: "Sports",
//             title: "Basketball Training Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//     ],
//     month: [
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event01.png",
//             category: "Education",
//             title: "Online Classes for all",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event02.png",
//             category: "Art & Craft",
//             title: "Paint and Draw Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//         {
//             image: "https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event03.png",
//             category: "Sports",
//             title: "Basketball Training Classes",
//             location: "Hotel Center Park, Chandigarh",
//             timing: "Aug 15 | 7PM - September 15 | 2PM",
//         },
//     ],
// };
const renderEventCards = (events, heading, siteUrl) => (
    <div className="tab-pane-content">
        <div className="sec_heading mb_50">
            <h3 className="hdng g-hdng">{heading}</h3>
        </div>
        <div className="events_cards_wrap">
            <div className="row">
                {/* Check if there are events to render */}
                {events.length > 0 ? (
                    events.map((event, index) => (
                        <div className="col-md-4" key={index}>
                            <div className="cards">
                                <div className="card_image">
                                    <ImgTag ImageId={event.featured_media} siteUrl={siteUrl} />
                                </div>
                                <div className="card_description">
                                    <ul>
                                        <li className="g-btn">Sports</li> {/* Adjust category as needed */}
                                    </ul>
                                    <h3 className="title">{event.title.rendered}</h3>
                                    <div className="location">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/location.svg" alt="Location Icon" />
                                        <p>Hotel Center Park, Chandigarh</p>
                                    </div>
                                </div>
                                <div className="card_bottom_description">
                                    <div className="timing">
                                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/calender_icon.svg" alt="Calendar Icon" />
                                        <p>Aug 15 | 7PM - September 15 | 2PM</p> {/* Adjust timing */}
                                    </div>
                                    <div className="booking">
                                        <Link to={`/event/${event.link.split('/').filter(Boolean).pop()}`}>Book Now</Link>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    // Display "No events found" message when no events are available
                    <div className="no-events-found">
                        <p>No events founds</p>
                    </div>
                )}
            </div>
        </div>
    </div>

);
export default EventTab;
