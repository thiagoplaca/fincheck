import { ArgumentMetadata, ParseUUIDPipe } from '@nestjs/common';

export class OptionalParseUUIDPipe extends ParseUUIDPipe {
  override async transform(
    value: string | undefined,
    metadata: ArgumentMetadata,
  ): Promise<any> {
    if (!value) {
      return undefined;
    }
    return super.transform(value, metadata);
  }
}
