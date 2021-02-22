import React from "react";

export const theme = {
    dark: {
        backgroundColor: "#323232",
        color: "#f1f1f1"
    },
    light: {
        backgroundColor: "#f1f1f1",
        color: "#323232"
    },
}

export const ThemeContext = React.createContext(theme.light);

