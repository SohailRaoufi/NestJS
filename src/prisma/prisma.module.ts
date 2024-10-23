import { Global, Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
@Global() // this make it to avaliable to all modules
@Module({
  providers: [PrismaService],
  exports: [PrismaService] // we are exporting to be avaliable in other modules.
})
export class PrismaModule {}
