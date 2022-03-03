import { CanActivate, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { UserService } from '../../user/user.service';
import jwt from 'jsonwebtoken';
import { Console } from 'console';
@Injectable()
export class WsGuard implements CanActivate {
  constructor(private userService: UserService) {}

  canActivate(
    context: any,
  ): boolean | any | Promise<boolean | any> | Observable<boolean | any> {
    const bearerToken =
      context.args[0].handshake.headers.authorization.split(' ')[1];
    try {
      const decoded = jwt.verify(bearerToken, 'secret') as any;
      return new Promise((resolve, reject) => {
        return this.userService.getUserById(decoded._id).then((user) => {
          if (user) {
            resolve(user);
          } else {
            reject(false);
          }
        });
      });
    } catch (ex) {
      return false;
    }
  }
}
