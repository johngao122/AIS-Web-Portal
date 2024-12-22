import React from "react";
import TableIcon from "@/resources/portServiceTable";
import Image from "next/image";
import { X } from "lucide-react";

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
        <div className="bg-white rounded-lg shadow-lg flex flex-col h-full w-full">
            {/* Header */}
            <div className="flex justify-between items-center px-4 py-2 border-b bg-blue-500 h-[60px]">
                <div className="flex items-center gap-2">
                    <Image
                        src={TableIcon}
                        alt="Port Service Table Icon"
                        width={20}
                        height={20}
                    />
                    <span className="text-base text-white">
                        port service levels analysis
                    </span>
                </div>
                <button onClick={onClose}>
                    <X className="h-4 w-4 text-white" />
                </button>
            </div>
            {/* Table */}
            <div className="flex-1 relative">
                <div className=" overflow-y-auto w-full h-full">
                    <table className="w-full border-collapse">
                        <thead>
                            <tr>
                                <th className="bg-white px-4 py-2 text-left font-medium border-r border-b">
                                    Key KPIs
                                </th>
                                <th className="bg-white px-4 py-2 text-center font-medium border-r border-b">
                                    Aggregated
                                </th>
                                <th className="bg-white px-4 py-2 text-center font-medium border-r border-b">
                                    Category 1
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (0,147]
                                    </span>
                                </th>
                                <th className="bg-white px-4 py-2 text-center font-medium border-r border-b">
                                    Category 2
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (147,209]
                                    </span>
                                </th>
                                <th className="bg-white px-4 py-2 text-center font-medium border-r border-b">
                                    Category 3
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (209,285]
                                    </span>
                                </th>
                                <th className="bg-white px-4 py-2 text-center font-medium border-r border-b">
                                    Category 4
                                    <br />
                                    <span className="text-sm font-normal">
                                        LOA ∈ (285,400]
                                    </span>
                                </th>
                            </tr>
                        </thead>
                        <tbody>
                            {kpis.map((row, index) => (
                                <tr
                                    key={row.name}
                                    className={`${
                                        index % 2 === 0
                                            ? "bg-gray-50"
                                            : "bg-white"
                                    } h-[50px]`}
                                >
                                    <td className="px-4 py-2 font-medium border-r border-b">
                                        {row.name}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {row.Aggregated}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {row["Category 1 (LOA ∈ (0,147])"]}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {row["Category 2 (LOA ∈ (147, 209])"]}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {row["Category 3 (LOA ∈ (209, 285])"]}
                                    </td>
                                    <td className="px-4 py-2 text-center border-r border-b">
                                        {row["Category 4 (LOA ∈ (285, 400])"]}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default PortServiceTable;
