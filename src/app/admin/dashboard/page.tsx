"use client";

import React, { useRef } from "react";

const Dashboard = () => {
    const playerRef = useRef(null);
    return (
        <div className="flex flex-col gap-10">
            <span className="text-3xl font-black text-center">Admin Dashboard</span>
        </div>
    );
};

export default Dashboard;
