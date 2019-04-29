import { UserInterface } from '../interface/user';

export class User implements UserInterface {
    id:number;
    name: string;
    lastname: string;
    email: string;
    fiscalCode: string;
    city: string;
    phone: string;
    age: number;

    constructor () {
        
    this.id = 0,
    this.name = '',
    this.lastname = '',
    this.email = '', 
    this.fiscalCode = '',
    this.city = '',
    this.phone = '',
    this.age = 0
    }
}
