import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        const { username, password } = authCredentialsDto;
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password,salt);
        const user = this.create({username,password:hashedPassword});
        try {
            await this.save(user);
        } catch (error) {
            if(error.code === '23505') {
                throw new ConflictException('이미 존재하는 유저입니다.');
            } else {
                throw new InternalServerErrorException();
            }
        }
    } 
}