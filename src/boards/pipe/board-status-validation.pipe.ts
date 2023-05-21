import {  BadRequestException, PipeTransform } from "@nestjs/common";
import { BoardStatus } from "../boards.model";

export class BoardStatusValidationPipe implements PipeTransform {
    readonly StatusOptions = [
        BoardStatus.PRIVATE,
        BoardStatus.PUBLIC
    ]
    transform(value: any) {
        value = value.toUpperCase();

        if(!this.isStatusValid(value)) {
            throw new BadRequestException(`${value}는 없는 상태값입니다.`);
        }
        return value;
    }

    private  isStatusValid(status: any) {
        const index = this.StatusOptions.indexOf(status);
        return index !== -1
    }
}