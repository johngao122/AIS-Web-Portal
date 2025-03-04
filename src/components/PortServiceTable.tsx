/* eslint-disable */

import React, { useEffect, useState } from "react";
import TableIcon from "@/resources/portServiceTable";
import Image from "next/image";
import { X } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

interface PortServiceTableProps {
    data: any[];
    onClose: () => void;
}

/**
 * Renders a table displaying port service levels analysis data.
 *
 * @param {any[]} data - Array of objects containing port service levels data.
 * @param {() => void} onClose - Function to be called when the close button is clicked.
 */
const PortServiceTable: React.FC<PortServiceTableProps> = ({
    data,
    onClose,
}) => {
    // Add state for row count
    const [rowCount, setRowCount] = useState(0);

    const formatNumber = (value: number): string => {
        return value?.toFixed(2) || "0.00";
    };

    const periods = data.map((period) => Object.keys(period)[0]);

    const vesselCategories = [
        {
            key: "All vessels",
            label: "All vessels",
            criteria: "",
        },
        {
            key: "Category 1 vessels",
            label: "Category 1",
            criteria: "LOA ∈ (0, 147]",
        },
        {
            key: "Category 2 vessels",
            label: "Category 2",
            criteria: "LOA ∈ (147, 209]",
        },
        {
            key: "Category 3 vessels",
            label: "Category 3",
            criteria: "LOA ∈ (209, 285]",
        },
        {
            key: "Category 4 vessels",
            label: "Category 4",
            criteria: "LOA ∈ (285, 400]",
        },
    ];

    // Helper function to check if a metric exists in the data
    const hasMetric = (metricKey: string): boolean => {
        return periods.some((period) =>
            vesselCategories.some(
                (category) =>
                    data.find((d) => d[period])?.[period]?.[category.key]?.[
                        metricKey
                    ] !== undefined
            )
        );
    };

    // Helper function to check if a metric with sub-properties exists
    const hasMetricWithProps = (
        metricKey: string,
        subProps: string[]
    ): boolean => {
        return periods.some((period) =>
            vesselCategories.some((category) =>
                subProps.every(
                    (prop) =>
                        data.find((d) => d[period])?.[period]?.[category.key]?.[
                            metricKey
                        ]?.[prop] !== undefined
                )
            )
        );
    };

    // Get available categories in the filtered data
    const availableCategories = vesselCategories.filter((category) =>
        periods.some(
            (period) =>
                data.find((d) => d[period])?.[period]?.[category.key] !==
                undefined
        )
    );

    type RenderFunction = {
        (periodData: any, category: string, type: "average" | "median"): string;
        (periodData: any, category: string, type?: undefined): string;
        (periodData: any, category: string, terminalKey: string): string;
    };

    // Define metric configurations
    const metrics = [
        {
            key: "TotalBerthed",
            label: "Total number of berthed vessels",
            render: (periodData: any, category: string, _?: any) =>
                periodData?.[category]?.TotalBerthed || "-",
        },
        {
            key: "JIT",
            label: "JIT % (Pre-berthing hours <2h)",
            render: (periodData: any, category: string, _?: any) =>
                `${periodData?.[category]?.JIT || "0"}%`,
        },
        {
            key: "WaitingHours",
            label: "Waiting hours in anchorages",
            hasAvgMed: true,
            render: ((
                periodData: any,
                category: string,
                type: "average" | "median"
            ) =>
                formatNumber(
                    periodData?.[category]?.WaitingHours?.[type]
                )) as RenderFunction,
        },
        {
            key: "BerthingHours",
            label: "Berthing hours",
            hasAvgMed: true,
            render: ((
                periodData: any,
                category: string,
                type: "average" | "median"
            ) =>
                formatNumber(
                    periodData?.[category]?.BerthingHours?.[type]
                )) as RenderFunction,
        },
        {
            key: "InPortHours",
            label: "In port hours",
            hasAvgMed: true,
            render: ((
                periodData: any,
                category: string,
                type: "average" | "median"
            ) =>
                formatNumber(
                    periodData?.[category]?.InPortHours?.[type]
                )) as RenderFunction,
        },
        {
            key: "WharfUtilizationRate",
            label: "Wharf utilization rate",
            subMetrics: [
                { key: "AllTerminals", label: "All terminals" },
                { key: "PasirPanjang", label: "PP Terminals" },
                { key: "Tuas", label: "Tuas Terminals" },
                { key: "BraniKeppel", label: "B&K Terminals" },
            ],
            render: ((
                periodData: any,
                category: string,
                terminalKey: string
            ): string => {
                return `${formatNumber(
                    periodData?.[category]?.WharfUtilizationRate?.[terminalKey]
                )}%`;
            }) as RenderFunction,
        },
    ];

    // Calculate total visible rows
    useEffect(() => {
        let count = 0;
        metrics.forEach((metric) => {
            if (!hasMetric(metric.key)) return;
            if (metric.hasAvgMed) count += 2;
            else if (metric.subMetrics) count += metric.subMetrics.length;
            else count += 1;
        });
        setRowCount(count);
    }, [metrics, data]);

    return (
        <div className="flex flex-col bg-white rounded-lg shadow-lg">
            <div className="flex justify-between items-center px-6 py-4 border-b bg-blue-500 rounded-t-lg">
                <div className="flex items-center gap-3">
                    <Image
                        src={TableIcon}
                        alt="Port Service Table Icon"
                        className="h-8 w-8"
                    />
                    <span className="text-lg font-medium text-white">
                        Port Service Levels Analysis
                    </span>
                </div>
                <button
                    onClick={onClose}
                    className="p-2 hover:bg-blue-600 rounded-full"
                >
                    <X className="h-5 w-5 text-white" />
                </button>
            </div>

            <div className="overflow-x-auto max-h-[74vh] overflow-y-auto">
                <Table>
                    <TableHeader className="sticky top-0 bg-white z-10">
                        <TableRow>
                            <TableHead
                                className="border-r border-b w-[500px] py-4 text-center"
                                rowSpan={2}
                            >
                                Metric
                            </TableHead>
                            <TableHead
                                className="border-r border-b w-[200px] py-4"
                                rowSpan={2}
                            >
                                Subcategory
                            </TableHead>
                            {periods.map((period) => (
                                <TableHead
                                    key={period}
                                    className="text-center border-r border-b py-4"
                                    colSpan={availableCategories.length}
                                >
                                    {period}
                                </TableHead>
                            ))}
                        </TableRow>
                        <TableRow>
                            {periods.map(() =>
                                availableCategories.map((category) => (
                                    <TableHead
                                        key={category.key}
                                        className="text-center border-r border-b p-2 whitespace-normal"
                                    >
                                        <div className="font-medium">
                                            {category.label}
                                        </div>
                                        <div className="text-sm text-gray-600">
                                            {category.criteria}
                                        </div>
                                    </TableHead>
                                ))
                            )}
                        </TableRow>
                    </TableHeader>

                    <TableBody>
                        {metrics.map((metric) => {
                            if (!hasMetric(metric.key)) return null;

                            if (metric.hasAvgMed) {
                                return (
                                    <React.Fragment key={metric.key}>
                                        <TableRow
                                            className={`hover:bg-gray-50 ${
                                                rowCount
                                                    ? `h-[calc((100vh - 170px)/${rowCount})]`
                                                    : "min-h-[70px]"
                                            }`}
                                        >
                                            <TableCell
                                                className="font-medium border-r p-4 align-middle"
                                                rowSpan={2}
                                            >
                                                {metric.label}
                                            </TableCell>
                                            <TableCell className="text-sm text-gray-500 p-4 border-r">
                                                Average
                                            </TableCell>
                                            {periods.map((period) =>
                                                availableCategories.map(
                                                    (category) => {
                                                        const periodData =
                                                            data.find(
                                                                (d) => d[period]
                                                            )?.[period];
                                                        return (
                                                            <TableCell
                                                                key={`${period}-${category.key}-avg`}
                                                                className="text-center border-r p-4"
                                                            >
                                                                {metric.render(
                                                                    periodData,
                                                                    category.key,
                                                                    "average"
                                                                )}
                                                            </TableCell>
                                                        );
                                                    }
                                                )
                                            )}
                                        </TableRow>
                                        <TableRow
                                            className={`hover:bg-gray-50 ${
                                                rowCount
                                                    ? `h-[calc((100vh - 170px)/${rowCount})]`
                                                    : "min-h-[70px]"
                                            }`}
                                        >
                                            <TableCell className="text-sm text-gray-500 p-4 border-r">
                                                Median
                                            </TableCell>
                                            {periods.map((period) =>
                                                availableCategories.map(
                                                    (category) => {
                                                        const periodData =
                                                            data.find(
                                                                (d) => d[period]
                                                            )?.[period];
                                                        return (
                                                            <TableCell
                                                                key={`${period}-${category.key}-med`}
                                                                className="text-center border-r p-4"
                                                            >
                                                                {metric.render(
                                                                    periodData,
                                                                    category.key,
                                                                    "median"
                                                                )}
                                                            </TableCell>
                                                        );
                                                    }
                                                )
                                            )}
                                        </TableRow>
                                    </React.Fragment>
                                );
                            } else if (metric.subMetrics) {
                                return metric.subMetrics.map(
                                    (subMetric, subIndex) => (
                                        <TableRow
                                            key={`${metric.key}-${subMetric.key}`}
                                            className={`hover:bg-gray-50 ${
                                                rowCount
                                                    ? `h-[calc((100vh - 170px)/${rowCount})]`
                                                    : "min-h-[70px]"
                                            }`}
                                        >
                                            {subIndex === 0 && (
                                                <TableCell
                                                    className="font-medium border-r p-4"
                                                    rowSpan={
                                                        metric.subMetrics.length
                                                    }
                                                >
                                                    {metric.label}
                                                </TableCell>
                                            )}
                                            <TableCell className="text-sm text-gray-500 p-4 border-r">
                                                {subMetric.label}
                                            </TableCell>
                                            {periods.map((period) =>
                                                availableCategories.map(
                                                    (category) => {
                                                        const periodData =
                                                            data.find(
                                                                (d) => d[period]
                                                            )?.[period];
                                                        return (
                                                            <TableCell
                                                                key={`${period}-${category.key}-${subMetric.key}`}
                                                                className="text-center border-r p-4"
                                                            >
                                                                {metric.render(
                                                                    periodData,
                                                                    category.key,
                                                                    subMetric.key
                                                                )}
                                                            </TableCell>
                                                        );
                                                    }
                                                )
                                            )}
                                        </TableRow>
                                    )
                                );
                            } else {
                                return (
                                    <TableRow
                                        key={metric.key}
                                        className={`hover:bg-gray-50 ${
                                            rowCount
                                                ? `h-[calc((100vh - 170px)/${rowCount})]`
                                                : "min-h-[70px]"
                                        }`}
                                    >
                                        <TableCell className="font-medium border-r p-4">
                                            {metric.label}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500 p-4 border-r">
                                            -
                                        </TableCell>
                                        {periods.map((period) =>
                                            availableCategories.map(
                                                (category) => {
                                                    const periodData =
                                                        data.find(
                                                            (d) => d[period]
                                                        )?.[period];
                                                    return (
                                                        <TableCell
                                                            key={`${period}-${category.key}`}
                                                            className="text-center border-r p-4"
                                                        >
                                                            {metric.render(
                                                                periodData,
                                                                category.key
                                                            )}
                                                        </TableCell>
                                                    );
                                                }
                                            )
                                        )}
                                    </TableRow>
                                );
                            }
                        })}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
};

export default PortServiceTable;
