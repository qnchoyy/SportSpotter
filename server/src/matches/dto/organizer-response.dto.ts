import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OrganizerResponseDto {
  @Expose()
  id: string;

  @Expose()
  username: string;

  @Expose()
  firstName: string;

  @Expose()
  lastName: string;
}
