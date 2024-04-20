import { useState } from 'react'
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import { Row, Col, Input, Button, Flex, notification, Card } from 'antd';
import { MapContainer, TileLayer, Marker, LayerGroup, Circle, FeatureGroup, Popup, Rectangle } from 'react-leaflet';
const { TextArea } = Input;

import React from 'react';
import 'leaflet/dist/leaflet.css';
 
// const MapView = () => {
//     const myLocation = [26.47998, 80.29680]
//     const fillBlueOptions = { fillColor: 'blue' }
//     return (
//         <MapContainer center={myLocation} zoom={16} style={{ height: '400px', padding: 1, width: 800, margin: 2 }} scrollWheelZoom={true} fadeAnimation>
//             <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//             <FeatureGroup pathOptions={fillBlueOptions}>
//                 <Popup autoClose={false} >Aaradhya Telecom & Net Cafe</Popup>
//                 <Circle center={myLocation} pathOptions={fillBlueOptions} radius={20} />
//             </FeatureGroup>
//         </MapContainer>
//     );
// };


export default function ContactPage() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [contact, setContact] = useState('');
    const [api, contextHolder] = notification.useNotification();

    const submitHandler = () => {

    }

    const openNotification = () => {
        api.open({
            message: 'Your Message Submitted Successfully',
            description:
                'We will get it touch with you shortly. Thank you for reaching out to us!npm',
            className: 'custom-class',
            placement: "top",
            style: {
                width: 600,
            },
        });
    };
    return (
        <div className='row' id="ContactUs" style={{ backgroundColor: "white", padding: 10 }} >
            <div>
                <div className='row'><h1>Contact Us</h1></div>
                <div className='row'>
                    <div>
                        <p>Email: <a href="mailto:aaradhyatelecomandnetcafe@gmail.com">aaradhyatelecomandnetcafe@gmail.com</a></p>
                        <p>Phone: <a href="tel:+918090346822">+91 8090346822</a></p>
                        <p>Visit us at: 117/N/23, Nahar Patti, Kakadeo, Kanpur, Uttar Pradesh 208025</p>
                        <p>Follow us on:
                            <a href="https://www.facebook.com/aaradhyatelecomandnetcafe">Facebook</a>,
                            <a href="https://twitter.com/aaradhyatelecomandnetcafe">Twitter</a>,
                            <a href="https://www.instagram.com/aaradhyatelecomandnetcafe">Instagram</a>
                        </p>
                        <br/>
                        {/* <div className=''> 

                            <h1>Send a messge in case you have any query</h1>

                            Name <Input placeholder="Name" value={name} width={100} max={100} onChange={(e) => setName(e.target.value)} style={{ margin: 2 }} />

                            Email <Input placeholder="Email" value={email} max={100} onChange={(e) => setEmail(e.target.value)} style={{ margin: 2 }} />

                            Contact <Input placeholder="Contact Number" value={contact} max={100} onChange={(e) => setContact(e.target.value)} style={{ margin: 2 }} />

                            Message <TextArea placeholder="Your Message" value={message} onChange={(e) => setMessage(e.target.value)} minLength={50} maxLength={500} autoSize={{ minRows: 5, maxRows: 10, }} style={{ margin: 2 }} />

                            <Row style={{ margin: 2 }}> <Button type="primary" onClick={openNotification} >Submit your message!</Button></Row>
                        </div> */}
                    </div>
                    {/* <div >  <MapView /> </div> */}
                </div>
            </div>
        </div>
    );
}
