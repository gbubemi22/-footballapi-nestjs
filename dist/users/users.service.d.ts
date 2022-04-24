import { UpdateUserDto } from './dtos/update-user.dto';
import { User } from './schemas/user.schema';
import { UsersRepository } from './users.repository';
export declare class UsersService {
    private readonly usersRepository;
    [x: string]: any;
    find(arg0: {
        username: string;
    }): void;
    constructor(usersRepository: UsersRepository);
    getUsers(): Promise<User[]>;
    getUserById(userId: string): Promise<User>;
    createUser(fullname: string, username: string, email: string, phonenumber: number, password: any): Promise<User>;
    updateUser(userId: string, userUpdates: UpdateUserDto): Promise<User>;
}
