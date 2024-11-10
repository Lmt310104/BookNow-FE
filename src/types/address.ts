export interface Address {
    fullName: string;
    phoneNumber: number | undefined;
    address: string;
    id?: string
}

export interface ResAddress {
    full_name: string;
    phone_number: number;
    address: string;
    id: string
}