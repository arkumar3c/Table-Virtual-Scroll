
import React, { useMemo, useRef, useState } from "react";
import { data } from "./abc";

import "./VirtualScroll.css";

const ROW_HEIGHT = 48;
const VIEWPORT_HEIGHT = 500;
const BUFFER = 5;

const VirtualScroll = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [scrollTop, setScrollTop] = useState(0);

    const totalRows = data.length;

    const startIndex = Math.max(
        Math.floor(scrollTop / ROW_HEIGHT) - BUFFER,
        0
    );

    const visibleCount =
        Math.ceil(VIEWPORT_HEIGHT / ROW_HEIGHT) + BUFFER * 2;

    const endIndex = Math.min(startIndex + visibleCount, totalRows);

    const visibleData = useMemo(
        () => data.slice(startIndex, endIndex),
        [startIndex, endIndex]
    );

    const topSpacerHeight = startIndex * ROW_HEIGHT;
    const bottomSpacerHeight =
        (totalRows - endIndex) * ROW_HEIGHT;

    return (
        <div className="virtual-scroll-container">
            {/* Header */}
            <div className="virtual-scroll-header">
                <h1 className="virtual-scroll-title">Virtual Scrolling Table</h1>
                <p className="virtual-scroll-subtitle">
                    High-performance table rendering with optimized virtualization
                </p>
            </div>
            {/* Main Content */}
            <div className="virtual-scroll-wrapper">
                {/* Stats Dashboard */}
                <div className="virtual-scroll-stats">
                    <div className="virtual-scroll-stats-item">
                        <span className="virtual-scroll-stats-label">Total Records</span>
                        <span className="virtual-scroll-stats-value">
                            {totalRows.toLocaleString()}
                        </span>
                    </div>
                    <div className="virtual-scroll-stats-item">
                        <span className="virtual-scroll-stats-label">Rendered Rows</span>
                        <span className="virtual-scroll-stats-value">
                            {visibleData.length}
                        </span>
                    </div>
                    <div className="virtual-scroll-stats-item">
                        <span className="virtual-scroll-stats-label">Current Range</span>
                        <span className="virtual-scroll-stats-value">
                            {startIndex + 1} – {endIndex}
                        </span>
                    </div>
                    <div className="virtual-scroll-stats-item">
                        <span className="virtual-scroll-stats-label">Efficiency</span>
                        <span className="virtual-scroll-stats-value">
                            {((visibleData.length / totalRows) * 100).toFixed(1)}%
                        </span>
                    </div>
                </div>

                {/* Table Wrapper */}
                <div className="virtual-scroll-table-section">
                    <div className="virtual-scroll-content" ref={containerRef} style={{height: VIEWPORT_HEIGHT, overflowY: "auto", border: "1px solid #e1e3e5",}}
                        onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}>
                        <table className="virtual-scroll-table_new" style={{ width: "100%", borderCollapse: "collapse", }}>
                            <thead style={{ position: "sticky", top: 0, background: "#fff" }}>
                                <tr>
                                    <th>Name</th>
                                    <th>Email</th>
                                    <th>Age</th>
                                    <th>Country</th>
                                    <th>Status</th>
                                </tr>
                            </thead>

                            <tbody>
                                {/* Top Spacer */}
                                {topSpacerHeight > 0 && (
                                    <tr style={{ height: topSpacerHeight }}>
                                        <td colSpan={7} />
                                    </tr>
                                )}

                                {/* Visible Rows */}
                                {visibleData.map((item, i) => (
                                    <tr key={startIndex + i} style={{ height: ROW_HEIGHT }}>
                                        {/* <td className="min-w-400 Polaris-IndexTable__TableCell Polaris-IndexTable__TableCell--flush">{item.shop_id}</td> */}
                                        <td>{item.name}</td>
                                        <td>{item.email}</td>
                                        <td>{item.age}</td>
                                        <td>{item.country}</td>
                                        <td>
                                            <span className={`status-badge ${item.isActive ? "active" : "inactive"}`}>
                                                {item.isActive ? "Active" : "Inactive"}
                                            </span>
                                        </td>
                                    </tr>
                                ))}

                                {/* Bottom Spacer */}
                                {bottomSpacerHeight > 0 && (
                                    <tr style={{ height: bottomSpacerHeight }}>
                                        <td colSpan={7} />
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                     {/* Footer Info */}
                    <div className="virtual-scroll-footer">
                        <p className="virtual-scroll-footer-text">
                            Scroll to load more records seamlessly
                        </p>
                        <div className="virtual-scroll-footer-meta">
                            <div className="virtual-scroll-footer-item">
                                <span className="virtual-scroll-footer-label">Scroll Position</span>
                                <span className="virtual-scroll-footer-value">
                                    {Math.round(
                                        (scrollTop /
                                            (totalRows * ROW_HEIGHT - VIEWPORT_HEIGHT)) *
                                        100
                                    )}%
                                </span>
                            </div>
                            <div className="virtual-scroll-footer-item">
                                <span className="virtual-scroll-footer-label">Cache Buffer</span>
                                <span className="virtual-scroll-footer-value">
                                    {BUFFER * 2} rows
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VirtualScroll;