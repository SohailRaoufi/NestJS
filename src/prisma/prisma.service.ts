import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()   // PrismaClient is class we extends to use features of database.
export class PrismaService extends PrismaClient {
    constructor(config: ConfigService){
        super({
            datasources: {
                db:{
                    url:config.get("DATABASE_URL")
                }
            }
        })
    }
    
    
}
