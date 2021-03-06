import { BaseResponse } from "./general";

export interface PlayerDetailsResponse extends BaseResponse {
    data: PlayerDetails[];
}

interface StatisticDetails {
    spotted: number;
    battles_on_stunning_vehicles: number;
    avg_damage_blocked: number;
    direct_hits_received: number;
    explosion_hits: number;
    piercings_received: number;
    piercings: number;
    xp: number;
    survived_battles: number;
    dropped_capture_points: number;
    hits_percents: number;
    draws: number;
    battles: number;
    damage_received: number;
    avg_damage_assisted: number;
    avg_damage_assisted_track: number;
    frags: number;
    stun_number: number;
    avg_damage_assisted_radio: number;
    capture_points: number;
    stun_assisted_damage: number;
    hits: number;
    battle_avg_xp: number;
    wins: number;
    losses: number;
    damage_dealt: number;
    no_damage_direct_hits_received: number;
    shots: number;
    explosion_hits_received: number;
    tanking_factor: number;
}

interface PlayerStatistic {
    clan: StatisticDetails;
    all: StatisticDetails;
    regular_team: StatisticDetails;
    stronghold_skirmish: StatisticDetails;
    stronghold_defense: StatisticDetails;
    historical: StatisticDetails;
    team: StatisticDetails;
    trees_cut: number;
}

export interface PlayerDetails {
    client_language: string;
    last_battle_time: number;
    account_id: number;
    created_at: number;
    updated_at: number;
    global_rating: number;
    clan_id: number;
    statistics: PlayerStatistic;
    nickname: string;
    logout_at: number;
}