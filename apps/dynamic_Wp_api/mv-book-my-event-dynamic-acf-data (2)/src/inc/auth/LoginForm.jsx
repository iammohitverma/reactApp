import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
// use navigate is used for redirect the user after successful login


function LoginForm({ siteUrl }) {
    console.log(siteUrl);
    
    const [getInputValues, holdInputValues] = useState({
        fName: '',
        eMail: '',
        pHone: '',
        pWord: ''
    });
    const [responseMessage, setResponseMessage] = useState('');
    const navigate = useNavigate(); // Initialize useNavigate for redirects
    const GetInputEvent = (event) => {
        const { name, value } = event.target;
        holdInputValues((prevVal) => {
            //console.log(prevVal);
            return {
                ...prevVal,
                [name]: value,
            }
        })
    }
    const onSubmitForm = async (event) => {
        event.preventDefault();
        console.log(getInputValues.eMail);
        console.log(getInputValues.pWord);


        try {
            const response = await axios.post(`${siteUrl}wp-json/jwt-auth/v1/token`, {
                username: getInputValues.eMail,
                password: getInputValues.pWord,
            });
            
            localStorage.setItem('token', response.data.token); // Save the JWT token
            localStorage.setItem('UserName', response.data.user_display_name);

            window.dispatchEvent(new Event('userNameUpdated'));
            setResponseMessage('Login Successfull');
            // Redirect to dashboard after login
            navigate('/events'); // redirects user
        } catch (error) {
            // console.error('Login failed', error.response.data);
            setResponseMessage('Invalid username or password.');
        }
    }
    return (
        <>
            <section className="common_banner_section pt_100 pb_100">
                <div className="common_banner_section_wrap">
                    <div className="container">
                        <div className="banner_heading">
                            <h1 className="hdng fs_55">Login</h1>
                        </div>
                    </div>
                </div>
            </section>
            <section className="contact_us_section pt_100 pb_100">
                <div className="contact_us_section_wrap">
                    <div className="container">
                        <div className="row d-flex justify-content-center">
                            <div className="col-md-6">
                                <form className="form_wrap" onSubmit={onSubmitForm}>
                                    <div className="ap_form">
                                        <input type="text" placeholder="Email" value={getInputValues.eMail} name="eMail" onChange={GetInputEvent} />
                                        <input type="password" placeholder="Password" value={getInputValues.pWord} name="pWord" onChange={GetInputEvent} />
                                        <input type="submit" value="Login" />
                                        {responseMessage && <p>{responseMessage}</p>}
                                    </div>
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
export default LoginForm;
