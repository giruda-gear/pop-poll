import { User } from "@database";
import { EntityManager } from "@mikro-orm/core";
import { Injectable } from "@nestjs/common";

@Injectable()
export class UserService {
    constructor(private readonly em:EntityManager) {}

    async findOne(id: number): Promise<User | null> {
        return this.em.findOne(User, {id});
    }   
}