/* eslint-disable */
"use client";
import React, { useState, useEffect, useMemo } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import Image from "next/image";
import { FlyToInterpolator, IconLayer, PathLayer, PolygonLayer } from "deck.gl";
import { PathStyleExtension } from "@deck.gl/extensions";
import vesselMarker from "@/resources/map/vessel_marker.png";
import SearchBar from "@/components/Searchbar";
import vesselPingData from "@/data/example/VesselPing.json";
import { VesselIcon } from "@/resources/dashboard";
import type VesselActivity from "@/types/VesselActivity";
import type VesselData from "@/types/VesselData";
import type VesselMarker from "@/types/VesselMarker";
import type ViewState from "@/types/ViewState";
import vesselActivityData from "@/data/example/VesselActivity.json";
import singleVesselActivityData from "@/data/example/VesselActivitySingle.json";
import FloatingActionButton from "@/components/FloatingActionButton";
import VesselActivityTable from "@/components/VesselActivityTable";
import VesselActivitySingle from "@/components/VesselActivitySingle";
import Slider from "@/components/Slider";
import { easeCubic } from "d3-ease";
import _ from "lodash";
import VesselActivitySingleWithArrow from "@/components/VesselActivitySingleWithArrow";
import LayerSelect from "@/components/LayerSelect";

// Import layer data
import knownAreas from "@/data/knownAreas.json";
import separation from "@/data/seamark_separation.json";

interface MapProps {
    mapStyle?: string;
    initialViewState?: any;
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
    selectedFilters: string[];
}

const ErrorToast: React.FC<{ message: string }> = ({ message }) => {
    //Error Toast
    return (
        <div className="fixed bottom-10 left-1/2 transform -translate-x-1/2 bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded shadow-lg z-[9999] animate-fade-in">
            <span>No data for vessel {message}</span>
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
        vessels: true,
    });
    const [focusVessel, setFocusVessel] = useState<VesselMarker | null>(null);
    const [vesselData, setVesselData] = useState<VesselActivity[] | null>(null);
    const [showVesselTable, setShowVesselTable] = useState(false);
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
    const [fabState, setFabState] = useState<FabState>({
        isExpanded: false,
        selectedFilters: [],
    });
    const [vesselInfoSource, setVesselInfoSource] = useState<
        "fab" | "direct" | null
    >(null);
    const [dateRange, setDateRange] = useState<{
        startDate: Date;
        endDate: Date;
    } | null>(null);

    const [layerMenuOpen, setLayerMenuOpen] = useState(false);

    useEffect(() => {
        const typedVesselData = vesselPingData as VesselMarker[];
        setVessels(typedVesselData);
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

    const handleVesselDataUpdate = (
        data: VesselActivity[] | null,
        fabData?: any
    ) => {
        setVesselData(data);
        setShowVesselTable(!!data);

        if (fabData) {
            setFabState((prevState) => ({
                ...prevState,
                ...fabData,
                startDate: fabData.startDate
                    ? new Date(fabData.startDate)
                    : undefined,
                endDate: fabData.endDate
                    ? new Date(fabData.endDate)
                    : undefined,
                selectedFilters:
                    fabData.selectedFilters || prevState.selectedFilters,
            }));
        }

        if (!!data) {
            setShowVesselInfo(false);
            setSelectedVessel(null);
            setTimelineData([]);
        }
    };
    const handleTableRowClick = async (vessel: VesselActivity) => {
        console.log("Table row clicked:", vessel);
        console.log("Current fabState:", fabState); // Add this

        const currentFabData = {
            ...fabState,
            isExpanded: false,
            selectedFilters: fabState.selectedFilters,
        };
        setFabState(currentFabData);

        // Replace with API call in the future
        const vesselTimelineData = singleVesselActivityData.filter(
            (v) =>
                v.vesselName.toLowerCase() === vessel.vesselName.toLowerCase()
        );

        if (vesselTimelineData && vesselTimelineData.length > 0) {
            const initialPosition: [number, number] = [
                vesselTimelineData[0].longitude,
                vesselTimelineData[0].latitude,
            ];

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
            setErrorMessage(
                `No trajectory data available for ${vessel.vesselName}`
            );
            setTimeout(() => setErrorMessage(null), 3000);
        }
    };

    const handleUpArrowClick = () => {
        setShowVesselInfo(false);
        setVesselPath([]);
        setCurrentPosition(null);
        setCurrentTime(null);
        setIsPlaying(false);
        const restoredFabState = {
            ...fabState,
            isExpanded: true,
            selectedFilters: fabState.selectedFilters,
        };
        setFabState(restoredFabState);
        setShowVesselTable(true);

        handleVesselDataUpdate(vesselData, restoredFabState);

        setViewState((prevState: ViewState) => ({
            ...prevState,
            zoom: 11,
            transitionDuration: 2000,
            transitionInterpolator: new FlyToInterpolator({
                speed: 1.2,
            }),
            transitionEasing: easeCubic,
        }));
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

    const handleVesselClick = async (
        clickedVessel: VesselMarker,
        viewStateCallback?: () => void
    ) => {
        console.log("1. Clicked vessel:", clickedVessel);
        console.log("2. Current vesselData:", vesselData);

        setShowVesselTable(false);

        //Replace with API call in the future
        const freshVesselData = vesselActivityData;

        if (freshVesselData) {
            const vesselDetails = freshVesselData.find(
                (v) =>
                    v.vesselName.toLowerCase() ===
                    clickedVessel.vesselName.toLowerCase()
            );
            console.log("3. Found vessel details for table:", vesselDetails);

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
                console.log(
                    "4. Setting selected vessel:",
                    enrichedVesselDetails
                );
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
                console.log(
                    "5. Setting basic vessel details:",
                    basicVesselDetails
                );
                setSelectedVessel(basicVesselDetails);
            }
        }
    };

    const createHoverHandler = (layerName: string) => (info: any) => {
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
            <div className="absolute top-44 left-1/2 transform -translate-x-1/2 bg-white px-4 py-2 rounded-full shadow">
                Found {count} vessel{count !== 1 ? "s" : ""} of {total}
            </div>
        );
    };

    const handleCloseVesselInfo = () => {
        setShowVesselInfo(false);
        setVesselPath([]);
        setCurrentPosition(null);
        setCurrentTime(null);
        setIsPlaying(false);
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
        onHover: createHoverHandler("anchorage"),
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
        onHover: createHoverHandler("fairway"),
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
        onHover: createHoverHandler("separation"),
        parameters: {
            dashEnable: true,
        },
    });

    //Vessel layer
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
        getPosition: (d) => [d.longitude, d.latitude],
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

    //If you want icons to stop flickering, pass in the icons through here instead of inside layerselect
    const LayerToggle = () => (
        <div className="absolute top-16 right-4 z-10">
            <LayerSelect
                activeLayers={activeLayers}
                setActiveLayers={setActiveLayers}
                isOpen={layerMenuOpen}
                setIsOpen={setLayerMenuOpen}
            />
        </div>
    );

    return (
        <div className="relative w-full h-screen">
            <DeckGL
                viewState={viewState}
                controller={true}
                layers={[
                    anchorageLayer,
                    fairwayLayer,
                    separationLayer,
                    vesselPathLayer,
                    vesselLayer,
                ]}
                onViewStateChange={onViewStateChange}
            >
                <StaticMap
                    mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle={mapStyle}
                />
                {renderTooltip()}
            </DeckGL>

            {/* Floating Action Button */}
            {!showVesselInfo && (
                <div className="absolute left-4 top-32 z-50">
                    <FloatingActionButton
                        onVesselDataUpdate={handleVesselDataUpdate}
                        initialStartDate={fabState.startDate}
                        initialEndDate={fabState.endDate}
                        initialFilters={fabState.selectedFilters}
                        isItExpanded={fabState.isExpanded}
                    />
                </div>
            )}

            {/* Table - from FAB */}
            {showVesselTable && vesselData && (
                <div className="absolute left-1/4 top-32 z-50">
                    <div className="w-8/12 bg-white rounded-lg shadow-lg overflow-hidden">
                        <VesselActivityTable
                            data={vesselData}
                            onClose={() => handleVesselDataUpdate(null)}
                            onRowClick={handleTableRowClick}
                        />
                    </div>
                </div>
            )}

            {/* Vessel Trajectory View */}
            {showVesselInfo && selectedVessel && (
                <>
                    {vesselInfoSource === "fab" ? (
                        <VesselActivitySingleWithArrow
                            vessel={selectedVessel}
                            onClose={handleCloseVesselInfo}
                            onUpArrowClick={handleUpArrowClick}
                            dateRange={{
                                startDate: dateRange?.startDate ?? new Date(),
                                endDate: dateRange?.endDate ?? new Date(),
                            }}
                        />
                    ) : (
                        <VesselActivitySingle
                            vessel={selectedVessel}
                            onClose={handleCloseVesselInfo}
                        />
                    )}

                    {/* Time Slider Component */}
                    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 w-full max-w-5xl z-[9999]">
                        <Slider
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

            {!showVesselInfo && (
                <>
                    <LayerToggle />
                    <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/4">
                        <SearchBar onSearch={handleSearch} />
                    </div>
                    <SearchResultsCount
                        count={filteredVessels.length}
                        total={vessels.length}
                    />
                </>
            )}
            {errorMessage && <ErrorToast message={errorMessage} />}
        </div>
    );
};

export default MapWithSearchBar;
