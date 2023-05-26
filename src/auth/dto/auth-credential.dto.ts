import { IsNotEmpty, IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialsDto {
    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @IsNotEmpty()
    //영어랑 숫자만 가능한 유효성 체크
    @Matches(/^[a-zA-Z0-9]*$/, {message: "비밀번호는 영어와 숫자만 허용됩니다."})
    password: string;
}