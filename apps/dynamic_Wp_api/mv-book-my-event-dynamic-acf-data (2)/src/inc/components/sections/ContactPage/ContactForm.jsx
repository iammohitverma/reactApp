import React, { useEffect, useState } from 'react';

//import module
import axios from 'axios';

function ContactForm({ siteUrl, props }) {
    //console.log(props);
    // social icon
    const [MediaItem, setMediaItems] = useState([]);

    const SocialBlock = props.social_links;
    useEffect(() => {
        const fetchAllMedia = async () => {
            try {
                const responses = await Promise.all(
                    SocialBlock.map(async (block) => {
                        const response = await axios.get(`${siteUrl}wp-json/wp/v2/media/${block.logo}`);
                        return response; 
                    })
                );

                // Extract the data from each response and update state
                const items = responses.map((response) => response.data);
                setMediaItems(items);

            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchAllMedia();
    }, [SocialBlock]);
    //console.log(MediaItem);
    //endcode
    const [getInputValues, holdInputValues] = useState({
        nAme: '',
        eMail: '',
        sUbject: '',
        mEssage: ''
    });
    const [status, setStatus] = useState('');

    const GetInputEvent = (event) => {

        const { name, value } = event.target;

        holdInputValues((prevVal) => {

            return {
                ...prevVal,
                [name]: value,
            }

        })

    }
    const onSubmitForm = async (event) => {
        event.preventDefault();
        console.log(getInputValues);
        const endpoint = `${siteUrl}/wp-json/contact-form-7/v1/contact-forms/203/feedback`;

        const data = new FormData();
        data.append('your-name', getInputValues.nAme);
        data.append('your-email', getInputValues.eMail);
        data.append('your-subject', getInputValues.sUbject);
        data.append('your-message', getInputValues.mEssage);
        data.append('_wpcf7_unit_tag', 'wpcf7-f203-p0-o1');

        try {
            const response = await axios.post(endpoint, data);

            if (response.data.status === 'mail_sent') {
                setStatus('Form submitted successfully!');
                holdInputValues({
                    nAme: '',
                    eMail: '',
                    sUbject: '',
                    mEssage: ''
                });
            } else {
                setStatus(`Failed to submit form: ${response.data.message}`);
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('An error occurred while submitting the form.');
        }
    }
    return (
        <>
            <section className="contact_us_section pt_100 pb_100">
                <div className="contact_us_section_wrap">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="content_wrap">
                                    <div className="sec_heading mb_50">
                                        <h3 className="hdng g-hdng">{props.heading}</h3>
                                    </div>
                                    <div className="sec_content">
                                        <address>{props.address}</address>
                                        <p>{props.mail}</p>
                                        <p>{props.phone_number}</p>
                                        <div className="social_links">
                                            {MediaItem.map((item, index) => (
                                                <a href={props.social_links[index].link.url} key={index}>  
                                                        <img
                                                            src={item.guid.rendered}
                                                            alt={`Media ID ${item.id}-${index}`}
                                                        ></img>
                                                </a>
                                                    
                                            ))}
                                            {/* <a href="#">
                                                <img src="https://techmind.co.in/react_websites/book-my-event/images/footer_facebook.svg" alt="icon" />
                                             </a>
                                            <a href="#">
                                                <img src="https://techmind.co.in/react_websites/book-my-event/images/footer_instagram.svg" alt="icon" />
                                            </a>
                                            <a href="#">
                                                <img src="https://techmind.co.in/react_websites/book-my-event/images/footer_twiter.svg" alt="icon" />
                                            </a> */}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6">
                            <form className="form_wrap" onSubmit={onSubmitForm}> 
                                    <input type="text" placeholder="Your Name" value={getInputValues.nAme} name="nAme" onChange={GetInputEvent} />
                                    <input type="email" placeholder="Your Email" value={getInputValues.eMail} name="eMail" onChange={GetInputEvent} />
                                    <input type="text" placeholder="Your Subject" value={getInputValues.sUbject} name="sUbject" onChange={GetInputEvent} />
                                    <textarea name="mEssage" id="message" cols="30" rows="5" placeholder="Message" onChange={GetInputEvent} value={getInputValues.mEssage}></textarea>
                                    <input type="submit" value="Submit" />
                                    {status && <p>{status}</p>}
                            </form>
                            </div>
                            <div className="col-12">
                                <div className="iframe_wrap pt_100">
                                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3431.9017942518904!2d76.84109707621825!3d30.66489378890703!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390f94bc0584373d%3A0x4de8e87e82660f72!2sTechmind%20Softwares!5e0!3m2!1sen!2sin!4v1733373705222!5m2!1sen!2sin" frameBorder="0"></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default ContactForm;
