import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'
import { Orpen, OrpenSchema } from './schemas/orpen.schema';
import { OrpenRepository } from './orpen.repository';
import { OrpenService } from './orpen.service';
import { OrpenController } from './orpen.controller';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Orpen.name, schema: OrpenSchema },
    ])
  ],
  providers: [
    OrpenService,
    OrpenRepository,

  ],
  controllers: [OrpenController]
})
export class OrpenModule {}