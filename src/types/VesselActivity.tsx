interface VesselActivity {
    imoNumber: string;
    mmsi: string;
    vesselName: string;
    loa: string;
    terminal: string;
    ata: string;
    atb: string;
    atu: string;
    atd: string;
    waitingHoursAtBerth: number;
    waitingHoursInAnchorage: number;
    berthingHours: number;
    inPortHours: number;
}

export default VesselActivity;
