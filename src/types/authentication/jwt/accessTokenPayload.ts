import { JwtPayload } from 'jwt-decode';
import { RoleEnum } from '../../roles/roleEnum';

export interface AccessTokenPayload extends JwtPayload {
  user_id: string;
  user_role?: RoleEnum;
}
