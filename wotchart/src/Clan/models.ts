enum ResponseStatus {
    ok
}

interface ResponseMeta {
    count: number;
    total: number;
}

interface Response {
    status: ResponseStatus;
    meta: ResponseMeta;
}

export interface ClanDetailsRequest {
    application_id: string;
    clan_id: string;
}

export interface ClanDetailsResponse extends Response {
    data: ClanDetails[];
}

export interface ClanDetails {
    accepts_join_requests: boolean;
    clan_id: number;
    color: 	string;
    created_at:	Date;
    creator_id: number;
    creator_name: string;
    description: string;
    description_html: string;
    is_clan_disbanded: boolean;
    leader_id: number;
    leader_name: string;
    members_count: number;
    motto: string;
    name: string;
    old_name: string;
    old_tag: string;
    renamed_at: Date;
    tag: string;
    updated_at: Date;
    emblems: ClanDetailsEmblems;
    members: ClanDetailsMember[];
}

export interface ClanDetailsEmblems {
    x195: object;
    x24: object;
    x256: object;
    x32: object;
    x64: object;
}

export interface ClanDetailsMember {
    account_id:	number;
    account_name: string;
    joined_at: number;
    role: string;
    role_i18n: string;
}
