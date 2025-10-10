import React from 'react';

interface Service {
    id: number;
    title: string;
    description: string;
}

interface ServiceListProps {
    services: Service[];
}

const ServiceList: React.FC<ServiceListProps> = ({ services }) => {
    return (
        <div className="service-list">
            <h2>Our Services</h2>
            <ul>
                {services.map(service => (
                    <li key={service.id}>
                        <h3>{service.title}</h3>
                        <p>{service.description}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default ServiceList;