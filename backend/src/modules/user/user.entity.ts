import {BaseEntity, Column, Entity, ObjectID, ObjectIdColumn} from 'typeorm';
import * as crypto from 'crypto';

@Entity({name: 'users'})
export class UserEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;

    @Column({
        length: 50
    })
    public username: string;

    @Column({
        length: 250,
        select: false,
    })
    public password_hash: string;

    /** Only storing hashed password */
    set password(password: string)
    {
        const passHash = crypto.createHmac('sha256', password).digest('hex');
        this.password_hash = passHash;
    }
} 