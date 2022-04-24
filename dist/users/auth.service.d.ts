import { UsersService } from './users.service';
export declare class AuthService {
    private usersService;
    constructor(usersService: UsersService);
    register(fullname: string, username: string, email: string, phonenumber: number, password: any): Promise<any>;
}
