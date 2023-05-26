import { Repository } from "typeorm";
import { User } from "./user.entity";
import { CustomRepository } from "src/typeorm-ex.decorator";
import { AuthCredentialsDto } from "./dto/auth-credential.dto";
import { ConflictException, InternalServerErrorException, UnauthorizedException } from "@nestjs/common";
import * as bcrypt from 'bcryptjs';
import { JwtService } from "@nestjs/jwt";

@CustomRepository(User)
export class UserRepository extends Repository<User> {
    

    async login(authCredentialsDto: AuthCredentialsDto, jwtService: JwtService) : Promise<{accessToken: string}> {
        const { username,password } = authCredentialsDto;
        const user = await this.findOne({ where: { username } });
        
        if (user && (await bcrypt.compare(password, user.password))) {
            const payload = { username };
            const accessToken = jwtService.sign(payload);
            return { accessToken };
        } else {
            throw new UnauthorizedException("로그인 실패");
        }
    }


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