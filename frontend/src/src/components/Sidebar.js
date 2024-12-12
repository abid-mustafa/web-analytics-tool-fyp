import Link from 'next/link';
import "../styles/Sidebar.css";

export default function Sidebar() {
    const buttons = [
        { name: "Dashboard", icon: "📊", link: "/dashboard" },
        { name: "Analytics", icon: "📈", link: "/analytics" },
        { name: "Reports", icon: "📝", link: "/reports" },
        { name: "Settings", icon: "⚙️", link: "/settings" },
        { name: "Profile", icon: "👤", link: "/profile" },
    ];

    return (
        <div className="sidebar">
            <ul>
                {buttons.map((button, index) => (
                    <li key={index} className="sidebar-item">
                        <Link href={button.link}>
                            <span className="icon">{button.icon}</span>
                            <span className="text">{button.name}</span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
}
