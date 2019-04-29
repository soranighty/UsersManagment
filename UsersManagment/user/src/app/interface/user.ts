//si utilizza un interface in quanto più leggera rispetto alla classe, in quanto viene vista come una tipologia di dati 

export interface UserInterface {
    id:number;
    name: string;
    lastname: string;
    email: string;
    fiscalCode: string;
    city: string;
    phone: string;
    age: number;
}
