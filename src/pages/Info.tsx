import { useEffect, useState } from "react";
import { GrLocation } from "react-icons/gr";
import { AiOutlineMail } from "react-icons/ai";
import { FiPhone } from "react-icons/fi";
import { FaExternalLinkAlt } from "react-icons/fa";

const tabs = ["Contact", "Hours", "Schedule"] as const;
type Tab = (typeof tabs)[number];

interface ContactForm {
    name: string;
    email: string;
    phone: string;
    subject: string;
    message: string;
}

export default function Info() {
    const [activeTab, setActiveTab] = useState<Tab>("Contact");
    const [form, setForm] = useState<ContactForm>({ name: "", email: "", phone: "", subject: "", message: "" });

    const updateField = (field: keyof ContactForm, value: string) =>
        setForm((prev) => ({ ...prev, [field]: value }));

    const hasFormData = Object.values(form).some((v) => v.trim() !== "");

    useEffect(() => {
        if (!hasFormData) return;
        const handleBeforeUnload = (e: BeforeUnloadEvent) => {
            e.preventDefault();
        };
        window.addEventListener("beforeunload", handleBeforeUnload);
        return () => window.removeEventListener("beforeunload", handleBeforeUnload);
    }, [hasFormData]);

    return (
        <div className="flex items-center justify-center h-[calc(100vh-80px)] px-4">
            <div className="bg-[#fefbfa] rounded-2xl shadow-lg w-full max-w-3xl overflow-hidden">
                {/* Tab bar */}
                <div className="flex border-b border-[#e8ddd4]">
                    {tabs.map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 py-4 text-sm font-semibold tracking-wide transition-colors cursor-pointer ${
                                activeTab === tab
                                    ? "text-[#ccab8f] border-b-2 border-[#ccab8f] bg-white/50"
                                    : "text-[#a09488] hover:text-[#ccab8f] hover:bg-white/30"
                            }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>

                {/* Tab content */}
                <div className="p-8">
                    {activeTab === "Contact" && <ContactPanel form={form} updateField={updateField} />}
                    {activeTab === "Hours" && <HoursPanel />}
                    {activeTab === "Schedule" && <SchedulePanel />}
                </div>
            </div>
        </div>
    );
}

function ContactPanel({ form, updateField }: { form: ContactForm; updateField: (field: keyof ContactForm, value: string) => void }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-4">
                <h1 className="text-2xl font-bold text-[#4a3f35]">Hi there!</h1>
                <p className="text-sm text-[#8c7a66]">
                    Have any questions? Feel free to reach out to us using the contact form. We will get back to you as soon as possible.
                </p>
                <ul className="flex flex-col gap-3 mt-2">
                    <li className="flex items-center">
                        <GrLocation className="text-[#ccab8f] text-xl mr-3 shrink-0" />
                        <a target="_blank" rel="noopener noreferrer" href="https://maps.app.goo.gl/i6xyPuQfLktDwMVZ7" className="text-sm text-[#8c7a66] hover:underline">
                            107 E Huntington Dr. Arcadia CA, 91006
                        </a>
                    </li>
                    <li className="flex items-center">
                        <AiOutlineMail className="text-xl text-[#ccab8f] mr-3 shrink-0" />
                        <p className="text-sm text-[#8c7a66]">justnatureusa@gmail.com</p>
                    </li>
                    <li className="flex items-center">
                        <FiPhone className="text-xl text-[#ccab8f] mr-3 shrink-0" />
                        <p className="text-sm text-[#8c7a66]">(626) 446-6788</p>
                    </li>
                </ul>
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3302.2357382716236!2d-118.03013827209044!3d34.14031053264143!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2dbdd0ef99153%3A0xac3969700dfe9dd4!2s107%20E%20Huntington%20Dr%2C%20Arcadia%2C%20CA%2091006!5e0!3m2!1sen!2sus!4v1750976989101!5m2!1sen!2sus"
                    className="w-full h-40 rounded-lg mt-2"
                    style={{ border: 0 }}
                    allowFullScreen={false}
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />
            </div>

            <form className="flex flex-col gap-3">
                <h2 className="text-[#ccab8f] text-xl font-extrabold text-center mb-1">Contact Us</h2>
                <input type="text" placeholder="Name" value={form.name}
                    onChange={(e) => updateField("name", e.target.value)}
                    className="w-full text-gray-800 rounded-md py-2 px-4 border text-sm outline-[#ccab8f]" />
                <input type="email" placeholder="Email" value={form.email}
                    onChange={(e) => updateField("email", e.target.value)}
                    className="w-full text-gray-800 rounded-md py-2 px-4 border text-sm outline-[#ccab8f]" />
                <input type="tel" placeholder="Phone" value={form.phone}
                    onChange={(e) => updateField("phone", e.target.value)}
                    className="w-full text-gray-800 rounded-md py-2 px-4 border text-sm outline-[#ccab8f]" />
                <input type="text" placeholder="Subject" value={form.subject}
                    onChange={(e) => updateField("subject", e.target.value)}
                    className="w-full text-gray-800 rounded-md py-2 px-4 border text-sm outline-[#ccab8f]" />
                <textarea placeholder="Message" rows={3} value={form.message}
                    onChange={(e) => updateField("message", e.target.value)}
                    className="w-full text-gray-800 rounded-md px-4 border text-sm pt-2 outline-[#ccab8f]" />
                <button type="button"
                    className="text-[#f5f5f3] bg-[#ccab8f] hover:bg-[#b3947b] rounded-md text-sm px-4 py-2.5 w-full mt-2 cursor-pointer">
                    Send
                </button>
            </form>
        </div>
    );
}

function HoursPanel() {
    const hours = [
        { day: "Monday", time: "9:00 AM - 5:00 PM" },
        { day: "Tuesday", time: "9:00 AM - 5:00 PM" },
        { day: "Wednesday", time: "9:00 AM - 5:00 PM" },
        { day: "Thursday", time: "9:00 AM - 5:00 PM" },
        { day: "Friday", time: "10:00 AM - 5:00 PM" },
        { day: "Saturday", time: "10:00 AM - 5:00 PM" },
        { day: "Sunday", time: "Closed" },
    ];

    return (
        <div className="flex flex-col items-center">
            <h2 className="text-[#ccab8f] text-2xl font-extrabold">Hours of Operation</h2>
            <p className="text-[#ac9d92] italic text-sm mb-6">by appointment only</p>

            <div className="w-full max-w-md">
                {hours.map(({ day, time }) => (
                    <div
                        key={day}
                        className={`flex justify-between py-3 px-6 ${
                            day !== "Sunday" ? "border-b border-[#e8ddd4]" : ""
                        }`}
                    >
                        <span className="text-[#807162] font-medium">{day}</span>
                        <span className={`${time === "Closed" ? "text-[#c47a6a]" : "text-[#807162]"}`}>
                            {time}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}

function SchedulePanel() {
    return (
        <div className="flex flex-col items-center text-center max-w-md mx-auto py-8">
            <h2 className="text-[#ccab8f] text-2xl font-extrabold mb-4">Schedule an Appointment</h2>
            <p className="text-sm text-[#8c7a66] mb-6 leading-relaxed">
                Want to visit our store? Click the button below to access our appointment form and schedule a visit.
            </p>
            <a
                href="https://forms.gle/tPKxm1GwSWEL2Z887"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 bg-[#ccab8f] hover:bg-[#b3947b] text-white rounded-md text-sm px-6 py-3 transition-colors"
            >
                Book an Appointment
                <FaExternalLinkAlt className="text-xs" />
            </a>
        </div>
    );
}
