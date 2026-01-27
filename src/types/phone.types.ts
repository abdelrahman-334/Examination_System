export interface IUserPhone {
    userName: string;
    phoneNumber: string;
}

export interface IAddPhoneDTO {
    phoneNumber: string;
}

export interface IUpdatePhoneDTO {
    oldPhoneNumber: string;
    newPhoneNumber: string;
}