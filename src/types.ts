export type user = {
    id: number;
    username: string;
    password: string;
}

//used in jwt.ts to represent a payload object
export type JwtPayload = {
    id: string;
    email: string;
}