import { FaGithub } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";


export function Footer() {
    return (
        <div className="flex flex-col w-full h-fit bg-[#f7f8f1] text-[#e2bb9d] px-14 py-14">
            <div className="flex flex-row">
                <div className="flex flex-col gap-2 justify-center w-1/3">
                    <div className="flex items-center w-full gap-4">
                        <img src="/logo_cursive.png" width="256" alt="Logo Preview" />
                    </div>

                    <p className="text-xs text-center text-[#9d785c] w-[256px]">
                        Website designed by {' '}
                        <a
                            href="https://github.com/kannachi323"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#e2bb9d] transition-colors duration-300"
                        >
                            kannachi323
                        </a>
                    </p>
                    
                    <span className="w-[256px] inline-flex justify-center items-center p-2 gap-5">
                        <a href="https://github.com/kannachi323"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#e2bb9d] transition-colors duration-300"
                        >
                            <FaGithub className="text-2xl text-[#9d785c] hover:text-[#e2bb9d] transition-colors duration-300" />
                        </a>   
                        <a href="https://www.facebook.com/matthew.chen.3956"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#e2bb9d] transition-colors duration-300"
                        >
                            <FaFacebook className="text-2xl text-[#9d785c] hover:text-[#e2bb9d] transition-colors duration-300" />
                        </a> 
                        <a href="https://www.instagram.com/mattchen.323/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="underline hover:text-[#e2bb9d] transition-colors duration-300"
                        >
                            <FaInstagram className="text-2xl text-[#9d785c] hover:text-[#e2bb9d] transition-colors duration-300" />
                        </a>
                        
                        


                    </span>
                    
                    
                </div>
                <div className="flex flex-row w-[65%] justify-end gap-16 text-nowrap">
                    <div className="grid grid-cols-2 gap-12">
                        
                        
                        <div className="flex flex-col gap-2">
                            <div className="font-bold uppercase text-[#9d785c] pb-3">Comany</div> <a href="#xxx" className="hover:underline">About Us</a>  <a href="#xxx" className="hover:underline">Contact</a>  <a href="#xxx" className="hover:underline">Support</a>  <a href="#xxx" className="hover:underline">News</a>
                        </div>
                    
                        <div className="flex flex-col gap-2">
                            <div className="font-bold uppercase text-[#9d785c] pb-3">Legal</div> <a href="#xxx" className="hover:underline">Imprint</a>  <a href="#xxx" className="hover:underline">Privacy Policy</a>  <a href="#xxx" className="hover:underline">Terms of Use</a>
                        </div>
                
                    </div>

                    <div className="flex flex-col gap-2">
                        <div className="font-bold uppercase text-[#9d785c] pb-3">Newsletter</div>
                        <p className="text-[#e2bb9d] mb-2">Subscribe to our newsletter.</p>
                        <form className="flex items-center">
                            <input type="email" name="email" placeholder="Enter your email" className="w-full bg-gray-100 text-gray-700 rounded-l-lg py-3 px-4 focus:outline-hidden focus:ring-purple-600 focus:border-transparent" autoComplete="off" required={true}/>
                            <button type="submit" className="bg-[#dbbfa6] text-[#ffffff] font-semibold py-3 px-6 rounded-r-lg transition-colors duration-300">Subscribe</button>
                        </form>
                    </div>
            
                </div>
            </div>
            
            <div className="w-full border-t border-gray-500 my-8"></div>
            <div className="text-center">© 2025 Just Nature - All rights reserved.</div>
            
        </div>
    );
}