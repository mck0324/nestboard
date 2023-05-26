import { Injectable } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { AuthCredentialsDto } from './dto/auth-credential.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}
    async signIn(authCredentialsDto: AuthCredentialsDto,jwtService: JwtService): Promise<{accessToken: string}> {
        return this.userRepository.login(authCredentialsDto, this.jwtService);
    } 

    async signUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }
}
 