import { Field, InputType } from '@nestjs/graphql';
import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

@InputType('CreateUserInput')
export class CreateUserInputDTO {
  @Field()
  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g, {
    message: 'Invalid e-mail format'
  })
  email!: string;

  @Field()
  @IsString()
  @MinLength(5)
  @MaxLength(32)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Sua senha precisa ter pelo menos os seguintes caracteres: numero, letra minuscula/maiuscula, e um caractere especial.'
  })
  password!: string;
}
