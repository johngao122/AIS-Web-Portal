import React from "react";
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

interface PortServiceData {
    "Port Service Levels Analysis": {
        "Key KPIs": Array<{
            name: string;
            Aggregated: number;
            "Category 1 (LOA ∈ (0,147])": number;
            "Category 2 (LOA ∈ (147, 209])": number;
            "Category 3 (LOA ∈ (209, 285])": number;
            "Category 4 (LOA ∈ (285, 400])": number;
        }>;
    };
}

interface PortServiceTableProps {
    data: PortServiceData;
    onClose: () => void;
}

const PortServiceTable: React.FC<PortServiceTableProps> = ({
    data,
    onClose,
}) => {
    const kpis = data["Port Service Levels Analysis"]["Key KPIs"];

    return (
        <div className="flex flex-col h-full bg-white rounded-lg shadow-lg">
            {/* Header */}
            <div className="flex-none flex justify-between items-center px-4 py-2 border-b bg-blue-500 h-[60px] rounded-t-lg">
                <div className="flex items-center gap-2">
                    <Image
                        src={TableIcon}
                        alt="Port Service Table Icon"
                        className="h-6 w-6"
                    />
                    <span className="text-base text-white">
                        port service levels analysis
                    </span>
                </div>
                <button onClick={onClose}>
                    <X className="h-4 w-4 text-white" />
                </button>
            </div>

            {/* Table Container with Fixed Header */}
            <div className="flex-1 overflow-hidden">
                <div className="h-full overflow-y-auto">
                    <Table className="border-collapse table-fixed">
                        <TableHeader className="sticky top-0 z-10">
                            <TableRow>
                                <TableHead className="bg-white px-6 py-4 text-left font-medium border-r border-b w-1/6">
                                    Key KPIs
                                </TableHead>
                                <TableHead className="bg-white px-6 py-4 text-center font-medium border-r border-b w-1/6">
                                    Aggregated
                                </TableHead>
                                <TableHead className="bg-white px-6 py-4 text-center font-medium border-r border-b w-1/6">
                                    Category 1
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (0,147]
                                    </span>
                                </TableHead>
                                <TableHead className="bg-white px-6 py-4 text-center font-medium border-r border-b w-1/6">
                                    Category 2
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (147,209]
                                    </span>
                                </TableHead>
                                <TableHead className="bg-white px-6 py-4 text-center font-medium border-r border-b w-1/6">
                                    Category 3
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (209,285]
                                    </span>
                                </TableHead>
                                <TableHead className="bg-white px-6 py-4 text-center font-medium border-r border-b w-1/6">
                                    Category 4
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (285,400]
                                    </span>
                                </TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody className="divide-y divide-gray-200">
                            {kpis.map((row, index) => (
                                <TableRow
                                    key={row.name}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    } hover:bg-gray-100 transition-colors`}
                                >
                                    <TableCell className="px-6 py-8 font-medium border-r">
                                        {row.name}
                                    </TableCell>
                                    <TableCell className="px-6 py-8 text-center border-r">
                                        {row.Aggregated}
                                    </TableCell>
                                    <TableCell className="px-6 py-8 text-center border-r">
                                        {row["Category 1 (LOA ∈ (0,147])"]}
                                    </TableCell>
                                    <TableCell className="px-6 py-8 text-center border-r">
                                        {row["Category 2 (LOA ∈ (147, 209])"]}
                                    </TableCell>
                                    <TableCell className="px-6 py-8 text-center border-r">
                                        {row["Category 3 (LOA ∈ (209, 285])"]}
                                    </TableCell>
                                    <TableCell className="px-6 py-8 text-center border-r">
                                        {row["Category 4 (LOA ∈ (285, 400])"]}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default PortServiceTable;
