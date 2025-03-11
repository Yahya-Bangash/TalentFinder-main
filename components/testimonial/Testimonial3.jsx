'use client'

import Image from "next/image";

const Testimonial3 = () => {
  return (
    <>
      <div className="slide-item">
        <div className="image-column">
          <figure className="image">
            <Image
              width={410}
              height={500}
              src="/images/resource/Jordiee.jpg"
              alt="testimonial"
            />
          </figure>
        </div>
        <div className="content-column">
          <div className="testimonial-block-three">
            <div className="inner-box">
              <h4 className="title">Great quality!</h4>
              <div className="text">DXT is a company based in Douala, specializing in digital technology, commerce, professional training, and support for international mobility (studies, employment, and work opportunities)</div>
              <div className="info-box">
                <h4 className="name">Jordis Kengne</h4>
                <span className="designation">Owner and Managing Director of DXT SARL</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Testimonial3;
