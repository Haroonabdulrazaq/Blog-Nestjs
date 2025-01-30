import {
  forwardRef,
  Inject,
  Injectable,
  OnModuleInit,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { OAuth2Client } from 'google-auth-library';
import jwtConfig from 'src/auth/config/jwt.config';
import { GoogleTokenDto } from '../dto/google-token.dto';
import { UsersService } from 'src/users/providers/users.service';
import { GenerateTokensProvider } from 'src/auth/providers/generate-tokens.provider';

@Injectable()
export class GoogleAuthenticationService implements OnModuleInit {
  private oauthClient: OAuth2Client;
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
    private readonly generateTokensProvider: GenerateTokensProvider,
  ) {}

  onModuleInit() {
    const clientId = this.jwtConfiguration.googleClientId;
    const clientSecret = this.jwtConfiguration.googleClientSecret;

    this.oauthClient = new OAuth2Client(clientId, clientSecret);
  }

  public async authenticate(googleTokenDto: GoogleTokenDto) {
    try {
      // verify the Google Token
      const loginTicket = await this.oauthClient.verifyIdToken({
        idToken: googleTokenDto.token,
      });

      // Extract the user payload from Google JWT
      const {
        email,
        sub: googleId,
        given_name: firstname,
        family_name: lastname,
      } = loginTicket.getPayload();
      console.log(firstname, lastname);
      // Find the user in the database using Google Id
      const user = await this.usersService.findOneByGoogleId(googleId);
      // if googleId exist generate token
      if (user) {
        return await this.generateTokensProvider.generateTokens(user);
      } else {
        // If not create a new user and generate the tokens
        const newUser = await this.usersService.createGoogleUser({
          email: email,
          firstname: firstname,
          lastname: lastname,
          googleId: googleId,
        });
        return await this.generateTokensProvider.generateTokens(newUser);
      }
      // if not generate a new user and then generate token
      // throw unAuthorised if any of the steps fails
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
