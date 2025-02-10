/* eslint-disable */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import DeckGL from "@deck.gl/react";
import { Layer, PickingInfo } from "@deck.gl/core";
import StaticMap from "react-map-gl";
import { IconLayer, PathLayer, PolygonLayer } from "deck.gl";
import { PathStyleExtension } from "@deck.gl/extensions";
import { easeCubic } from "d3-ease";
import _ from "lodash";
import { FlyToInterpolator } from "deck.gl";
import Image from "next/image";
import vesselMarker from "@/resources/map/vessel_marker.png";
import SearchBar from "@/components/Searchbar";
import vesselPingData from "@/data/example/VesselPing.json";
import { VesselIcon } from "@/resources/dashboard";
import FloatingActionButton from "@/components/VesselInformationFloatingActionButton";
import PortServiceFAB from "@/components/PortServiceLevelFloatingActionButton";
import VesselActivityTable from "@/components/VesselActivityTable";
import VesselActivitySingle from "@/components/VesselActivitySingle";
import TimeSlider from "@/components/TimeSlider";
import VesselActivitySingleWithArrow from "@/components/VesselActivitySingleWithArrow";
import MapControls from "./MapControls";
import PortServiceTable from "./PortServiceTable";
import VesselInfoPanel from "./VesselInfoPanel";

import type VesselActivity from "@/types/VesselActivity";
import type { PortServiceCategory, PortServiceData } from "@/types/PortService";
import type { FilterState } from "@/types/Filters";
import type VesselData from "@/types/VesselData";
import type VesselMarker from "@/types/VesselMarker";
import type ViewState from "@/types/ViewState";
import type { TimeRange } from "@/components/PortServiceLevelFloatingActionButton";

import knownAreas from "@/data/knownAreas.json";
import separation from "@/data/seamark_separation.json";
import vesselActivityData from "@/data/example/VesselActivity.json";
import singleVesselActivityData from "@/data/example/VesselActivitySingle.json";
import portServiceLevelData from "@/data/example/PortServiceLevel.json";
import {
    createTerminalLayer,
    Terminal,
    fetchTerminalData,
} from "./TerminalLayer";

interface MapProps {
    mapStyle?: string;
    initialViewState?: any;
}

interface PortServiceFabState {
    isExpanded: boolean;
    timeRanges?: TimeRange[];
    selectedFilters?: string[];
}

interface TooltipInfo {
    object: any;
    x: number;
    y: number;
    layer: string;
}

interface MapProps {
    mapStyle?: string;
    initialViewState?: any;
}

interface FabState {
    isExpanded: boolean;
    startDate?: Date;
    endDate?: Date;
    selectedFilters: FilterState;
}

/**
 * A temporary notification that will appear at the bottom of the screen
 * when the user tries to view a vessel's trajectory but no data is available
 * for that vessel.
 *
 * @param {{ message: string }} props
 * @prop {string} message The name of the vessel that lacks trajectory data.
 */
const ErrorToast: React.FC<{ message: string }> = ({ message }) => {
    //Error Toast
    return (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-lg z-[9999] animate-fade-in">
            <span>No trajectory data available for {message}</span>
        </div>
    );
};

const MapWithSearchBar: React.FC<MapProps> = ({
    mapStyle = "mapbox://styles/mapbox/light-v10",
    initialViewState = {
        longitude: 103.8198,
        latitude: 1.3521,
        zoom: 11,
        pitch: 0,
        bearing: 0,
    },
}) => {
    const MAPBOX_ACCESS_TOKEN = process.env.NEXT_PUBLIC_MAPBOX;
    const [viewState, setViewState] = useState(initialViewState);
    const [vessels, setVessels] = useState<VesselMarker[]>([]);
    const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
    const [activeVessel, setActiveVessel] = useState<VesselData | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeLayers, setActiveLayers] = useState({
        anchorages: true,
        fairways: true,
        separation: true,
        //vessels: true,
        terminals: true,
    });
    const [focusVessel, setFocusVessel] = useState<VesselMarker | null>(null);
    const [vesselData, setVesselData] = useState<VesselActivity[] | null>(null);
    const [showVesselTable, setShowVesselTable] = useState(false);
    const [showPortServiceTable, setShowPortServiceTable] = useState(false);
    const [portServiceData, setPortServiceData] =
        useState<PortServiceData | null>(null);
    const [showVesselInfo, setShowVesselInfo] = useState(false);
    const [timelineData, setTimelineData] = useState<any[]>([]);
    const [selectedVessel, setSelectedVessel] = useState<VesselActivity | null>(
        null
    );
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [currentPosition, setCurrentPosition] = useState<
        [number, number] | null
    >(null);
    const [vesselPath, setVesselPath] = useState<any[]>([]);
    const [isPlaying, setIsPlaying] = useState(false);
    const [currentTime, setCurrentTime] = useState<Date | null>(null);
    const [currentHeading, setCurrentHeading] = useState<number>(0);
    const [fabStates, setFabStates] = useState({
        vesselInfo: {
            isExpanded: false,
            startDate: undefined as Date | undefined,
            endDate: undefined as Date | undefined,
            selectedFilters: {} as FilterState,
        },
        portService: {
            isExpanded: false,
            timeRanges: [] as TimeRange[],
            selectedFilters: [] as string[],
        },
    });
    const [vesselInfoSource, setVesselInfoSource] = useState<
        "fab" | "direct" | null
    >(null);
    const [dateRange, setDateRange] = useState<{
        startDate: Date;
        endDate: Date;
    } | null>(null);

    const [layerMenuOpen, setLayerMenuOpen] = useState(false);
    const [terminalData, setTerminalData] = useState<Terminal[]>([]);

    useEffect(() => {
        const loadTerminalData = async () => {
            const data = await fetchTerminalData();

            setTerminalData(data);
        };
        loadTerminalData();
    }, []);

    useEffect(() => {
        //NOTE: REPLACE THIS WHEN ACTUAL BACKEND IS UP
        const fetchVesselData = async () => {
            try {
                const response = await fetch("/api/data/vessel_activity", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        startDate: "2024-10-01T00:00:00",
                        endDate: "2024-11-30T23:59:59",
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const rawData = await response.json();

                if (rawData.success && Array.isArray(rawData.data)) {
                    const transformedData: VesselMarker[] = rawData.data.map(
                        (vessel: any) => ({
                            vesselName: vessel.vesselname,
                            imoNumber: vessel.imonumber.toString(),
                            mmsi: vessel.mmsinumber.toString(),
                            loa: vessel.vessellength.toString(),
                            lastLocation: vessel.terminal || "Unknown",
                            // Since actual coordinates aren't provided in the API response for now,
                            // we'll set default coordinates for Singapore
                            longitude: 103.8198, // Default Singapore longitude
                            latitude: 1.3521, // Default Singapore latitude
                            bearing: 0, // Default bearing
                        })
                    );

                    setVessels(transformedData);
                } else {
                    throw new Error("Invalid data structure received from API");
                }
            } catch (error) {
                console.error("Error fetching vessel data:", error);
                // Fallback to example data if API call fails
                const typedVesselData = vesselPingData as VesselMarker[];
                setVessels(typedVesselData);
            }
        };

        fetchVesselData();
    }, []);

    useEffect(() => {
        setVesselData(vesselActivityData);
    }, []);

    useEffect(() => {
        let animationFrame: number;

        if (isPlaying && timelineData.length > 0) {
            const startTimestamp = new Date(
                timelineData[0].timestamp
            ).getTime();
            const endTimestamp = new Date(
                timelineData[timelineData.length - 1].timestamp
            ).getTime();
            const totalDuration = endTimestamp - startTimestamp;

            // Adjust to get correct speed
            const ANIMATION_DURATION = 30000; // 30 seconds to complete full timeline
            const timeIncrement = totalDuration / (ANIMATION_DURATION / 16); // 16ms is for 60fps

            const animate = () => {
                setCurrentTime((prevTime) => {
                    if (!prevTime) return new Date(startTimestamp);

                    const nextTime = new Date(
                        prevTime.getTime() + timeIncrement
                    );

                    if (nextTime.getTime() >= endTimestamp) {
                        setIsPlaying(false);
                        return new Date(endTimestamp);
                    }

                    updateVesselPosition(nextTime);
                    return nextTime;
                });

                animationFrame = requestAnimationFrame(animate);
            };

            animationFrame = requestAnimationFrame(animate);
        }

        return () => {
            if (animationFrame) {
                cancelAnimationFrame(animationFrame);
            }
        };
    }, [isPlaying, timelineData]);

    // Process GeoJSON data
    const anchorages = knownAreas.features.filter(
        (feature) => feature.properties.seamark_type === "Anchorage"
    );
    const fairways = knownAreas.features.filter(
        (feature) => feature.properties.seamark_type === "Fairway/Channel"
    );
    const mooringAreas = knownAreas.features.filter(
        (feature) => feature.properties.seamark_type === "Mooring Area"
    );

    const onViewStateChange = ({ viewState }: any) => {
        setViewState(viewState);
    };
    const handleVesselInfoFabToggle = (isExpanded: boolean, data?: any) => {
        setFabStates((prev) => ({
            ...prev,
            vesselInfo: {
                ...prev.vesselInfo,
                isExpanded,
                ...(data || {}),
            },
            // Close port service FAB when vessel info FAB is expanded
            portService: {
                ...prev.portService,
                isExpanded: isExpanded ? false : prev.portService.isExpanded,
            },
        }));
    };

    const handlePortServiceFabToggle = (isExpanded: boolean, data?: any) => {
        setFabStates((prev) => ({
            ...prev,
            portService: {
                ...prev.portService,
                isExpanded,
                ...(data || {}),
            },
            // Close vessel info FAB when port service FAB is expanded
            vesselInfo: {
                ...prev.vesselInfo,
                isExpanded: isExpanded ? false : prev.vesselInfo.isExpanded,
            },
        }));
    };

    const handleVesselDataUpdate = (
        data: VesselActivity[] | null,
        fabData?: any
    ) => {
        if (data && fabData?.filterValues) {
            setVesselData(data);
        } else {
            setVesselData(data);
        }
        setShowVesselTable(!!data);
        setShowPortServiceTable(false);

        if (fabData) {
            handleVesselInfoFabToggle(fabData.isExpanded, {
                startDate: fabData.startDate
                    ? new Date(fabData.startDate)
                    : undefined,
                endDate: fabData.endDate
                    ? new Date(fabData.endDate)
                    : undefined,
                selectedFilters: fabData.filterValues || {},
            });
        }

        if (!!data) {
            setShowVesselInfo(false);
            setSelectedVessel(null);
            setTimelineData([]);
        }
    };

    const validateRange = (
        value: any,
        additionalValue: any,
        fieldValue: number
    ): boolean => {
        // Convert empty strings or undefined to defaults (0 for min, Infinity for max)

        const min = value === "" || value === undefined ? 0 : Number(value);
        const max =
            additionalValue === "" || additionalValue === undefined
                ? Infinity
                : Number(additionalValue);

        // Simple range check
        return fieldValue >= min && fieldValue <= max;
    };

    const applyFilters = (data: VesselActivity[], filters: FilterState) => {
        return data.filter((vessel) => {
            return Object.entries(filters).every(([key, filterValue]) => {
                // For range filters, we should check both value and additionalValue
                const value = filterValue.value;
                const additionalValue = filterValue.additionalValue;

                // Only skip if both values are empty for range filters
                if (
                    key === "loa" ||
                    key === "preBerthingHours" ||
                    key === "anchorageWaitingHours" ||
                    key === "berthingHours" ||
                    key === "inPortHours"
                ) {
                    if (!value && !additionalValue) return true;
                } else {
                    // For non-range filters, keep existing behavior
                    if (!value) return true;
                }

                switch (key) {
                    case "vesselName":
                        return vessel.vesselName
                            .toLowerCase()
                            .includes((value as string).toLowerCase());

                    case "imoNumber":
                        return vessel.imoNumber.toString() === value.toString();

                    case "mmsi":
                        return vessel.mmsi.toString() === value.toString();

                    case "loa":
                        return validateRange(
                            value,
                            filterValue.additionalValue,
                            Number(vessel.loa)
                        );

                    case "terminal":
                        return vessel.terminal === value;

                    case "multipleRecords":
                        const minRecords = Number(value);
                        const occurences = data.filter(
                            (v) =>
                                v.vesselName.toLowerCase() ===
                                vessel.vesselName.toLowerCase()
                        ).length;
                        return occurences >= minRecords;

                    case "ata":
                        if (value === "true") return !!vessel.ata;
                        if (value === "false") return !vessel.ata;
                        return true;

                    case "atb":
                        if (value === "true") return !!vessel.atb;
                        if (value === "false") return !vessel.atb;
                        return true;

                    case "atu":
                        if (value === "true") return !!vessel.atu;
                        if (value === "false") return !vessel.atu;
                        return true;

                    case "atd":
                        if (value === "true") return !!vessel.atd;
                        if (value === "false") return !vessel.atd;
                        return true;

                    case "preBerthingHours":
                        return validateRange(
                            value,
                            filterValue.additionalValue,
                            vessel.waitingHoursAtBerth
                        );

                    case "anchorageWaitingHours":
                        return validateRange(
                            value,
                            filterValue.additionalValue,
                            vessel.waitingHoursInAnchorage
                        );

                    case "berthingHours":
                        return validateRange(
                            value,
                            filterValue.additionalValue,
                            vessel.berthingHours
                        );

                    case "inPortHours":
                        return validateRange(
                            value,
                            filterValue.additionalValue,
                            vessel.inPortHours
                        );

                    default:
                        return true;
                }
            });
        });
    };
    const handleTableRowClick = async (vessel: VesselActivity) => {
        const vesselTimelineData = singleVesselActivityData.filter(
            (v) =>
                v.vesselName.toLowerCase() === vessel.vesselName.toLowerCase()
        );

        if (vesselTimelineData && vesselTimelineData.length > 0) {
            handleVesselInfoFabToggle(false);
            const initialPosition: [number, number] = [
                vesselTimelineData[0].longitude,
                vesselTimelineData[0].latitude,
            ];
            /*
            setViewState((prevState: ViewState) => ({
                ...prevState,
                longitude: initialPosition[0],
                latitude: initialPosition[1],
                zoom: 12,
                transitionDuration: 2000,
                transitionInterpolator: new FlyToInterpolator({
                    speed: 1.2,
                }),
                transitionEasing: easeCubic,
            }));
            */
            const pathData = [
                {
                    path: vesselTimelineData.map((point) => [
                        point.longitude,
                        point.latitude,
                    ]),
                    timestamps: vesselTimelineData.map(
                        (point) => new Date(point.timestamp)
                    ),
                },
            ];

            setVesselPath(pathData);
            setTimelineData(vesselTimelineData);
            setSelectedVessel(vessel);
            setCurrentPosition(initialPosition);
            setCurrentTime(new Date(vesselTimelineData[0].timestamp));

            if (vesselTimelineData.length > 1) {
                const initialHeading = calculateHeading(initialPosition, [
                    vesselTimelineData[1].longitude,
                    vesselTimelineData[1].latitude,
                ]);
                setCurrentHeading(initialHeading);
            }

            setVesselInfoSource("fab");
            setShowVesselTable(false);
            setShowVesselInfo(true);
        } else {
            setErrorMessage(`${vessel.vesselName}`);
            setTimeout(() => setErrorMessage(null), 3000);
        }
    };

    const handleUpArrowClick = () => {
        setShowVesselInfo(false);
        setVesselPath([]);
        setCurrentPosition(null);
        setCurrentTime(null);
        setIsPlaying(false);

        handleVesselInfoFabToggle(true, {
            selectedFilters: fabStates.vesselInfo.selectedFilters,
        });

        setShowVesselTable(true);
        handleVesselDataUpdate(vesselData, {
            isExpanded: true,
            selectedFilters: fabStates.vesselInfo.selectedFilters,
        });
        /*
        setViewState((prevState: ViewState) => ({
            ...prevState,
            zoom: 11,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator({
                speed: 1.2,
            }),
            transitionEasing: easeCubic,
        }));
        */
    };

    const calculateHeading = (point1: number[], point2: number[]): number => {
        const [lon1, lat1] = point1;
        const [lon2, lat2] = point2;

        // Calculate angle in degrees
        const dx = lon2 - lon1;
        const dy = lat2 - lat1;

        let angle = (Math.atan2(dy, dx) * 180) / Math.PI;

        // Convert to bearing (clockwise from north)
        angle = 90 - angle;
        if (angle < 0) angle += 360;

        return angle;
    };

    const handleVesselInfoClick = async (clickedVessel: VesselMarker) => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 1);

        setDateRange({ startDate, endDate });

        const initialFilters = {
            vesselName: {
                value: clickedVessel.vesselName,
                additionalValue: undefined,
            },
        };

        handleVesselInfoFabToggle(true, {
            startDate,
            endDate,
            selectedFilters: initialFilters,
        });

        const startDateString = `${
            startDate.toISOString().split("T")[0]
        }T00:00:00`;
        const endDateString = `${endDate.toISOString().split("T")[0]}T23:59:59`;

        setShowVesselTable(true);
        setSearchQuery("");

        try {
            const response = await fetch("/api/data/vessel_activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startDate: startDateString,
                    endDate: endDateString,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const rawData = await response.json();

            if (rawData.success && Array.isArray(rawData.data)) {
                const transformedData = rawData.data
                    .map((vessel: any) => ({
                        vesselName: vessel.vesselname,
                        imoNumber: vessel.imonumber.toString(),
                        mmsi: vessel.mmsinumber.toString(),
                        loa: vessel.vessellength.toString(),
                        terminal: vessel.terminal,
                        ata: vessel.ata || "unavailable",
                        atb: vessel.atb || "unavailable",
                        atu: vessel.atu || "unavailable",
                        atd: vessel.atd || "unavailable",
                        waitingHoursAtBerth:
                            vessel.PreBerthingHours === "unavailable"
                                ? 0
                                : vessel.PreBerthingHours,
                        waitingHoursInAnchorage:
                            vessel.AnchorageWaitingHours === "unavailable"
                                ? 0
                                : vessel.AnchorageWaitingHours,
                        berthingHours:
                            vessel.BerthingHours === "unavailable"
                                ? 0
                                : vessel.BerthingHours,
                        inPortHours:
                            vessel.InPortHours === "unavailable"
                                ? 0
                                : vessel.InPortHours,
                    }))

                    .filter(
                        (vessel: VesselActivity) =>
                            vessel.vesselName.toLowerCase() ===
                            clickedVessel.vesselName.toLowerCase()
                    );

                handleVesselDataUpdate(transformedData, {
                    isExpanded: true,
                    startDate,
                    endDate,
                    filterValues: initialFilters,
                });
            } else {
                throw new Error("Invalid data structure received from API");
            }
        } catch (error) {
            console.error("Error fetching vessel activity data:", error);
            // Fallback to example data if API call fails
            const filteredExampleData = vesselActivityData.filter(
                (vessel) =>
                    vessel.vesselName.toLowerCase() ===
                    clickedVessel.vesselName.toLowerCase()
            );
            handleVesselDataUpdate(filteredExampleData, {
                isExpanded: true,
                startDate,
                endDate,
                filterValues: initialFilters,
            });
        }
    };

    const handleVesselClick = async (
        clickedVessel: VesselMarker,
        viewStateCallback?: () => void
    ) => {
        setShowVesselTable(false);

        //Replace with API call in the future
        const freshVesselData = vesselActivityData;

        if (freshVesselData) {
            const vesselDetails = freshVesselData.find(
                (v) =>
                    v.vesselName.toLowerCase() ===
                    clickedVessel.vesselName.toLowerCase()
            );

            if (vesselDetails) {
                const vesselTimelineData = singleVesselActivityData.filter(
                    (v) =>
                        v.vesselName.toLowerCase() ===
                        clickedVessel.vesselName.toLowerCase()
                );

                if (vesselTimelineData && vesselTimelineData.length > 0) {
                    // Create path data from timeline coordinates
                    const pathData = [
                        {
                            path: vesselTimelineData.map((point) => [
                                point.longitude,
                                point.latitude,
                            ]),
                            timestamps: vesselTimelineData.map(
                                (point) => new Date(point.timestamp)
                            ),
                        },
                    ];
                    setVesselPath(pathData);
                    // Calculate Heading
                    const initialHeading =
                        vesselTimelineData.length > 1
                            ? calculateHeading(
                                  [
                                      vesselTimelineData[0].longitude,
                                      vesselTimelineData[0].latitude,
                                  ],
                                  [
                                      vesselTimelineData[1].longitude,
                                      vesselTimelineData[1].latitude,
                                  ]
                              )
                            : 0;

                    setCurrentHeading(initialHeading);

                    // Set initial position to first point
                    setCurrentPosition([
                        vesselTimelineData[0].longitude,
                        vesselTimelineData[0].latitude,
                    ]);
                    setCurrentTime(new Date(vesselTimelineData[0].timestamp));
                }

                if (!vesselTimelineData || vesselTimelineData.length === 0) {
                    setErrorMessage(clickedVessel.vesselName);
                    setTimeout(() => setErrorMessage(null), 3000);
                    return;
                }
                const enrichedVesselDetails = {
                    ...vesselDetails,
                    lastLocation: clickedVessel.lastLocation,
                };

                setSelectedVessel(enrichedVesselDetails);
                setTimelineData(vesselTimelineData);
                setVesselInfoSource("direct");
                setShowVesselInfo(true);

                viewStateCallback?.();
            } else {
                const basicVesselDetails = {
                    vesselName: clickedVessel.vesselName,
                    imoNumber: clickedVessel.imoNumber,
                    mmsi: clickedVessel.mmsi,
                    loa: clickedVessel.loa,
                    lastLocation: clickedVessel.lastLocation,
                    terminal: "N/A",
                    ata: new Date().toISOString(),
                    atb: new Date().toISOString(),
                    atu: new Date().toISOString(),
                    atd: new Date().toISOString(),
                    waitingHoursAtBerth: 0,
                    waitingHoursInAnchorage: 0,
                    berthingHours: 0,
                    inPortHours: 0,
                };

                setSelectedVessel(basicVesselDetails);
            }
        }
    };

    const createHoverHandler =
        (layerName: string) => (info: PickingInfo & { layer: Layer<any> }) => {
            if (info.object) {
                setTooltipInfo({
                    object: info.object,
                    x: info.x,
                    y: info.y,
                    layer: layerName,
                });
            } else {
                setTooltipInfo(null);
            }
        };

    const handleZoomIn = () => {
        setViewState((prevState: ViewState) => ({
            ...prevState,
            zoom: prevState.zoom + 1,
            transitionDuration: 300,
        }));
    };

    const handleZoomOut = () => {
        setViewState((prevState: ViewState) => ({
            ...prevState,
            zoom: prevState.zoom - 1,
            transitionDuration: 300,
        }));
    };

    const handlePortServiceDataUpdate = (
        data: PortServiceData | null,
        fabData?: {
            isExpanded: boolean;
            timeRanges?: TimeRange[];
            selectedFilters?: string[];
        }
    ) => {
        setPortServiceData(data);
        setShowPortServiceTable(!!data);

        if (fabData) {
            handlePortServiceFabToggle(fabData.isExpanded, {
                timeRanges: fabData.timeRanges,
                selectedFilters: fabData.selectedFilters,
            });
        }

        if (!!data) {
            setShowVesselTable(false);
            setVesselData(null);
        }
    };

    const matchesVesselSearch = (
        vessel: VesselMarker,
        searchTerm: string
    ): boolean => {
        if (!searchTerm) return true;
        const search = searchTerm.toLowerCase().trim();

        return (
            vessel.vesselName.toLowerCase().includes(search) ||
            vessel.imoNumber.toLowerCase().includes(search) ||
            vessel.mmsi.toLowerCase().includes(search)
        );
    };

    const filteredVessels = useMemo(() => {
        if (!searchQuery) return vessels;
        return vessels.filter((vessel) =>
            matchesVesselSearch(vessel, searchQuery)
        );
    }, [vessels, searchQuery]);

    const handleSearch = (query: string) => {
        setSearchQuery(query);

        if (query) {
            const matchedVessels = vessels.filter((vessel) =>
                matchesVesselSearch(vessel, query)
            );

            if (matchedVessels.length > 0) {
                // Set the focus vessel instead of updating viewState directly
                const vessel = matchedVessels[0];
                setFocusVessel(matchedVessels[0]);

                setActiveVessel({
                    mmsi: matchedVessels[0].mmsi,
                    shipname: matchedVessels[0].vesselName,
                    shiptype: "",
                    longitude: matchedVessels[0].longitude,
                    latitude: matchedVessels[0].latitude,
                    speed: 0,
                    heading: matchedVessels[0].bearing,
                    course: matchedVessels[0].bearing,
                });
                /*
                setViewState((prevState: ViewState) => ({
                    ...prevState,
                    longitude: vessel.longitude,
                    latitude: vessel.latitude,
                    zoom: 13,
                    transitionDuration: 2000,
                    transitionInterpolator: new FlyToInterpolator({
                        speed: 1.2,
                    }),
                    transitionEasing: easeCubic,
                }));
                */
            }
        } else {
            setFocusVessel(null);
            setActiveVessel(null);
        }
    };

    const SearchResultsCount = ({
        count,
        total,
    }: {
        count: number;
        total: number;
    }) => {
        if (!searchQuery) return null;

        return (
            <div className="bg-white px-4 py-2 rounded-full shadow-lg">
                Found {count} vessels of {total}
            </div>
        );
    };

    const handleCloseVesselInfo = () => {
        setShowVesselInfo(false);
        setVesselPath([]);
        setCurrentPosition(null);
        setCurrentTime(null);
        setIsPlaying(false);
        setFocusVessel(null);
        setActiveVessel(null);

        if (searchQuery) {
            const matchedVessels = vessels.filter((vessel) =>
                matchesVesselSearch(vessel, searchQuery)
            );
            /*
            if (matchedVessels.length > 0) {
                setViewState((prevState: ViewState) => ({
                    ...prevState,
                    zoom: 13,
                    transitionDuration: 2000,
                    transitionInterpolator: new FlyToInterpolator({
                        speed: 1.2,
                    }),
                    transitionEasing: easeCubic,
                }));
            }
                */
        }
    };

    //Anchorage layer
    const anchorageLayer = new PolygonLayer({
        id: "anchorage",
        data: anchorages,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d) => d.geometry.coordinates[0],
        getFillColor: [0, 140, 255, 20],
        getLineColor: [0, 140, 255, 200],
        getLineWidth: 1,
        visible: activeLayers.anchorages,
        onHover: (info) => {
            const typedInfo = info as PickingInfo & { layer: Layer<any> };
            createHoverHandler("anchorage")(typedInfo);
        },
    });

    //Fairway layer
    const fairwayLayer = new PolygonLayer({
        id: "fairway",
        data: fairways,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d) => d.geometry.coordinates[0],
        getFillColor: [255, 140, 0, 20],
        getLineColor: [255, 140, 0, 200],
        getLineWidth: 1,
        visible: activeLayers.fairways,
        onHover: (info) => {
            const typedInfo = info as PickingInfo & { layer: Layer<any> };
            createHoverHandler("fairway")(typedInfo);
        },
    });

    const pathStyleExtension = new PathStyleExtension({ dash: true });

    //Separation layer
    const separationLayer = new PathLayer({
        id: "separation",
        data: separation,
        pickable: true,
        widthScale: 20,
        widthMinPixels: 2,
        getPath: (d) => d.coordinates,
        getColor: [128, 128, 128, 200],
        getWidth: 2,
        dashJustified: true,
        getDashArray: [8, 4],
        dashGapPickable: true,
        extensions: [pathStyleExtension],
        visible: activeLayers.separation,
        onHover: (info) => {
            const typedInfo = info as PickingInfo & { layer: Layer<any> };
            createHoverHandler("separation")(typedInfo);
        },
        parameters: {
            dashEnable: true,
        },
    });

    const terminalLayer = createTerminalLayer({
        data: terminalData,
        onHover: createHoverHandler("terminal"),
        visible: activeLayers.terminals,
    });

    /*Vessel layer
    const vesselLayer = new IconLayer({
        id: "vessels",
        data: showVesselInfo
            ? currentPosition
                ? [
                      {
                          ...selectedVessel,
                          longitude: currentPosition[0],
                          latitude: currentPosition[1],
                          bearing: currentHeading,
                      },
                  ]
                : []
            : filteredVessels,
        pickable: true,
        iconAtlas: vesselMarker.src,
        iconMapping: {
            marker: { x: 0, y: 0, width: 512, height: 512, mask: true },
        },
        getIcon: () => "marker",
        sizeScale: 1,
        getPosition: (d: VesselData) => [d.longitude, d.latitude],
        getSize: (d) => {
            if (showVesselInfo) return 20;
            return searchQuery && matchesVesselSearch(d, searchQuery) ? 30 : 20;
        },
        getColor: (d) => {
            if (showVesselInfo) return [255, 140, 0];
            if (activeVessel?.mmsi === d.mmsi) return [128, 128, 0];
            if (searchQuery && matchesVesselSearch(d, searchQuery))
                return [255, 69, 0];
            return [89, 109, 238];
        },
        getAngle: (d) => 360 - d.bearing,
        visible: activeLayers.vessels,
        onHover: createHoverHandler("vessel"),
        onClick: (info) => {
            if (info.object) {
                const vessel = info.object;
                handleVesselClick(vessel, () => {
                    setViewState((prevState: ViewState) => ({
                        ...prevState,
                        longitude: vessel.longitude,
                        latitude: vessel.latitude,
                        zoom: 10.5,
                        transitionDuration: 2000,
                        transitionInterpolator: new FlyToInterpolator({
                            speed: 1.2,
                        }),
                        transitionEasing: easeCubic,
                    }));
                });
            }
        },
    });
    */

    const vesselPathLayer = new PathLayer({
        id: "vessel-path",
        data: vesselPath,
        pickable: true,
        widthScale: 20,
        widthMinPixels: 2,
        getPath: (d) => d.path,
        getColor: [255, 140, 0, 200],
        getWidth: 2,
        dashJustified: true,
        getDashArray: [3, 2],
        extensions: [new PathStyleExtension({ dash: true })],
        parameters: {
            dashEnable: true,
        },
        visible: showVesselInfo,
    });

    const updateVesselPosition = (time: Date, isDragging: boolean = false) => {
        if (!vesselPath[0] || !time) return;

        const timestamps = vesselPath[0].timestamps;
        const path = vesselPath[0].path;

        // Find the two closest points in time
        const index = _.sortedIndex(timestamps, time);

        if (index === 0) {
            setCurrentPosition(path[0]);
            const heading = calculateHeading(path[0], path[1]);
            setCurrentHeading(heading);
        } else if (index >= timestamps.length) {
            setCurrentPosition(path[path.length - 1]);
            const heading = calculateHeading(
                path[path.length - 2],
                path[path.length - 1]
            );
            setCurrentHeading(heading);
        } else {
            const t0 = timestamps[index - 1].getTime();
            const t1 = timestamps[index].getTime();
            const t = time.getTime();

            // Use different interpolation based on whether dragging or playing
            const progress = isDragging
                ? (t - t0) / (t1 - t0) // Linear for dragging
                : easeCubic((t - t0) / (t1 - t0)); // Eased for playing

            const p0 = path[index - 1];
            const p1 = path[index];

            const newPosition = [
                p0[0] + (p1[0] - p0[0]) * progress,
                p0[1] + (p1[1] - p0[1]) * progress,
            ] as [number, number];

            setCurrentPosition(newPosition);

            // Set heading based on current segment direction
            const heading = calculateHeading(p0, p1);
            setCurrentHeading(heading);
        }
    };

    const handleShowAllClick = async () => {
        const endDate = new Date();
        const startDate = new Date(endDate);
        startDate.setMonth(startDate.getMonth() - 1);

        setDateRange({ startDate, endDate });
        handleVesselInfoFabToggle(true, {
            startDate,
            endDate,
            selectedFilters: {},
        });

        const startDateString = `${
            startDate.toISOString().split("T")[0]
        }T00:00:00`;
        const endDateString = `${endDate.toISOString().split("T")[0]}T23:59:59`;
        console.log(startDateString, endDateString);

        setShowVesselTable(true);
        setSearchQuery("");

        try {
            const response = await fetch("/api/data/vessel_activity", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    startDate: startDateString,
                    endDate: endDateString,
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const rawData = await response.json();
            if (rawData.success && Array.isArray(rawData.data)) {
                const transformedData = rawData.data.map((vessel: any) => ({
                    vesselName: vessel.vesselname,
                    imoNumber: vessel.imonumber.toString(),
                    mmsi: vessel.mmsinumber.toString(),
                    loa: vessel.vessellength.toString(),
                    terminal: vessel.terminal,
                    ata: vessel.ata || "unavailable",
                    atb: vessel.atb || "unavailable",
                    atu: vessel.atu || "unavailable",
                    atd: vessel.atd || "unavailable",
                    waitingHoursAtBerth:
                        vessel.PreBerthingHours === "unavailable"
                            ? 0
                            : vessel.PreBerthingHours,
                    waitingHoursInAnchorage:
                        vessel.AnchorageWaitingHours === "unavailable"
                            ? 0
                            : vessel.AnchorageWaitingHours,
                    berthingHours:
                        vessel.BerthingHours === "unavailable"
                            ? 0
                            : vessel.BerthingHours,
                    inPortHours:
                        vessel.InPortHours === "unavailable"
                            ? 0
                            : vessel.InPortHours,
                }));

                handleVesselDataUpdate(transformedData, {
                    isExpanded: true,
                    startDate,
                    endDate,
                    filterValues: {},
                });
            } else {
                throw new Error("Invalid data structure received from API");
            }
        } catch (error) {
            console.error("Error fetching vessel activity data:", error);
            // Fallback to example data if API call fails
            handleVesselDataUpdate(vesselActivityData, {
                isExpanded: true,
                startDate,
                endDate,
                filterValues: {},
            });
        }
    };
    const renderTooltip = () => {
        if (!tooltipInfo) return null;

        const { object, x, y, layer } = tooltipInfo;

        const getTooltipContent = () => {
            switch (layer) {
                case "anchorage":
                    return (
                        <>
                            <div className="font-semibold text-blue-600">
                                Anchorage Area
                            </div>
                            <div>
                                Name: {object.properties.name || "Unnamed"}
                            </div>
                            <div>Code: {object.properties.code || "N/A"}</div>
                            <div>
                                Sector: {object.properties.sector || "N/A"}
                            </div>
                        </>
                    );

                case "fairway":
                    return (
                        <>
                            <div className="font-semibold text-orange-600">
                                Fairway
                            </div>
                            <div>
                                Name: {object.properties.name || "Unnamed"}
                            </div>
                            <div>Type: {object.properties.seamark_type}</div>
                        </>
                    );

                case "lane":
                    return (
                        <>
                            <div className="font-semibold text-red-600">
                                Lane
                            </div>
                            <div>ID: {object.id}</div>
                            <div>Type: {object.seamark_type}</div>
                        </>
                    );

                case "mooringArea":
                    return (
                        <>
                            <div className="font-semibold text-green-600">
                                Mooring Area
                            </div>
                            <div>
                                Name: {object.properties.name || "Unnamed"}
                            </div>
                            <div>Code: {object.properties.code || "N/A"}</div>
                            <div>
                                Sector: {object.properties.sector || "N/A"}
                            </div>
                        </>
                    );

                case "separation":
                    return (
                        <>
                            <div className="font-semibold text-purple-600">
                                Separation Zone
                            </div>
                            <div>ID: {object.id}</div>
                            <div>Type: {object.seamark_type}</div>
                        </>
                    );
                case "vessel":
                    return (
                        <div className="bg-white rounded-lg min-w-[250px] shadow-lg overflow-hidden">
                            <div className="bg-[#5D5FEF] p-2 flex items-center gap-2">
                                <Image
                                    src={VesselIcon}
                                    alt="Vessel Icon"
                                    className="w-5 h-5"
                                />
                                <span className="font-semibold text-white">
                                    Vessel Information
                                </span>
                            </div>
                            <div className="p-3 space-y-2">
                                <div className="flex items-center gap-2">
                                    <span className="text-[#5D5FEF]">
                                        • Vessels Name
                                    </span>
                                    <span className="ml-auto text-black">
                                        {object.vesselName}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#5D5FEF]">
                                        • IMO
                                    </span>
                                    <span className="ml-auto text-black">
                                        {object.imoNumber}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#5D5FEF]">
                                        • MMSI
                                    </span>
                                    <span className="ml-auto text-black">
                                        {object.mmsi}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#5D5FEF]">
                                        • LOA
                                    </span>
                                    <span className="ml-auto text-black">
                                        {object.loa}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#5D5FEF]">
                                        • Manager
                                    </span>
                                    <span className="ml-auto text-black">
                                        Aleks
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-[#5D5FEF]">
                                        • Last Location
                                    </span>
                                    <span className="ml-auto text-black">
                                        {object.lastLocation}
                                    </span>
                                </div>
                            </div>
                        </div>
                    );
                case "terminal":
                    return (
                        <div className="bg-white rounded-lg shadow-lg border border-gray-200 p-4">
                            <div className="font-bold text-lg mb-2 text-blue-600">
                                {object.name}
                            </div>
                            <div className="space-y-1">
                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-600">
                                        Total Vessels:
                                    </span>
                                    <span className="font-medium">
                                        {object.stats.totalVessels}
                                    </span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-600">
                                        JIT Arrival:
                                    </span>
                                    <span className="font-medium">
                                        {object.stats.jitPercentage}%
                                    </span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-600">
                                        Avg Waiting:
                                    </span>
                                    <span className="font-medium">
                                        {object.stats.avgWaitingHours}h
                                    </span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-600">
                                        Avg Berthing:
                                    </span>
                                    <span className="font-medium">
                                        {object.stats.avgBerthingHours}h
                                    </span>
                                </div>
                                <div className="flex justify-between gap-4">
                                    <span className="text-gray-600">
                                        Utilization:
                                    </span>
                                    <span className="font-medium">
                                        {object.stats.utilization}%
                                    </span>
                                </div>
                            </div>
                        </div>
                    );

                default:
                    return null;
            }
        };

        const getBorderColor = () => {
            switch (layer) {
                case "anchorage":
                    return "#2563eb";
                case "fairway":
                    return "#ea580c";
                case "lane":
                    return "#dc2626";
                case "mooringArea":
                    return "#16a34a";
                case "separation":
                    return "#7c3aed";
                case "vessel":
                    return "#ca8a04";
                default:
                    return "#64748b";
            }
        };

        return (
            <div
                className="absolute z-10 p-3 bg-white rounded-lg shadow-lg pointer-events-none border-l-4 space-y-1"
                style={{
                    left: x + 10,
                    top: y + 10,
                    borderLeftColor: getBorderColor(),
                }}
            >
                {getTooltipContent()}
            </div>
        );
    };

    return (
        <div className="relative w-full h-screen">
            {/* Base Map Layer */}
            <div className="absolute inset-0 z-0">
                <DeckGL
                    viewState={viewState}
                    controller={true}
                    layers={[
                        anchorageLayer,
                        fairwayLayer,
                        separationLayer,
                        vesselPathLayer,
                        //vesselLayer,
                        terminalLayer,
                    ]}
                    onViewStateChange={onViewStateChange}
                >
                    <StaticMap
                        mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                        mapStyle={mapStyle}
                    />
                    {renderTooltip()}
                </DeckGL>
            </div>

            {/* UI Layer */}
            <div className="absolute inset-0 pointer-events-none z-10">
                {/* Search Bar */}
                {!showVesselInfo && (
                    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-2/5 pointer-events-auto">
                        <SearchBar
                            onSearch={handleSearch}
                            value={searchQuery}
                            vessels={vessels}
                        />
                    </div>
                )}

                {/* Map Controls */}
                {!showVesselInfo && (
                    <div className="absolute bottom-8 right-8 flex items-end gap-4 pointer-events-auto">
                        <MapControls
                            activeLayers={activeLayers}
                            setActiveLayers={setActiveLayers}
                            onZoomIn={handleZoomIn}
                            onZoomOut={handleZoomOut}
                            isOpen={layerMenuOpen}
                            setIsOpen={setLayerMenuOpen}
                        />
                        {searchQuery && filteredVessels.length > 0 && (
                            <div className="flex-grow">
                                <VesselInfoPanel
                                    vessels={filteredVessels}
                                    onShowAllClick={handleShowAllClick}
                                    onVesselClick={handleVesselInfoClick}
                                />
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* FAB Layer */}
            {!showVesselInfo && (
                <div className="absolute top-32 left-4 pointer-events-auto z-30">
                    <div className="space-y-4 flex flex-col">
                        <div
                            className={`transition-all duration-300 ease-in-out w-[23.5vw] ${
                                fabStates.vesselInfo.isExpanded
                                    ? "h-[calc(100vh-15rem)]"
                                    : "h-12"
                            }`}
                        >
                            <FloatingActionButton
                                onVesselDataUpdate={handleVesselDataUpdate}
                                initialStartDate={
                                    fabStates.vesselInfo.startDate
                                }
                                initialEndDate={fabStates.vesselInfo.endDate}
                                initialFilters={
                                    fabStates.vesselInfo.selectedFilters
                                }
                                isItExpanded={fabStates.vesselInfo.isExpanded}
                                onClose={() => handleVesselInfoFabToggle(false)}
                            />
                        </div>
                        <div
                            className={`transition-all duration-300 ease-in-out w-[23.5vw] ${
                                fabStates.portService.isExpanded
                                    ? "h-[calc(100vh-15rem)]"
                                    : "h-12"
                            }`}
                        >
                            <PortServiceFAB
                                onPortServiceDataUpdate={
                                    handlePortServiceDataUpdate
                                }
                                initialTimeRanges={
                                    fabStates.portService.timeRanges
                                }
                                isItExpanded={fabStates.portService.isExpanded}
                                onClose={() =>
                                    handlePortServiceFabToggle(false)
                                }
                            />
                        </div>
                    </div>
                </div>
            )}

            {/* Table Layer */}
            {!showVesselInfo && (showVesselTable || showPortServiceTable) && (
                <div className="absolute top-32 left-[calc(25vw+1rem+1rem)] right-4 pointer-events-auto z-20">
                    {showVesselTable && vesselData && (
                        <div className="w-full h-[calc(83vh)] bg-white rounded-lg shadow-lg overflow-hidden">
                            <VesselActivityTable
                                data={vesselData}
                                onClose={() => handleVesselDataUpdate(null)}
                                onRowClick={handleTableRowClick}
                            />
                        </div>
                    )}

                    {showPortServiceTable && portServiceData && (
                        <div className="w-[72vw] ">
                            <PortServiceTable
                                data={portServiceData}
                                onClose={() =>
                                    handlePortServiceDataUpdate(null)
                                }
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Vessel Info Panel Layer */}
            {showVesselInfo && selectedVessel && (
                <>
                    <div className="absolute top-32 right-8 pointer-events-auto h-[calc(60vh)] z-20">
                        {vesselInfoSource === "fab" ? (
                            <VesselActivitySingleWithArrow
                                vessel={selectedVessel}
                                onClose={handleCloseVesselInfo}
                                onUpArrowClick={handleUpArrowClick}
                                dateRange={{
                                    startDate:
                                        dateRange?.startDate ?? new Date(),
                                    endDate: dateRange?.endDate ?? new Date(),
                                }}
                            />
                        ) : (
                            <VesselActivitySingle
                                vessel={selectedVessel}
                                onClose={handleCloseVesselInfo}
                            />
                        )}
                    </div>

                    {/* Time Slider */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl pointer-events-auto z-20">
                        <TimeSlider
                            startTime={new Date(timelineData[0].timestamp)}
                            endTime={
                                new Date(
                                    timelineData[
                                        timelineData.length - 1
                                    ].timestamp
                                )
                            }
                            onTimeChange={(time: Date, isDragging: boolean) => {
                                setCurrentTime(time);
                                updateVesselPosition(time, isDragging);
                            }}
                            isPlaying={isPlaying}
                            setIsPlaying={setIsPlaying}
                            currentTime={currentTime}
                        />
                    </div>
                </>
            )}

            {/* Toast Layer */}
            {errorMessage && <ErrorToast message={errorMessage} />}
        </div>
    );
};

export default MapWithSearchBar;
