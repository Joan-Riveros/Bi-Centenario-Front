import React from 'react';
import { FaWhatsapp, FaFacebookF, FaInstagram, FaGithub } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const icons = [
    { name: 'Whatsapp', url: 'https://api.whatsapp.com/send?phone=+112067101079', bg: 'bg-[#128c7e]', icon: <FaWhatsapp size={20} /> },
    { name: 'Facebook', url: 'https://facebook.com', bg: 'bg-[#3b5998]', icon: <FaFacebookF size={20} /> },
    { name: 'Instagram', url: 'https://instagram.com', bg: 'bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500', icon: <FaInstagram size={20} /> },
    { name: 'GitHub', url: 'https://github.com', bg: 'bg-[#333]', icon: <FaGithub size={20} /> },
    { name: 'Correo', url: 'mailto:repositorio@bolivia.bo', bg: 'bg-[#ea4335]', icon: <SiGmail size={20} /> },
];

function SocialLinks() {
    return (
        <div className="flex items-center justify-center gap-4 mt-4 flex-wrap">
            {icons.map(({ name, url, bg, icon }) => (
                <a
                    key={name}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="relative group w-10 h-10 rounded-full flex items-center justify-center bg-white shadow-md hover:scale-105 transition-transform duration-300"
                    aria-label={name}
                >
                    <span
                        className={`absolute inset-0 rounded-full ${bg} opacity-0 group-hover:opacity-100 transition duration-300`}
                    ></span>
                    <span className="relative text-gray-700 group-hover:text-white z-10">
                        {icon}
                    </span>
                    <span className="absolute -top-8 left-1/2 -translate-x-1/2 text-xs px-2 py-1 bg-black text-white rounded opacity-0 group-hover:opacity-100 transition duration-300">
                        {name}
                    </span>
                </a>
            ))}
        </div>
    );
}

export default SocialLinks;
