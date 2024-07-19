import {Column} from "typeorm";
import PersonalInfo from "@tripolite/common/models/personal-info";

export default class PersonalInfoEntity implements PersonalInfo {

    @Column()
    name: string;

    @Column()
    email: string;

    @Column()
    phone: string;
}
