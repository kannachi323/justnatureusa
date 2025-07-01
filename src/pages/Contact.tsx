import { GrLocation } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";

import { FaExternalLinkAlt } from "react-icons/fa";

export default function Contact() {

    return (
        <>
            <div className="my-5 mx-auto grid grid-cols-2 gap-10 p-5 w-3/4 md:w-2/3 bg-[#e9f3e4] rounded-md">

            
                <section className="flex flex-col justify-between">
                    <h1 className="text-3xl">Hi there!</h1>
                    <p className="text-sm text-[#8c7a66]">
                    Have any questions? Feel free to reach out to us using the contact form. We will get back to you as soon as possible.
                    </p>
                    <ul className="flex flex-col text-[#ccab8f] mt-5">
                        <li className="flex flex-row items-center justify-start mb-5">
                            <GrLocation className="text-[#ccab8f] text-3xl mr-3" />
                            <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/i6xyPuQfLktDwMVZ7" className="hover:underline">107 E Huntington Dr. Arcadia CA, 91006</a>
                        </li>
                        <li className="flex flex-row items-center justify-start mb-5">
                            <AiOutlineMail className="text-3xl text-[#ccab8f] mr-3" />
                            <p className="hover:underline">justnatureusa@gmail.com</p>
                        </li>  
                        <li className="flex flex-row items-center justify-start mb-5">
                            <FiPhone className="text-3xl text-[#ccab8f] mr-3" />
                            <p>(626) 446-6788</p>
                        </li>  
                    </ul>
                    <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.2357382716236!2d-118.03013827209044!3d34.14031053264143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dbdd0ef99153%3A0xac3969700dfe9dd4!2s107%20E%20Huntington%20Dr%2C%20Arcadia%2C%20CA%2091006!5e0!3m2!1sen!2sus!4v1750976989101!5m2!1sen!2sus" 
                                style={{border: 0, width: "100%", height: 256}} allowFullScreen={false} loading="lazy" referrerPolicy="no-referrer-when-downgrade"
                            />
                    
                </section>

                <form className="flex flex-col justify-between gap-5">
                    <h1 className="text-[#ccab8f] text-3xl font-extrabold text-center">Contact Us</h1>
                    <input type='text' placeholder='Name'
                        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-[#ccab8f]" />
                    <input type='email' placeholder='Email'
                        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-[#ccab8f]" />
                    <input type='tel' placeholder='Phone'
                        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-[#ccab8f]" /> 
                    <input type='text' placeholder='Subject'
                        className="w-full text-gray-800 rounded-md py-2.5 px-4 border text-sm outline-[#ccab8f]" />
                    <textarea placeholder='Message' rows={6}
                        className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2.5 outline-[#ccab8f]"></textarea>
                    <button type='button'
                        className="text-[#f5f5f3] bg-[#ccab8f] hover:bg-[#b3947b] rounded-md text-sm px-4 py-3 w-full !mt-6">Send</button>
                </form>
            </div>


            <div className="flex flex-row items-center justify-evenly gap-5 w-3/4 md:w-2/3 mx-auto my-5rounded-md">
                <div className="grid grid-cols-2 gap-5 items-start justify-start mx-auto w-1/2 p-5 mb-10 bg-[#e9f3e4] rounded-md">
                    <div className="col-span-2 text-center">
                        <h1 className="text-[#ccab8f] text-3xl font-extrabold pb-0">Hours of Operation</h1>
                        <h2 className="text-[#ac9d92] italic">by appointment only</h2>
                    </div>

                    <ul className="flex flex-col justify-evenly items-start pl-10 text-[#807162]">
                        <li className="mb-3">Monday</li>
                        <li className="mb-3">Tuesday</li>
                        <li className="mb-3">Wednesday</li>
                        <li className="mb-3">Thursday</li>
                        <li className="mb-3">Friday</li>
                        <li className="mb-3">Saturday</li>
                        <li className="mb-3">Sunday</li>
                    </ul>

                    <ul className="flex flex-col justify-evenly items-end pr-10 text-[#807162]">
                        <li className="mb-3">9:00 AM - 5:00 PM</li>
                        <li className="mb-3">9:00 AM - 5:00 PM</li>
                        <li className="mb-3">9:00 AM - 5:00 PM</li>
                        <li className="mb-3">9:00 AM - 5:00 PM</li>
                        <li className="mb-3">10:00 AM - 5:00 PM</li>
                        <li className="mb-3">10:00 AM - 5:00 PM</li>
                        <li className="mb-3">Closed</li>
                    </ul>
                </div>

                <div className="flex flex-col items-center justify-start mx-auto p-5 w-1/2 bg-[#e9f3e4] rounded-md self-start">
                    <h1 className="text-[#ccab8f] text-2xl font-extrabold text-center">Schedule an Appointment</h1>
                    <p className="text-sm text-[#8c7a66] mt-2 text-center">
                        Want to visit our store?       
                        <a className="underline inline-flex items-center ml-1" href="https://forms.gle/tPKxm1GwSWEL2Z887" target="_blank" rel="noopener noreferrer">
                            Click here to access our appointment form and schedule a visit.
                            <FaExternalLinkAlt className="text-[#ccab8f] text-center ml-1">Link</FaExternalLinkAlt>
                        </a>
                    </p> 

                </div>



            </div>
              
           


    

          
        </>
    );
}