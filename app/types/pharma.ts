export type Order = {    
    name: string,
    photo: string,
    address: string,
    products: string,
    price: string,
    status: string,
    order_date: string,
}

export type Customer = {    
    name: string,
    image: string,
    photo?: string,
    email: string,
    address: string,
    phone: string,
    spent: string,
    register_date: string,
}