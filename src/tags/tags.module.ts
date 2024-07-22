import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { TagController } from './application/controllers/tag.controller';
import { Tag, TagSchema } from './infrastructure/schema/tag.schema';
import { UtilModule } from 'src/utils/utils.module';
import { TagService } from './domain/services/tag.service';
import { TagDAO } from './infrastructure/daos/tag.dao';
@Module({
  controllers: [TagController],
  providers: [
    // Services
    TagService,
    // Repository
    {
      provide: 'TagRepository',
      useClass: TagDAO
    }
    // Converters

    // Transcription Scripts

    // Activities TS
  ],
  imports: [
    MongooseModule.forFeature([{ name: Tag.name, schema: TagSchema }]),
    UtilModule
  ]
})

export class TagsModule { }
