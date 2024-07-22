import { Module } from '@nestjs/common';
import { StringUtil } from './string-util';
import { DateUtil } from './date-util';
import { FilterUtil } from './filter-util';
import { RandomUtils } from './random-utils';

@Module({
  providers: [StringUtil, DateUtil, FilterUtil],
  exports: [StringUtil, DateUtil, FilterUtil],
})

export class UtilModule { }
