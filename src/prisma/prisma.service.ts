import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()   // PrismaClient is class we extends to use features of database.
export class PrismaService extends PrismaClient {
    constructor(){
        super({
            datasources: {
                db:{
                    url:"file:./dev.db"
                }
            }
        })
    }
}
