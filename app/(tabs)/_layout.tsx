import React from "react";
import { Tabs } from "expo-router";
import { StatusBar } from "expo-status-bar";

export default function TabLayout() {
    return (
        <>
            {/* Ensures status bar text is white */}
            <StatusBar
                style="light"
                translucent
                backgroundColor="transparent"
            />
            <Tabs
                screenOptions={{
                    tabBarStyle: { display: "none" }, // Hides the bottom tab bar
                    headerStyle: {
                        backgroundColor: "#232323", // Makes the header transparent
                    },
                    headerTintColor: "#fff", // Sets the header text/icon color to white
                    headerTitle: "",
                }}
            ></Tabs>
        </>
    );
}
