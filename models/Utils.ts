import * as jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

export class Utils {

    public validateAuthToken(token: String) {
        try {
            const jwtSK = process.env.JWT_SECRET_KEY;
            const verified = jwt.verify(token, jwtSK);
            return verified;
        } catch (e) {
            return false;
        }
    }
}