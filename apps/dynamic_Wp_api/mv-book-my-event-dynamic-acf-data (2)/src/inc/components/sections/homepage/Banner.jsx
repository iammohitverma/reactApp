import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Swiper, SwiperSlide } from 'swiper/react';


// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';



// import required modules
import {Pagination, Navigation } from 'swiper/modules';

function Banner({siteUrl , props}) {
    const [MediaItem, setMediaItems] = useState([]);
    const bannerIds = props.image_block;

    useEffect(() => {
        const fetchAllMedia = async () => {
          try {
            // Use Promise.all to fetch all media items
            const responses = await Promise.all(
              bannerIds.map((bannerId) =>
                axios.get(`${siteUrl}wp-json/wp/v2/media/${bannerId}`)
              )
            );
    
            // Extract the data from each response and update state
            const items = responses.map((response) => response.data);
            setMediaItems(items);
            
          } catch (error) {
            console.error("Error fetching data:", error);
          }
        };
    
        fetchAllMedia();
      }, [bannerIds]);
      
    
    
    return (
        <>

            <section className='banner_section'>
                <Swiper
                    slidesPerView={2}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={false}
                    modules={[Pagination, Navigation]}
                    className="mySwiper"
                >
                    {MediaItem.map((item) => (
                        <SwiperSlide key={item.id}>
                            <img 
                                key={item.id}
                                src={item.guid.rendered}
                                alt={`Media ID ${item.id}`}
                            ></img>
                        </SwiperSlide>
                    ))}

                    {/* <SwiperSlide>
                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event_banner01.png" alt='banner_image'></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event_banner02.png" alt='banner_image'></img>
                    </SwiperSlide>
                    <SwiperSlide>
                        <img src="https://bookmyevents.tmdemo.in/bme-admin/wp-content/uploads/2024/12/event_banner01.png" alt='banner_image'></img>
                    </SwiperSlide> */}
                </Swiper>
            </section>
        </>
    );
}

export default Banner;
