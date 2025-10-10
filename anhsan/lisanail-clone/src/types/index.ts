export interface Service {
    id: number;
    title: string;
    description: string;
    imageUrl: string;
}

export interface HeaderProps {
    title: string;
    logoUrl: string;
}

export interface FooterProps {
    copyrightText: string;
    links: Array<{ label: string; url: string }>;
}

export interface HomeProps {
    services: Service[];
}

export interface AboutProps {
    mission: string;
    values: string[];
}

export interface ContactProps {
    email: string;
    phone: string;
}