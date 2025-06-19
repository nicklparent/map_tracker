export type User = {
    id: number;
    role: string;
    email: string;
    username: string;
    password: string;
    sessions: Session;
};

export type Session = {
    id: string;
    name: string;
    ownerId: string;
    createdAt: Date;
    maps: Map[];
};

export type Map = {
    id: string;
    name: string;
    sessionId: string;
    createdAt: Date;
};

//used in jwt.ts to represent a payload object
export type JwtPayload = {
    id: string;
    email: string;
};