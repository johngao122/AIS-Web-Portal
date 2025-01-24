/* eslint-disable */
"use client";
import React, { useState } from "react";
import DeckGL from "@deck.gl/react";
import StaticMap from "react-map-gl";
import { IconLayer } from "deck.gl";
import vesselMarker from "@/resources/map/vessel_marker.png";

interface MapProps {
    mapStyle?: string;
    initialViewState?: any;
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

/**
 * A deck.gl map component that renders a map with an icon layer
 * showing vessels. The map is interactive and supports zooming,
 * panning, and rotation. When a vessel is clicked, it is highlighted
 * in yellow, and a tooltip is displayed with the vessel's MMSI,
 * ship name, speed, and heading.
 *
 * @param {Object} props The component props
 * @param {string} [props.mapStyle=mapbox://styles/mapbox/light-v10] The map style
 * @param {Object} [props.initialViewState={ longitude: 103.8198, latitude: 1.3521, zoom: 11, pitch: 0, bearing: 0 }] The initial view state
 */
const Map: React.FC<MapProps> = ({
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
    const [tooltipInfo, setTooltipInfo] = useState<any>(null);
    const [activeVessel, setActiveVessel] = useState<VesselData | null>(null);

    const onViewStateChange = ({ viewState: newViewState }: any) => {
        setViewState(newViewState);
    };

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
        onHover: (info: any) => {
            if (info.object) {
                setTooltipInfo({
                    object: info.object,
                    x: info.x,
                    y: info.y,
                });
            } else {
                setTooltipInfo(null);
            }
        },
        onClick: (info: any) => {
            if (info.object) {
                setActiveVessel(info.object);
            }
        },
    });

    const renderTooltip = () => {
        if (!tooltipInfo) return null;

        return (
            <div
                className="absolute z-10 p-2 bg-white rounded shadow pointer-events-none"
                style={{
                    left: tooltipInfo.x + 10,
                    top: tooltipInfo.y + 10,
                }}
            >
                <div>
                    <b>MMSI:</b> {tooltipInfo.object.mmsi}
                </div>
                <div>
                    <b>Ship Name:</b> {tooltipInfo.object.shipname}
                </div>
                <div>
                    <b>Speed:</b> {tooltipInfo.object.speed}
                </div>
                <div>
                    <b>Heading:</b> {tooltipInfo.object.heading}°
                </div>
            </div>
        );
    };

    return (
        <div className="w-full h-full">
            <DeckGL
                initialViewState={viewState}
                controller={true}
                layers={[vesselLayer]}
                onViewStateChange={onViewStateChange}
            >
                <StaticMap
                    mapboxAccessToken={MAPBOX_ACCESS_TOKEN}
                    mapStyle={mapStyle}
                />
                {renderTooltip()}
            </DeckGL>
        </div>
    );
};

export default Map;
