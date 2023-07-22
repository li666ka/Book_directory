import { JwtPayload } from 'jsonwebtoken';

export interface JwtPayloadExt extends JwtPayload {
	userId: number;
	username: string;
	role: string;
}

/*
 * random md5 hash
 */
export const JWT_SECRET = `
	e74bde28360aeb09a3f1b05ede2847ef
	d2e1e560d44c1248bd58596d0d3b1d54
	017e72575aab7e4c3a98e9aa67d5a591
	2af1cec9e720e524337709ede83777f0
	f8048ca770fe513f0a7f11ecca684155
	ff54580dd5f998d6582e7424b7a0c48f
	ecfbabaeba73de19c78b47da5020859a
	895f638aeb6b277f160497365158049e
	a9ac126ea84c4e14138a5bbd66fb80c4
	a4c545355cd223b12a9842864e662a52`;
