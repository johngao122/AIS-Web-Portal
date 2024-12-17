/* eslint-disable */
"use client";
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { IconLayer, PathLayer, PolygonLayer } from "deck.gl";
import { PathStyleExtension } from "@deck.gl/extensions";
import vesselMarker from "@/resources/map/vessel_marker.png";
import { Search } from "lucide-react";
import SearchBar from "./Searchbar";

// Import layer data
import anchorages from "@/data/seamark_anchorages.json";
import fairways from "@/data/seamark_fairways.json";
import lanes from "@/data/seamark_lanes.json";
import mooringAreas from "@/data/seamark_mooring_areas.json";
import separation from "@/data/seamark_separation.json";

interface MapProps {
    mapStyle?: string;
    initialViewState?: any;
}

interface SeparationZone {
    id: number;
    seamark_type: string;
    coordinates: [number, number][];
    centroid: [number, number];
    longitude: number;
    latitude: number;
}

interface VesselData {
    mmsi: string;
    shipname: string;
    shiptype: string;
    longitude: number;
    latitude: number;
    speed: number;
    heading: number;
    course: number;
}

interface TooltipInfo {
    object: any;
    x: number;
    y: number;
    layer: string;
}

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
    const [vessels, setVessels] = useState<VesselData[]>([]);
    const [tooltipInfo, setTooltipInfo] = useState<TooltipInfo | null>(null);
    const [activeVessel, setActiveVessel] = useState<VesselData | null>(null);
    const [searchQuery, setSearchQuery] = useState<string>("");
    const [activeLayers, setActiveLayers] = useState({
        anchorages: true,
        fairways: true,
        lanes: true,
        mooringAreas: true,
        separation: true,
    });

    const onViewStateChange = ({ viewState: newViewState }: any) => {
        setViewState(newViewState);
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

    //Anchorage layer
    const anchorageLayer = new PolygonLayer({
        id: "anchorage",
        data: anchorages,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d) => [d.coordinates],
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
        getPolygon: (d) => [d.coordinates],
        getFillColor: [255, 140, 0, 20],
        getLineColor: [255, 140, 0, 200],
        getLineWidth: 1,
        visible: activeLayers.fairways,
        onHover: createHoverHandler("fairway"),
    });

    //Lane layer
    const laneLayer = new PathLayer({
        id: "lane",
        data: lanes,
        pickable: true,
        widthScale: 20,
        widthMinPixels: 2,
        getPath: (d) => d.coordinates,
        getColor: [150, 0, 150, 200],
        getWidth: 2,
        visible: activeLayers.lanes,
        onHover: createHoverHandler("lane"),
    });

    //Mooring area layer
    const mooringAreaLayer = new PolygonLayer({
        id: "mooringArea",
        data: mooringAreas,
        pickable: true,
        stroked: true,
        filled: true,
        wireframe: true,
        lineWidthMinPixels: 1,
        getPolygon: (d) => [d.coordinates],
        getFillColor: [0, 255, 0, 20],
        getLineColor: [0, 255, 0, 200],
        getLineWidth: 1,
        visible: activeLayers.mooringAreas,
        onHover: createHoverHandler("mooringArea"),
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
            dashEnable: true, //DONT TOUCH THIS PLEASE
        },
    });

    //Vessel layer
    const vesselLayer = new IconLayer({
        id: "vessels",
        data: vessels,
        pickable: true,
        iconAtlas: vesselMarker.src,
        iconMapping: {
            marker: { x: 0, y: 0, width: 512, height: 512, mask: true },
        },
        getIcon: (d) => "marker",
        sizeScale: 1,
        getPosition: (d) => [d.longitude, d.latitude],
        getSize: (d) => 300,
        getColor: (d) =>
            activeVessel?.mmsi === d.mmsi ? [128, 128, 0] : [52, 199, 89],
        getAngle: (d) => 360 - d.heading,
        onHover: createHoverHandler("vessel"),
    });

    const renderTooltip = () => {
        if (!tooltipInfo) return null;

        const { object, x, y, layer } = tooltipInfo;

        const getTooltipContent = () => {
            switch (layer) {
                //Custom tooltips for each type of layer
                case "anchorage":
                    return (
                        <>
                            <div className="font-semibold text-blue-600">
                                Anchorage Area
                            </div>
                            <div>ID: {object.id}</div>
                            <div>Name: {object.name || "Unnamed"}</div>
                        </>
                    );

                case "fairway":
                    return (
                        <>
                            <div className="font-semibold text-orange-600">
                                Fairway
                            </div>
                            <div>Name: {object.name || "Unnamed"}</div>
                            <div>Type: {object.seamark_type}</div>
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
                            <div>Name: {object.name || "Unnamed"}</div>
                            <div>Type: {object.seamark_type}</div>
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
                        <>
                            <div className="font-semibold text-yellow-600">
                                Vessel
                            </div>
                            <div>MMSI: {object.mmsi}</div>
                            <div>Name: {object.shipname}</div>
                            <div>Speed: {object.speed} knots</div>
                        </>
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

    const LayerToggle = () => (
        <div className="absolute top-4 right-4 bg-white p-4 rounded shadow z-10">
            <h3 className="font-bold mb-2">Layers</h3>
            <div className="space-y-2">
                {Object.entries(activeLayers).map(([key, value]) => (
                    <label key={key} className="flex items-center space-x-2">
                        <input
                            type="checkbox"
                            checked={value}
                            onChange={() =>
                                setActiveLayers((prev) => ({
                                    ...prev,
                                    [key]: !prev[
                                        key as keyof typeof activeLayers
                                    ],
                                }))
                            }
                        />
                        <span className="capitalize">
                            {key.replace(/([A-Z])/g, " $1").trim()}
                        </span>
                    </label>
                ))}
            </div>
        </div>
    );

    return (
        <div className="relative w-full h-screen">
            <DeckGL
                initialViewState={viewState}
                controller={true}
                layers={[
                    anchorageLayer,
                    fairwayLayer,
                    laneLayer,
                    mooringAreaLayer,
                    separationLayer,
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
            <LayerToggle />
            <div className="absolute top-32 left-1/2 transform -translate-x-1/2 w-1/4">
                <SearchBar onSearch={() => {}} />
            </div>
        </div>
    );
};

export default MapWithSearchBar;
